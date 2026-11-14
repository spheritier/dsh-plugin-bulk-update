import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import { failureDetail } from '../src/client/diagnostics.ts'
import { panelCopyFor } from '../src/client/panel-copy.ts'

const source = fs.readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
const deferred = () => { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no }); return { promise, resolve, reject } }
const tick = async () => { for (let i = 0; i < 8; i++) await Promise.resolve() }
const all = node => Array.isArray(node) ? node.flatMap(all) : node && typeof node === 'object' ? [node, ...all(node.children)] : []
const text = node => Array.isArray(node) ? node.map(text).join(' ') : node && typeof node === 'object' ? text(node.children) : node == null || node === false ? '' : String(node)
const item = name => ({ name, installed: true, version: '1.0.0', update: 'registry' })
const listed = name => ({ ok: true, value: { status: 'listed', installed: '1.0.0', registry: null, versions: [{ version: '1.1.0', bundle: true }], attempts: [] } })
const installed = application => ({ ok: true, value: { step: 'install', result: { application } } })

function harness(manager, locale = 'ru-RU') {
  const state = []
  let hook = 0
  const React = {
    createElement: (type, props, ...children) => ({ type, props: props ?? {}, children }),
    useCallback: fn => fn,
    useSyncExternalStore: (_subscribe, get) => get(),
    useState: initial => {
      const index = hook++
      if (!(index in state)) state[index] = initial
      return [state[index], value => { state[index] = typeof value === 'function' ? value(state[index]) : value }]
    },
    useRef: initial => {
      const index = hook++
      if (!(index in state)) state[index] = { current: initial }
      return state[index]
    },
  }
  let definition
  vm.runInNewContext(source, { window: { __ModuleLoader__: { load: value => { definition = value } } } })
  const client = definition.factory(name => { assert.equal(name, 'react'); return React })
  const registrations = []
  client.apply({
    get: name => { assert.equal(name, 'locale'); return { getSnapshot: () => ({ active: locale }), subscribe: () => () => {} } },
    remote: { pluginManager: manager },
    slots: { inject: (_name, register) => register(), register: (meta, render) => { registrations.push({ meta, render }); return () => {} } },
  })
  const panel = registrations.find(row => row.meta.name === 'main').render()
  const render = () => { hook = 0; return panel.type(panel.props) }
  return {
    render,
    nodes: () => all(render()),
    button: index => all(render()).filter(node => node.type === 'button')[index],
    progress: () => all(render()).find(node => node.type === 'progress'),
    list: () => all(render()).find(node => node.props['data-testid'] === 'updates-list'),
    errors: () => all(render()).find(node => node.props['data-testid'] === 'error-details'),
  }
}

// Visible, truthful progress while each async request is still pending; one failure must not abort the scan.
const bundles = deferred()
const checks = []
const mutations = []
let listCalls = 0
const ui = harness({
  listBundles: () => { listCalls++; return bundles.promise },
  listVersions: name => { const gate = deferred(); checks.push({ name, gate }); return gate.promise },
  updateBundle: (name, version) => { assert.equal(version, '1.1.0'); const gate = deferred(); mutations.push({ name, gate }); return gate.promise },
})
const originalCheck = ui.button(0).props.onClick
const scan = originalCheck()
assert.equal(ui.progress().props.value, undefined, 'bundle enumeration should be indeterminate')
await originalCheck()
assert.equal(listCalls, 1, 'double clicks must not start another scan')
bundles.resolve({ ok: true, value: [item('dsh-plugin-bulk-update'), { ...item('git-plugin'), update: 'git' }, ...Array.from({ length: 12 }, (_, index) => item(`plugin-${index}`))] })
await tick()
assert.equal(ui.progress().props.max, 12)
assert.equal(ui.progress().props.value, 0)
assert.match(text(ui.render()), /Проверено 0 из 12.*plugin-0/u)
for (let index = 0; index < 12; index++) {
  assert.equal(checks[index].name, `plugin-${index}`)
  assert.equal(ui.progress().props.value, index)
  assert.equal(ui.button(1).props.disabled, true)
  if (index === 1) checks[index].gate.reject(new Error('Registry connection reset: ECONNRESET'))
  else checks[index].gate.resolve(listed(`plugin-${index}`))
  await tick()
}
await scan
assert.equal(ui.progress().props.value, 12)
assert.equal(all(ui.list()).filter(node => node.type === 'input').length, 11)
assert.equal(ui.list().props.style.overflowY, 'scroll')
assert.equal(ui.list().props.tabIndex, 0)
assert.match(text(ui.errors()), /plugin-1.*ECONNRESET/u)
assert.equal(ui.button(1).props.disabled, false)

// Exercise actual onClick handler in the production client bundle, without touching any real plugin.
const update = ui.button(1).props.onClick()
assert.equal(ui.progress().props.value, 0)
await ui.button(1).props.onClick()
assert.equal(mutations.length, 1, 'double clicks must not start another update batch')
for (let index = 0; index < 11; index++) {
  const pending = mutations[index]
  assert.ok(pending)
  assert.equal(ui.progress().props.value, index)
  assert.equal(ui.button(0).props.disabled, true)
  switch (pending.name) {
    case 'plugin-0':
      pending.gate.resolve({ ok: true, value: { step: 'install', result: {
        application: 'failed', error: { code: 'operation-error', diagnostic: 'EPERM: cannot rename plugin folder' },
        packageResult: { exitCode: 1, output: '\u001b[31mpnpm EPERM\u001b[0m\nAuthorization: Bearer private-token\napi_key=private-key', logPath: 'C:/logs/update.log' },
      }, restore: { application: 'applied' } } })
      break
    case 'plugin-2': pending.gate.reject(new Error('Transport disconnected')); break
    case 'plugin-3': pending.gate.resolve({ ok: false, error: { code: 'remote-failed', message: 'Request refused by host' } }); break
    case 'plugin-4': pending.gate.resolve({ ok: true, value: { step: 'remove', result: { application: 'applied' } } }); break
    case 'plugin-5': pending.gate.resolve(installed('restart-required')); break
    case 'plugin-6': pending.gate.resolve(installed('overridden')); break
    case 'plugin-7': pending.gate.resolve(installed('cancelled')); break
    default: pending.gate.resolve(installed('applied'))
  }
  await tick()
}
await update
assert.equal(ui.progress().props.value, 11)
assert.equal(ui.progress().props.max, 11)
assert.equal(all(ui.list()).filter(node => node.type === 'input').length, 5)
assert.equal(ui.list().props.style.overflowY, undefined)
const failureText = text(ui.errors())
for (const expected of ['EPERM', 'C:/logs/update.log', 'Восстановление предыдущей версии', 'Transport disconnected', 'Request refused by host', 'step: remove', 'cancelled']) assert.ok(failureText.includes(expected), expected)
assert.ok(!failureText.includes('[object Object]'))
assert.ok(!failureText.includes('private-token'))
assert.ok(!failureText.includes('private-key'))
assert.match(text(ui.render()), /успешно 6.*не удалось 5/u)
assert.match(text(ui.render()), /Для применения обновления перезапустите DSH/u)
assert.match(text(ui.render()), /более высоким приоритетом/u)

// A selective retry must preserve errors belonging to the items the user did not retry.
const checkboxes = all(ui.list()).filter(node => node.type === 'input')
for (const checkbox of checkboxes.slice(1)) checkbox.props.onChange()
const retry = ui.button(1).props.onClick()
await tick()
assert.equal(mutations.at(-1).name, 'plugin-0')
mutations.at(-1).gate.resolve(installed('applied'))
await retry
assert.ok(!text(ui.errors()).includes('cannot rename'))
assert.ok(text(ui.errors()).includes('Transport disconnected'))
assert.ok(text(ui.errors()).includes('ECONNRESET'))

for (const count of [0, 10, 11]) {
  const boundary = harness({ listBundles: async () => ({ ok: true, value: Array.from({ length: count }, (_, i) => item(`boundary-${i}`)) }), listVersions: async name => listed(name) }, 'en')
  await boundary.button(0).props.onClick()
  assert.equal(boundary.list().props.style.overflowY, count > 10 ? 'scroll' : undefined)
  assert.equal(Boolean(boundary.progress()), count > 0)
}
const refused = harness({ listBundles: async () => ({ ok: false, error: { code: 'offline', message: 'Host is unavailable' } }) })
await refused.button(0).props.onClick()
assert.match(text(refused.render()), /Host is unavailable/u)
assert.equal(refused.button(0).props.disabled, false)
assert.equal(refused.progress(), undefined)
const partial = harness({
  listBundles: async () => ({ ok: true, value: [item('refused'), item('unsupported'), item('good')] }),
  listVersions: async name => name === 'refused'
    ? { ok: false, error: { code: 'registry-error', message: 'Registry request failed' } }
    : name === 'unsupported' ? { ok: true, value: { status: 'unavailable', reason: 'No registry catalog' } } : listed(name),
})
await partial.button(0).props.onClick()
assert.equal(partial.progress().props.value, 3)
assert.equal(all(partial.list()).filter(node => node.type === 'input').length, 1)
assert.match(text(partial.errors()), /Registry request failed/u)
assert.match(text(partial.errors()), /No registry catalog/u)
const large = harness({
  listBundles: async () => ({ ok: true, value: Array.from({ length: 50 }, (_, i) => item(`broken-${i}`)) }),
  listVersions: async () => ({ ok: false, error: { message: 'Registry unavailable' } }),
})
await large.button(0).props.onClick()
assert.equal(large.progress().props.value, 50)
assert.equal(large.progress().props.max, 50)
assert.equal(all(large.errors()).find(node => node.props.role === 'region').props.style.overflowY, 'auto')
for (const locale of ['de', 'en', 'es', 'fr', 'ja', 'pt', 'ru', 'zh', 'ru-RU', 'zh-CN', 'unknown']) {
  const copy = panelCopyFor(locale)
  assert.ok(copy.checkProgress(1, 12).includes('12'))
  assert.ok(copy.updateFailure)
  assert.ok(copy.errorsTitle)
}
assert.equal(failureDetail({}, 'fallback'), 'fallback')
assert.ok(failureDetail({ incompatible: [{ name: 'x', version: '2', runtimeVersion: '0.2.2-rc.3', requirements: { 'engines.dsh': '<0.2.0' } }] }, '').includes('engines.dsh: <0.2.0'))
assert.ok(failureDetail({ packageResult: { output: 'x'.repeat(20000) } }, '').length < 14020)
console.log('PASS: pending progress, partial check failures, self-exclusion, double-click guard, 0/10/11 row scrolling, per-plugin update diagnostics, rollback details, redaction, partial retries, restart/override notices and all locales')

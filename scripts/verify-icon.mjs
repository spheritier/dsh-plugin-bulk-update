import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = name => fs.readFileSync(path.join(root, name))
const manifest = JSON.parse(read('package.json'))
assert.equal(manifest.exports['./icon'], './assets/icon.svg')
assert.ok(manifest.files.includes('assets/'))
for (const [name, size] of [['icon.png', 512], ['icon-180.png', 180]]) {
  const png = read(`assets/${name}`)
  assert.equal(png.subarray(1, 4).toString(), 'PNG')
  assert.equal(png.readUInt32BE(16), size)
  assert.equal(png.readUInt32BE(20), size)
}
const svg = read('assets/icon.svg').toString()
assert.equal((svg.match(/<rect /g) ?? []).length, 5)
assert.ok(!/https?:\/\//.test(svg.replace('http://www.w3.org/2000/svg', '')))
const React = {
  createElement: (type, props, ...children) => ({ type, props: props ?? {}, children }),
  useCallback: callback => callback,
  useSyncExternalStore: (_subscribe, snapshot) => snapshot(),
}
let entry
vm.runInNewContext(read('lib/client.js').toString(), {
  window: { __ModuleLoader__: { load: definition => { entry = definition } } },
})
assert.equal(entry.id, manifest.name)
const client = entry.factory(name => {
  assert.equal(name, 'react')
  return React
})
let activeLocale = 'en'
const registrations = []
const ctx = {
  get: name => {
    assert.equal(name, 'locale')
    return { getSnapshot: () => ({ active: activeLocale }), subscribe: () => () => {} }
  },
  slots: {
    inject: (_name, register) => register(),
    register: (metadata, render) => { registrations.push({ metadata, render }); return () => {} },
  },
}
client.apply(ctx)
const sidebar = registrations.find(row => row.metadata.name === 'sidebar.panellist')
assert.ok(sidebar)
const collect = node => node && typeof node === 'object' ? [node, ...node.children.flatMap(collect)] : []
for (const [locale, label] of [['en', 'Plugin updates'], ['ru-RU', 'Обновления плагинов']]) {
  activeLocale = locale
  for (const size of [20, 24, 32]) {
    const element = sidebar.render({ size, active: true })
    const icon = element.type(element.props)
    assert.equal(icon.type, 'svg')
    assert.equal(icon.props.width, size)
    assert.equal(icon.props.height, size)
    assert.equal(icon.props['aria-label'], label)
    assert.equal(collect(icon).filter(node => node.type === 'rect').length, 4)
    assert.equal(collect(icon).filter(node => node.type === 'path').length, 2)
  }
}
console.log('PASS: icon export, packaged assets, PNG sizes, client loader, sidebar SVG at 20/24/32px and localized accessible labels')

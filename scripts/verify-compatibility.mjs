import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
// Optional fixture directory permits checking the real evaluator from another DSH release.
const fixture = process.argv[2] ? path.resolve(process.argv[2]) : root
const require = createRequire(path.join(fixture, 'package.json'))
const managerEntry = require.resolve('@deepseek-ai/dsh-plugin-manager')
const managerRequire = createRequire(managerEntry)
const bootEntry = managerRequire.resolve('@deepseek-ai/dsh-app-boot')
const { evaluatePluginCompatibility } = await import(pathToFileURL(bootEntry).href)
const semver = managerRequire('semver')
const range = '>=0.2.2-rc.2 <0.3.0-0'
assert.equal(manifest.engines.dsh, range)
const peers = Object.entries(manifest.peerDependencies).filter(([name]) => name.startsWith('@deepseek-ai/dsh-'))
assert.equal(peers.length, 6)
for (const [, declared] of peers) {
  assert.equal(declared, range)
  for (const version of ['0.2.2-rc.2', '0.2.2-rc.3', '0.2.2-rc.99', '0.2.2', '0.2.3']) {
    assert.ok(semver.satisfies(version, declared), `npm peer range rejects ${version}`)
  }
}
for (const version of ['0.2.2-rc.2', '0.2.2-rc.3', '0.2.2-rc.99', '0.2.2', '0.2.3-rc.1', '0.2.3', '0.2.99']) {
  assert.equal(evaluatePluginCompatibility(manifest, {}, version), undefined, `Host rejects ${version}`)
}
for (const version of ['0.1.9', '0.2.2-rc.1', '0.3.0-alpha.1', '0.3.0', '1.0.0']) {
  const result = evaluatePluginCompatibility(manifest, {}, version)
  assert.equal(result?.requirements['engines.dsh'], range, `Host should reject ${version}`)
  assert.equal(result?.exempted, false)
}
// Regression: reproduce the published 0.1.7 failure without granting an exemption.
const oldManifest = { ...manifest, version: '0.1.7', peerDependencies: { ...manifest.peerDependencies } }
delete oldManifest.engines
for (const [name] of peers) oldManifest.peerDependencies[name] = '0.2.2-rc.2'
assert.equal(evaluatePluginCompatibility(oldManifest, {}, '0.2.2-rc.2'), undefined)
assert.equal(Object.keys(evaluatePluginCompatibility(oldManifest, {}, '0.2.2-rc.3').requirements).length, 6)
console.log(`PASS: real DSH evaluator (${fixture}); published pin failure reproduced; rc.2/rc.3 accepted; range boundaries and npm peers verified without exemptions`)

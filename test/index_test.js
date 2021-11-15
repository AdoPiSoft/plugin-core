const ini = require('ini')
const fs = require('fs-extra')
const { expect } = require('chai')
const path = require('path')
const core = require('../index.js')

describe('plugin-core module', () => {
  describe('PluginCore class', () => {
    describe('config',  () => {
      let plugin
      let repo_dir = path.join('/tmp', 'plugin-' + Math.random())

      beforeEach(() => {
        const { PluginCore } = core
        const repo = {dir: repo_dir}
        plugin = new PluginCore(repo)
      })

      it('should read default config', async () => {
        const cfg = {key1: 'val1', key2: '2', key3: true}
        await fs.remove(path.join(repo_dir, 'config/saved.ini'))
        await fs.outputFile(path.join(repo_dir, 'config/default.ini'), ini.encode(cfg))
        const res = await plugin.config()
        expect(res).to.eql(cfg)
      })

      it('should read user config', async () => {
        const cfg = {key1: 'val1', key2: '2', key3: true}
        await fs.outputFile(path.join(repo_dir, 'config/saved.ini'), ini.encode(cfg))
        await fs.outputFile(path.join(repo_dir, 'config/default.ini'), '')
        const res = await plugin.config()
        expect(res).to.eql(cfg)
      })
    })
  })

  describe('init()', () => {
    it('should attach modules to itself', async () => {
      const app = 'some-app'
      const modules = {mod1: 'mod1', dbi: {models: 'models'}}
      core.init(app, modules)
      expect(core.app).to.eql(app)
      expect(core.mod1).to.eql('mod1')
      expect(core.core_models).to.eql(modules.dbi.models)
    })
  })
})

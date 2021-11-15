const ini = require('ini')
const fs = require('fs-extra')
const path = require('path')
const default_ini_file = 'default.ini'
const ini_file = 'saved.ini'

class PluginCore {
  constructor (repo) {
    this.repo = repo
    this._default_config_path = path.join(this.repo.dir, 'config', default_ini_file)
    this._user_config_path = path.join(this.repo.dir, 'config', ini_file)
  }

  async config (cfg) {
    if (cfg) {
      // save config
      await fs.outputFile(this._user_config_path, ini.encode(cfg))
    } else {
      // read config
      const cfg_str = await fs.readFile(this._user_config_path, 'utf8').catch(e => null)
      if (cfg_str)
        return ini.decode(cfg_str)
      else {
        const default_cfg_str = await fs.readFile(this._default_config_path, 'utf8').catch(e => null)
        if (default_cfg_str) return ini.decode(default_cfg_str)
      }
    }
  }

  async init() {}
  async install() {}
  async migrate() {}
  async start() {}
  async stop() {}
  async uninstall() {}
}

exports.PluginCore = PluginCore

exports.init = (app, modules)=>{
  exports.app = app
  Object.assign(exports, modules)
  exports.core_models = exports.dbi.models
}


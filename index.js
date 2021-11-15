'use strict'

exports.init = (app, modules)=>{
  exports.app = app
  Object.assign(exports, modules)
  exports.core_models = exports.dbi.models
}

const fs = require("fs")
const builddocs = require("builddocs")
var debug = require('debug')('http')
var mkdirp = require('mkdirp');

import StringBuilder = require('string-builder');

import {importsFor} from "./imports"
import moduleDef from "./genmodule";

export default function (config, modules, additionalTypes) {

  // let mold = loadTemplates(config, modules);
  let moduleContents = Object.create(null)

  for (let module of modules) {
    moduleContents[module.name] = builddocs.read({
      files: config.baseDir + module.name + config.srcDir + "*.js"
    });
  }

  if (!fs.existsSync(config.outDir)){
    mkdirp(config.outDir, function (err) {
      if (err) console.error(err)
      else console.log('dir created')
    });
  }

  for (let moduleName in moduleContents) {
    let imports = importsFor(moduleName, modules, moduleContents, additionalTypes);
    let sb = moduleDef(moduleContents[moduleName], moduleName, imports, additionalTypes);

    fs.writeFileSync(config.outDir + moduleName + ".d.ts", sb.toString());
  }

}

const fs = require("fs")
const builddocs = require("builddocs")
var debug = require('debug')('http')

import StringBuilder = require('string-builder');

import {importsFor} from "./imports"
import moduleDef from "./templates/module";

export default function (config, modules, additionalTypes) {

  // let mold = loadTemplates(config, modules);
  let moduleContents = Object.create(null)

  for (let module of modules) {
    moduleContents[module.name] = builddocs.read({
      files: config.baseDir + module.name + config.srcDir + "*.js"
    });
  }

  for (let moduleName in moduleContents) {
    let imports = importsFor(moduleName, modules, moduleContents);
    let sb = moduleDef(moduleContents[moduleName], moduleName, imports, additionalTypes);

    fs.writeFileSync(config.outDir + moduleName + ".d.ts", sb.toString());
  }

}

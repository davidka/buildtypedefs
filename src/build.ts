const fs = require("fs")
const builddocs = require("builddocs")
const mkdirp = require('mkdirp');

import {ModuleContents} from "./types"
import {AdditionalTypes} from "./env"
import {importsFor} from "./imports"
import moduleDef from "./genmodule";

export default function (
  config: { baseDir: string, srcDir: string, outDir: string },
  modules: { name: string }[],
  additionalTypes: AdditionalTypes
) {

  // let mold = loadTemplates(config, modules);
  let moduleContents: { [name: string]: ModuleContents } = Object.create(null)

  for (let module of modules) {
    moduleContents[module.name] = builddocs.read({
      files: config.baseDir + module.name + config.srcDir + "*.js"
    });
  }

  if (!fs.existsSync(config.outDir)){
    mkdirp(config.outDir, function (err: Error) {
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

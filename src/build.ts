const fs = require("fs")
const builddocs = require("builddocs")
const mkdirp = require('mkdirp');
const path = require('path')

import {ModuleContents} from "./types"
import {AdditionalTypes} from "./env"
import {importsFor} from "./imports"
import moduleDef from "./genmodule";

function mkdirpIfNotExists(dir: string) {
  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir)
    console.log("created '" + dir + "'")
  }
}

export default function (
  modules: { name: string, srcFiles: string, outFile: string }[],
  additionalTypes: AdditionalTypes
) {

  // let mold = loadTemplates(config, modules);
  let moduleContents: { [name: string]: ModuleContents } = Object.create(null)

  for (let module of modules) {
    moduleContents[module.name] = builddocs.read({ files: module.srcFiles });
  }

  for (let module of modules) {
    const mod = moduleContents[module.name]
    let imports = importsFor(module.name, modules, moduleContents, additionalTypes);
    let sb = moduleDef(mod, module.name, imports, additionalTypes);
    mkdirpIfNotExists(path.dirname(module.outFile))
    fs.writeFileSync(module.outFile, sb.toString());
  }

}

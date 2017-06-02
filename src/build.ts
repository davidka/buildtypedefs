const fs = require("fs")
const builddocs = require("builddocs")
const mkdirp = require('mkdirp');
const path = require('path')

import {ModuleContents} from "./types"
import {TypeInfos, baseTypes, mergeTypeInfos} from "./env"
import {exportedTypeInfos} from "./exports"
import moduleDef from "./genmodule";

function mkdirpIfNotExists(dir: string) {
  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir)
    console.log("created '" + dir + "'")
  }
}

export default function (
  modules: { name: string, srcFiles: string, outFile: string, header?: string }[],
  typeInfos: TypeInfos
) {

  let moduleContents: { [name: string]: ModuleContents } = Object.create(null)

  for (let module of modules) {
    const mod = builddocs.read({ files: module.srcFiles })
    typeInfos = mergeTypeInfos(exportedTypeInfos(module.name, mod), typeInfos)
    moduleContents[module.name] = mod
  }

  for (let module of modules) {
    const mod = moduleContents[module.name]
    let sb = moduleDef(mod, module.name, typeInfos);
    mkdirpIfNotExists(path.dirname(module.outFile))
    fs.writeFileSync(module.outFile, (module.header || '') + sb.toString());
  }

}

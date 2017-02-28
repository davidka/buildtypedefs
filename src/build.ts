const fs = require("fs")
const builddocs = require("builddocs")
var debug = require('debug')('http')
// const Mold = require("mold-template")


import StringBuilder = require('string-builder');

import {importsFor} from "./imports"
import moduleDef from "./templates/module";

export default function(config, modules) {
  let sb = new StringBuilder("");

  // let mold = loadTemplates(config, modules);
  let moduleContents = Object.create(null)

  for (let module of modules) {
    moduleContents[module.name] = builddocs.read({
      files: config.baseDir + module.name + config.srcDir + "*.js"
    });
  }

  for (let moduleName in moduleContents) {
    let imports = importsFor(moduleName, modules, moduleContents);
    moduleDef(sb, moduleContents[moduleName], moduleName, imports);

    fs.writeFileSync(config.outDir + moduleName + ".d.ts", sb.toString());
  }

}

// function loadTemplates(config, data) {
//   let mold = new Mold();

//   fs.readdirSync(config.templateDir).forEach(function (filename) {
//     mold.bake(filename, fs.readFileSync(config.templateDir + "/" + filename, "utf8").trim())
//   });

//   return mold;
// }

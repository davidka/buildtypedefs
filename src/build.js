const fs = require("fs")
const builddocs = require("builddocs")
const Mold = require("mold-template")
const importsFor = require("./imports").importsFor

exports.build = function(config, modules) {
  let mold = loadTemplates(config, modules);
  let moduleContents = Object.create(null)

  modules.forEach(module => moduleContents[module.name] = builddocs.read({
    files: config.baseDir + module.name + config.srcDir + "*.js"
  }));

  Object.keys(moduleContents).forEach(function (moduleName) {
    let imports = importsFor(moduleName, modules, moduleContents);
    let typeDefs = mold.defs.module({ module: moduleContents[moduleName], name: moduleName, deps: imports });

    fs.writeFileSync(config.outDir + moduleName + ".d.ts", typeDefs);
  });
}

function loadTemplates(config, data) {
  let mold = new Mold();

  fs.readdirSync(config.templateDir).forEach(function (filename) {
    mold.bake(filename, fs.readFileSync(config.templateDir + "/" + filename, "utf8").trim())
  });

  return mold;
}
var buildtypedefs = require("./build")
var builddocs = require("builddocs")
var baseDir = __dirname + "/../node_modules/"

var modules = [{
  name: "prosemirror-state",
  deps: ["prosemirror-model", "prosemirror-transform", "prosemirror-view"]
}];

function importsFor(mod) {
  let seen = Object.create(null), result = []
  function enter(name) {
    if (name in seen) return
    seen[name] = true
    let mod
    for (let i = 0; i < modules.length; i++)
      if (modules[i].name == name) mod = modules[i]
    if (mod.deps) mod.deps.forEach(enter)
    result.push(getImport(name))
  }
  if (mod.deps) mod.deps.forEach(enter)
  return result
}

let moduleContents = Object.create(null)
modules.forEach(module => moduleContents[module.name] = builddocs.read({
  files: baseDir + module.name + "/src/plugin.js"
}))


let typeDefs = modules.map(module => {
  buildtypedefs.build(
    {
      name: module.name,
      templateDir: './templates',
      outDir: './out/'
    },
    moduleContents[module.name]
  );
});

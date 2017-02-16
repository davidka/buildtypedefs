
let addImport = function(name, imports, moduleContents) {
  if (!imports[name]) {
    imports[name] = []
    for (let propName in moduleContents[name].all) {
      let prop = moduleContents[name].all[propName];

      if (prop.type == "class" ||  prop.type == "interface")  {
        imports[name].push(propName);
      }

    }
  }
}

exports.importsFor = function(moduleName, modules, moduleContents) {
  let mod = modules.find((module) => module.name == moduleName);
  let imports = Object.create(null)
  let seen = Object.create(null), result = []

  function enter(name) {
    if (name in seen) return
    seen[name] = true

    let mod
    for (let i = 0; i < modules.length; i++) {
      if (modules[i].name == name) {
        mod = modules[i];
      }
    }

    if (mod && mod.deps) {
      mod.deps.forEach(enter)
    }

    addImport(name, imports, moduleContents)
  }
  if (mod.deps) {
    mod.deps.forEach(enter)
  }

  return imports;
}

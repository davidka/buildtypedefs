
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

export function importsFor(moduleName: string, modules: Array<any>, moduleContents: Object): Object {

  let mod = modules.find((module) => module.name == moduleName);
  let imports = Object.create(null)
  let seen = Object.create(null)

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


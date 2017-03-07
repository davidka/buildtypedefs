
let addImport = function (name, imports, moduleContents, additionalTypes: Object) {
  if (!imports[name]) {
    imports[name] = []
    for (let propName in moduleContents[name].all) {
      let prop = moduleContents[name].all[propName];

      if (prop.type == "class" ||  prop.type == "interface")  {
        if (additionalTypes[propName]) {
          imports[name].push(additionalTypes[propName].replacement);
        } else {
          imports[name].push(propName);
        }
        
      }

    }
  }
}

export function importsFor(moduleName: string, modules: Array<any>, moduleContents: Object, additionalTypes: Object): Object {

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

    addImport(name, imports, moduleContents, additionalTypes)
  }
  if (mod.deps) {
    mod.deps.forEach(enter)
  }

  return imports;
}


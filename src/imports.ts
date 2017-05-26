import {AdditionalTypes} from "./env"
import {Declaration, isClassOrInterfaceDeclaration, ModuleContents} from "./types"

let addImport = function (name: string, imports: { [name: string]: string[] }, moduleContents: ModuleContents, additionalTypes: AdditionalTypes) {
  if (!imports[name]) {
    imports[name] = []
    for (let propName in moduleContents[name].all) {
      let prop = moduleContents[name].all[propName];

      if (isClassOrInterfaceDeclaration(prop))  {
        if (additionalTypes[propName]) {
          imports[name].push(additionalTypes[propName].replacement);
        } else {
          imports[name].push(propName);
        }
        
      }

    }
  }
}

export function importsFor(moduleName: string, modules: { name: string, deps?: string[] }[], moduleContents: { [name: string]: ModuleContents }, additionalTypes: AdditionalTypes): Object {

  let mod = modules.find((module) => module.name == moduleName);
  if (mod == undefined) { throw new Error("could not find module with name '"+moduleName+"'!"); }
  let imports = Object.create(null)
  let seen = Object.create(null)

  function enter(name: string) {
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


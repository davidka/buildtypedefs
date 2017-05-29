import {TypeInfos} from "./env"
import {isClassOrInterfaceDeclaration, ModuleContents} from "./types"

function exportedTypes(moduleContents: ModuleContents): string[] {
  if (!moduleContents.all) { return []; }
  const exports: string[] = [];
  for (let propName in moduleContents.all) {
    const prop = moduleContents.all[propName];
    if (isClassOrInterfaceDeclaration(prop)) {
      exports.push(propName);
    }
  }
  return exports;
}

export function exportedTypeInfos(moduleName: string, moduleContents: ModuleContents) {
  const typeInfos: TypeInfos = {}
  const types = exportedTypes(moduleContents)
  for (let type of types) {
    typeInfos[type] = { definedIn: moduleName }
  }
  return typeInfos
}
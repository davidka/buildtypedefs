import StringBuilder = require('string-builder');

export type Imports = { [moduleName: string]: string[] }

export type TypeInfo = { replaceBy?: string, definedIn?: string }
export type TypeInfos = { [typeName: string]: TypeInfo }

export const baseTypes: TypeInfos = {
  bool: { replaceBy: 'boolean' },
  string: {},
  number: {},
  any: {},
  Object: {},
  this: {},
  null: {},
  undefined: {},
  T: {} // TODO: handle type parameters dynamically!
}

function mergeTypeInfo(a: TypeInfo, b: TypeInfo, typeName) {
  if (typeof a.replaceBy == 'string' && typeof b.replaceBy == 'string') {
    throw new Error("conflicting 'replaceBy' information for type '" + typeName + "'!")
  }
  if (typeof a.definedIn == 'string' && typeof b.definedIn == 'string') {
    throw new Error("conflicting 'definedIn' information for type '" + typeName + "'!")
  }
  return {
    replaceBy: a.replaceBy || b.replaceBy,
    definedIn: a.definedIn || b.definedIn
  }
}

export function mergeTypeInfos(a: TypeInfos, b: TypeInfos): TypeInfos {
  const res = {}
  for (let typeName in a) {
    if (b[typeName]) {
      res[typeName] = mergeTypeInfo(a[typeName], b[typeName], typeName)
    } else {
      res[typeName] = a[typeName]
    }
  }
  for (let typeName in b) {
    if (!a[typeName]) {
      res[typeName] = b[typeName]
    }
  }
  return res
}

export class GenEnv {
  readonly imports: Imports
  private currModuleName: string
  private typeInfos: TypeInfos
  readonly sb: StringBuilder
  private indentation: string
  private firstInLine: boolean

  private static warnedAbout: { [name: string]: true } = {}

  constructor(currModuleName: string, imports: Imports, typeInfos: TypeInfos, sb: StringBuilder, indentation: string = "", firstInLine: boolean = true) {
    this.currModuleName = currModuleName
    this.imports = imports
    this.typeInfos = typeInfos
    this.sb = sb
    this.indentation = indentation
    this.firstInLine = firstInLine
  }

  indent(): GenEnv {
    return new GenEnv(this.currModuleName, this.imports, this.typeInfos, this.sb, this.indentation + "  ", this.firstInLine)
  }

  resolveTypeName(rawName: string): string {
    const typeInfo = this.typeInfos[rawName]
    if (/^\"[^\"]*\"$/.test(rawName)) {
      return rawName
    }
    if (typeInfo) {
      const name = typeof typeInfo.replaceBy == 'string' ? typeInfo.replaceBy : rawName
      if (typeof typeInfo.definedIn == 'string' && typeInfo.definedIn != this.currModuleName) {
        const importsFromModule = this.imports[typeInfo.definedIn] || []
        if (importsFromModule.indexOf(name) == -1) importsFromModule.push(name)
        this.imports[typeInfo.definedIn] = importsFromModule
      }
      return name
    }
    if (!GenEnv.warnedAbout[rawName]) {
      console.log("unknown type '" + rawName + "'!")
      GenEnv.warnedAbout[rawName] = true
    }
    return rawName
  }

  append(str: string) {
    if (str == "") return
    if (this.firstInLine) this.sb.append(this.indentation)
    this.firstInLine = false
    this.sb.append(str)
  }

  appendLine(str: string) {
    if (str != "") {
      this.sb.appendLine(this.indentation + str)
    } else {
      this.sb.appendLine(str)
    }
    this.firstInLine = true
  }
} 

export function emptyEnvForTests(): GenEnv {
  return new GenEnv("test", {}, baseTypes, new StringBuilder())
}
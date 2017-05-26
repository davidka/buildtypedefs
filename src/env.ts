import StringBuilder = require('string-builder');

export type AdditionalTypes = { [typeName: string]: { replacement: string }}

export class GenEnv {
  items: Object
  imports: string[]
  additionalTypes: AdditionalTypes
  sb: StringBuilder
  indentation: string
  firstInLine: boolean

  constructor(items: Object, imports: string[], additionalTypes: AdditionalTypes, sb: StringBuilder, indentation: string = "", firstInLine: boolean = true) {
    this.items = items;
    this.imports = imports;
    this.additionalTypes = additionalTypes;
    this.sb = sb
    this.indentation = indentation
    this.firstInLine = firstInLine
  }

  indent(): GenEnv {
    return new GenEnv(this.items, this.imports, this.additionalTypes, this.sb, this.indentation + "  ")
  }

  append(str: string) {
    if (str == "") return
    if (this.firstInLine) this.sb.append(this.indentation)
    this.firstInLine = false
    this.sb.append(str)
  }

  appendLine(str: string) {
    if (this.firstInLine && str != "") this.sb.append(this.indentation)
    this.sb.appendLine(str)
    this.firstInLine = true
  }
} 

export function emptyEnv(): GenEnv {
  return new GenEnv({}, [], {}, new StringBuilder())
}
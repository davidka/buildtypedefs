import StringBuilder = require('string-builder');

export type AdditionalTypes = { [typeName: string]: { replacement: string }}

export class GenEnv {
  items: Object
  imports: string[]
  additionalTypes: AdditionalTypes
  sb: StringBuilder

  constructor(items: Object, imports: string[], additionalTypes: AdditionalTypes, sb: StringBuilder) {
    this.items = items;
    this.imports = imports;
    this.additionalTypes = additionalTypes;
    this.sb = sb
  }

  append(str: string) {
    this.sb.append(str)
  }

  appendLine(str: string) {
    this.sb.appendLine(str)
  }
} 

export function emptyEnv(): GenEnv {
  return new GenEnv({}, [], {}, new StringBuilder())
}
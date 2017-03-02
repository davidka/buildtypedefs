import StringBuilder = require('string-builder');

let knownTypes = ["string", "bool", "number", "any", "T"]

export default function (type: any, items: Object, imports: Array<string>) {
  if (knownTypes.indexOf(type) == -1 && imports.indexOf(type) == - 1 && !items[type]) {
    imports.push(type);
  }
}
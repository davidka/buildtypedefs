// <<in {type, items, imports}>>

// <<do knownTypes = ["string", "bool", "number", "any", "T"]>>
// <<if knownTypes.indexOf(type) == -1 && imports.indexOf(type)==- 1 && !items[type]>>
//   <<do imports.push(type)>>
// <</if>> 


import StringBuilder = require('string-builder');

let knownTypes = ["string", "bool", "number", "any", "T"]

export default function (type: any, items: Object, imports: Array<string>) {
  if (knownTypes.indexOf(type) == -1 && imports.indexOf(type) == - 1 && !items[type]) {
    imports.push(type);
  }
}
// <<in {type, items, imports}>>

// <<do knownTypes = ["string", "bool", "number", "any", "T"]>>
// <<if knownTypes.indexOf(type) == -1 && imports.indexOf(type)==- 1 && !items[type]>>
//   <<do imports.push(type)>>
// <</if>> 


import StringBuilder = require('string-builder');

export default function (sb: StringBuilder, type: any, items: Object, imports: Object) {

}
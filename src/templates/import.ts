import StringBuilder = require('string-builder');

let knownTypes = ["string", "bool", "number", "any", "T"]

export default function (type: any, items: Object, imports: Array<string>, additionalTypes: Object) {
  if (knownTypes.indexOf(type) == -1 && imports.indexOf(type) == - 1 && !items[type]) {
    if (additionalTypes[type]) {
      if(imports.indexOf(additionalTypes[type].replacement) == - 1){
        imports.push(additionalTypes[type].replacement); 
      }
    }
    else imports.push(type);
  }
}
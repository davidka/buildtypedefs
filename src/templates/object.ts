// <<in {item, items, imports}>>

// : { 
//   <<for name, prop in item.properties>>
//     <<if $i>>, <</if>>
//     <<t name>>
//     <<type  {item: prop, items: items, imports: imports}>>
//   <</for>>
// }

import StringBuilder = require('string-builder');
import typeDef from "./type";

export default function (sb: StringBuilder, item: any, items: Object, imports: Object) {
  sb.append(": ")
  if(item.properties){
    sb.append("{")
    
    let first: boolean = true;
    for (let name in item.properties) {
      if (!first) sb.append(", ")
      first = false;
      sb.append(name)
      typeDef(sb, item.properties[name], false, false, items, imports)
    }
    sb.append("}")
  } else {
    sb.append("Object")
  }
  
}
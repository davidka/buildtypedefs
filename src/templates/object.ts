import StringBuilder = require('string-builder');
import typeDef from "./type";

export default function (sb: StringBuilder, item: any, skipColon: boolean, items: Object, imports: Array<string>, additionalTypes: Object) {

  if (item.optional && !item.isReturn) sb.append("?")
  if(!skipColon) sb.append(": ")
  if(item.properties){
    sb.append("{")
    
    let first: boolean = true;
    for (let name in item.properties) {
      if (!first) sb.append(", ")
      first = false;
      sb.append(name)
      typeDef(sb, item.properties[name], false, false, false, items, imports, additionalTypes)
    }
    sb.append("}")
  } else {
    sb.append("Object")
  }

  if (item.optional && item.isReturn) sb.append(" | void")
  
}
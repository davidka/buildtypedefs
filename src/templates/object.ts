import StringBuilder = require('string-builder');
import typeDef from "./type";
import {ObjectType} from "../types";

export default function (sb: StringBuilder, item: ObjectType, items: Object, imports: Array<string>, additionalTypes: Object) {

  sb.append("{")
  
  let first: boolean = true;
  for (let name in item.properties) {
    const prop = item.properties[name]
    if (!first) sb.append(", ")
    first = false;
    sb.append(name)
    if (prop.optional) sb.append("?")
    sb.append(": ")
    typeDef(sb, prop, false, items, imports, additionalTypes)
  }
  sb.append("}")
  
}
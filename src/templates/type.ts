import StringBuilder = require('string-builder');
import functionDef from "./function";
import typeDef from "./type";
import objectDef from "./object";
import importDef from "./import";
import {Type} from "../types";
import * as types from "../types";


export default function (sb: StringBuilder, item: Type, isParam: boolean, 
  items: Object, imports: Array<string>, additionalTypes: Object) {

  if (types.isFunction(item)) {
    functionDef(sb, item, items, imports, isParam, false, additionalTypes)
  } else if (types.isArray(item)) {
    const elemType = item.typeParams[0];
    if (types.isFunction(elemType)) {
      sb.append("(")
      functionDef(sb, elemType, items, imports, true, false, additionalTypes);
      sb.append(")")
    } else {
      typeDef(sb, elemType, false, items, imports, additionalTypes)
    }
    sb.append("[]");
  } else if (types.isObject(item)) {
    objectDef(sb, item, items, imports, additionalTypes)
  } else if (item.type == "union") {
    const typeParams = item.typeParams || [];
    for (let i in typeParams) {
      if (i != "0") sb.append(" | ")
      if (typeParams[i].type == "Function") {
        sb.append("(")
        typeDef(sb, typeParams[i], true, items, imports, additionalTypes)
        sb.append(")")
      } else {
        typeDef(sb, typeParams[i], true, items, imports, additionalTypes)
      }

    }
  } else {
    importDef(item.type, items, imports, additionalTypes)

    switch(item.type) {
      case "bool":
        sb.append("boolean")
        break
      default:
        if (additionalTypes[item.type]) sb.append(additionalTypes[item.type].replacement)
        else sb.append(item.type)
        
        break
    }

    if (item.typeParams) {
      sb.append("<")
      for (let i in item.typeParams) {
        if (i != "0") sb.append(", ")
        typeDef(sb, item.typeParams[i], true, items, imports, additionalTypes)
      }
      sb.append(">")
    }
  }
}
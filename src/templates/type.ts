import StringBuilder = require('string-builder');
import functionDef from "./function";
import typeDef from "./type";
import objectDef from "./object";
import importDef from "./import";
import {Type} from "../types";
import * as types from "../types";


export default function (sb: StringBuilder, item: Type, skipOptional: boolean, skipColon: boolean, isParam: boolean, 
  items: Object, imports: Array<string>, additionalTypes: Object, useDummyName: boolean = true) {

  if (types.isFunction(item)) {
    functionDef(sb, item, items, imports, isParam, additionalTypes, useDummyName)
  } else if (types.isArray(item)) {
    if (!skipOptional && item.optional) sb.append("?")
    const firstParam = item.typeParams[0];
    if (types.isFunction(firstParam)) {
      sb.append(": (")
      functionDef(sb, firstParam, items, imports, true, additionalTypes, false);
      sb.append(")")
    } else {
      typeDef(sb, item.typeParams[0], false, skipColon, false, items, imports, additionalTypes)
    }
    sb.append("[]");
  } else if (types.isObject(item)) {
    objectDef(sb, item, skipColon, items, imports, additionalTypes)
  } else if (item.type == "union") {
    if (!skipOptional && item.optional) sb.append("?")
    if (isParam || /\^returns$/.test(item.id) || !skipColon){
      sb.append(": ")
    }
    const typeParams = item.typeParams || [];
    for (let i in typeParams) {
      if (i != "0") sb.append(" | ")
      if (typeParams[i].type == "Function") {
        sb.append("(")
        typeDef(sb, typeParams[i], false, true, true, items, imports, additionalTypes, false)
        sb.append(")")
      } else {
        typeDef(sb, typeParams[i], false, true, true, items, imports, additionalTypes)
      }

    }
  } else {
    importDef(item.type, items, imports, additionalTypes)
    
    if(!skipOptional && item.optional) sb.append("?")
    if (!skipColon) sb.append(": ")

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
        typeDef(sb, item.typeParams[i], false, true, true, items, imports, additionalTypes)
      }
      sb.append(">")
    }
  }
}
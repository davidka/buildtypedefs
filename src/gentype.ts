import StringBuilder = require('string-builder');
import {Type, FunctionType, ObjectType, Parameter} from "./types";
import * as types from "./types";

const knownTypes = ["string", "bool", "number", "any", "T"]

export default function importDef(type: any, items: Object, imports: string[], additionalTypes: Object) {
  if (knownTypes.indexOf(type) == -1 && imports.indexOf(type) == - 1 && !items[type]) {
    if (additionalTypes[type]) {
      if(imports.indexOf(additionalTypes[type].replacement) == - 1){
        imports.push(additionalTypes[type].replacement); 
      }
    }
    else imports.push(type);
  }
}

export function functionParamsDef(sb: StringBuilder, params: Parameter[], items: Object, imports: string[], additionalTypes: Object) {
  sb.append("(")

  let dummyNameCounter = 0;
  for(let i in params) {
    let param = params[i];
    if(i != "0") sb.append(", ")
    if(param.rest) {
      sb.append("...")
    }

    if (param.name) sb.append(param.name)
    else {
      sb.append("p")
      if(params.length > 1) sb.append((++dummyNameCounter).toString())
    }
    if (param.optional) sb.append("?")
    sb.append(": ")
    typeDef(sb, param, true, items, imports, additionalTypes)
  }

  sb.append(")")
}

export function functionDef(sb: StringBuilder, item: FunctionType, items: Object, imports: string[], isParam: boolean, additionalTypes: Object) {
  functionParamsDef(sb, item.params, items, imports, additionalTypes);

  if(item.returns) {
    if (isParam || /\^returns\^returns$/.test(item.returns.id)) {
      sb.append(" => ")
      typeDef(sb, item.returns, true, items, imports, additionalTypes)
    } else {
      sb.append(": ")
      typeDef(sb, item.returns, false, items, imports, additionalTypes)
    }
  } else {
    if (isParam) sb.append(" => ")
    else sb.append(": ")
    sb.append("void")
  }

}

export function objectDef(sb: StringBuilder, item: ObjectType, items: Object, imports: string[], additionalTypes: Object) {
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

export function typeDef(sb: StringBuilder, item: Type, isParam: boolean, 
  items: Object, imports: Array<string>, additionalTypes: Object) {

  if (types.isFunction(item)) {
    functionDef(sb, item, items, imports, isParam, additionalTypes)
  } else if (types.isArray(item)) {
    const elemType = item.typeParams[0];
    if (types.isFunction(elemType)) {
      sb.append("(")
      functionDef(sb, elemType, items, imports, true, additionalTypes);
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
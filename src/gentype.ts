import {GenEnv} from "./env"
import {Type, FunctionType, ObjectType, Parameter} from "./types";
import * as types from "./types";

const knownTypes = ["string", "bool", "number", "any", "T"]

export default function importDef(type: string, {items, imports, additionalTypes}: GenEnv) {
  if (knownTypes.indexOf(type) == -1 && imports.indexOf(type) == - 1 && !items[type]) {
    if (additionalTypes[type]) {
      if(imports.indexOf(additionalTypes[type].replacement) == - 1){
        imports.push(additionalTypes[type].replacement); 
      }
    }
    else imports.push(type);
  }
}

export function functionParamsDef(env: GenEnv, params: Parameter[]) {
  env.append("(")

  let dummyNameCounter = 0;
  for(let i in params) {
    let param = params[i];
    if(i != "0") env.append(", ")
    if(param.rest) {
      env.append("...")
    }

    if (param.name) env.append(param.name)
    else {
      env.append("p")
      if(params.length > 1) env.append((++dummyNameCounter).toString())
    }
    if (param.optional) env.append("?")
    env.append(": ")
    typeDef(env, param)
  }

  env.append(")")
}

export function functionReturnDef(env: GenEnv, type: FunctionType) {
  if(type.returns) {
    typeDef(env, type.returns)
  } else {
    env.append("void")
  }
}

export function functionDef(env: GenEnv, item: FunctionType) {
  functionParamsDef(env, item.params);
  env.append(" => ")
  functionReturnDef(env, item);
}

export function objectDef(env: GenEnv, item: ObjectType) {
  env.append("{")
  
  let first: boolean = true;
  for (let name in item.properties) {
    const prop = item.properties[name]
    if (!first) env.append(", ")
    first = false;
    env.append(name)
    if (prop.optional) env.append("?")
    env.append(": ")
    typeDef(env, prop)
  }

  env.append("}")
}

export function typeDef(env: GenEnv, item: Type) {

  if (types.isFunction(item)) {
    functionDef(env, item)
  } else if (types.isArray(item)) {
    const elemType = item.typeParams[0];
    if (types.isFunction(elemType)) {
      env.append("(")
      functionDef(env, elemType);
      env.append(")")
    } else {
      typeDef(env, elemType)
    }
    env.append("[]");
  } else if (types.isObject(item)) {
    objectDef(env, item)
  } else if (item.type == "union") {
    const typeParams = item.typeParams || [];
    for (let i in typeParams) {
      if (i != "0") env.append(" | ")
      if (typeParams[i].type == "Function") {
        env.append("(")
        typeDef(env, typeParams[i])
        env.append(")")
      } else {
        typeDef(env, typeParams[i])
      }

    }
  } else {
    importDef(item.type, env)

    switch(item.type) {
      case "bool":
        env.append("boolean")
        break
      default:
        if (env.additionalTypes[item.type]) env.append(env.additionalTypes[item.type].replacement)
        else env.append(item.type)
        
        break
    }

    if (item.typeParams) {
      env.append("<")
      for (let i in item.typeParams) {
        if (i != "0") env.append(", ")
        typeDef(env, item.typeParams[i])
      }
      env.append(">")
    }
  }
}
import {GenEnv} from "./env"
import {Type, FunctionType, ObjectType, Parameter, OtherType} from "./types";
import * as types from "./types";

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

export function unionWith(t: Type, ...ts: Type[]): Type {
  if (types.isOther(t) && t.type == "union") {
    return { type: "union", typeParams: (t.typeParams || []).concat(ts) }
  }
  return { type: "union", typeParams: [t].concat(ts) }
}

export const undefinedType: Type = { type: "undefined" };
export const nullType: Type = { type: "null" };

export function functionReturnDef(env: GenEnv, type: types.ReturnType | undefined) {
  if(type) {
    typeDef(env, type.optional ? unionWith(type, nullType, undefinedType) : type)
  } else {
    env.append("void")
  }
}

export function functionDef(env: GenEnv, item: FunctionType) {
  functionParamsDef(env, item.params);
  env.append(" => ")
  functionReturnDef(env, item.returns);
}

export function objectDef(env: GenEnv, item: ObjectType) {
  env.append("{ ")
  
  let first: boolean = true;
  for (let name in item.properties) {
    const prop = item.properties[name]
    if (!first) env.append(", ")
    first = false;
    env.append(name)
    if (prop.optional) {
      env.append("?: ")
      typeDef(env, unionWith(prop, nullType))
    } else {
      env.append(": ")
      typeDef(env, prop)
    }
  }

  env.append(" }")
}

function unionDef(env: GenEnv, typeParams: Type[], addParens: boolean = false) {
  if (typeParams.length == 0) {
    env.append("never")
  } else if (typeParams.length == 1) {
    typeDef(env, typeParams[0], addParens)
  } else {
    if (addParens) env.append("(")
    for (let i = 0; i < typeParams.length; i++) {
      if (i > 0) env.append(" | ")
      typeDef(env, typeParams[i], true)
    }
    if (addParens) env.append(")")
  }
}

function otherDef(env: GenEnv, type: OtherType) {
  env.append(env.resolveTypeName(type.type))

  if (type.typeParams) {
    env.append("<")
    for (let i = 0; i < type.typeParams.length; i++) {
      if (i > 0) env.append(", ")
      typeDef(env, type.typeParams[i])
    }
    env.append(">")
  }
}

export function typeDef(env: GenEnv, item: Type, addParens: boolean = false) {
  if (types.isFunction(item)) {
    if (addParens) env.append("(")
    functionDef(env, item)
    if (addParens) env.append(")")
  } else if (types.isArray(item)) {
    const elemType = item.typeParams[0];
    typeDef(env, elemType, true);
    env.append("[]");
  } else if (types.isObject(item)) {
    objectDef(env, item)
  } else if (item.type == "union") {
    unionDef(env, item.typeParams || [], addParens)
  } else if (item.type == "Object" && item.typeParams && item.typeParams.length == 1) {
    const valueType = item.typeParams[0];
    env.append("{ [name: string]: ")
    typeDef(env, valueType)
    env.append(" }")
  } else {
    otherDef(env, item)
  }
}
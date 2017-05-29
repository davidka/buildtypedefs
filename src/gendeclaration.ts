import {GenEnv} from "./env"
import {FunctionType, Type, isFunction, isObject, Declaration, ClassOrInterfaceDeclaration, isClassOrInterfaceDeclaration} from "./types";
import {typeDef, functionParamsDef, functionReturnDef} from "./gentype";

function functionDeclarationDef(env: GenEnv, item: FunctionType) {
  functionParamsDef(env, item.params);
  env.append(": ")
  functionReturnDef(env, item.returns);
}

export function miscDef(env: GenEnv, type: Type, name: string, isInlineProp: boolean, processItemProperties: boolean = true) {

  if (isFunction(type)) {
    const isConstructor = typeof type.id == "string" && /\.constructor$/.test(type.id);
    if (isConstructor) {
      env.append("constructor")
      functionParamsDef(env, type.params);
    } else {
      if(!isInlineProp) env.append("function ")
      env.append(name)
      functionDeclarationDef(env, type);
    }
  }
  else {
    if(!isInlineProp) env.append("let ")
    env.append(name + ": ")
    if (type.type) typeDef(env, type);
    env.append(";")
  }

  if(isObject(type) && processItemProperties) {
    for (let prop in type.properties) {
      miscDef(env, type.properties[prop], prop, true)
    }
  }

}

export function classDef(env: GenEnv, decl: ClassOrInterfaceDeclaration, name: string) {
  env.append(decl.type + " " + name + " ")

  if (decl.typeParams) {
    env.append("<")
    for(let i in decl.typeParams) {
      if (i != "0"){
        env.append(", ")
      }

      typeDef(env, decl.typeParams[i]);
    }
    env.append("> ")
  }

  if(decl.extends) {
    env.append("extends ")
    typeDef(env, decl.extends);
    env.append(" ")
  }

  env.append("{")

  const indented = env.indent();

  if ("constructor" in decl && !(decl.constructor instanceof Function)) {
    indented.appendLine("")
    miscDef(indented, decl.constructor, name, false);
  }

  if (decl.properties) {
    for (let prop in decl.properties) {
      indented.appendLine("")
      miscDef(indented, decl.properties[prop], prop, true);
    }
  }

  if (decl.staticProperties) {
    for (let prop in decl.staticProperties) {
      indented.appendLine("")
      indented.append("static ")
      miscDef(indented, decl.staticProperties[prop], prop, true);
    }
  }

  env.appendLine("}")
}

export function itemDef(env: GenEnv, decl: Declaration, name: string) {
  if(isClassOrInterfaceDeclaration(decl)) {
    classDef(env, decl, env.resolveTypeName(name))
  } else {
    miscDef(env, decl, name, false, false)
  }
}
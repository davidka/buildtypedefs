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

  env.appendLine("");

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
    env.append(" extends ")
    typeDef(env, decl.extends);
  }

  env.append("{ ")
  env.appendLine("")

  if ("constructor" in decl && !(decl.constructor instanceof Function)) {
    miscDef(env, decl.constructor, name, false);
  }

  if (decl.properties) {
    for (let prop in decl.properties) {
      miscDef(env, decl.properties[prop], prop, true);
    }
  }

  if (decl.staticProperties) {
    for (let prop in decl.staticProperties) {
      env.append("static ")
      miscDef(env, decl.staticProperties[prop], prop, true);
    }
  }

  env.appendLine("}")
  env.appendLine("")
}

export function itemDef(env: GenEnv, decl: Declaration, name: string) {

  if(env.additionalTypes[name]) {
    name = env.additionalTypes[name].replacement;
  }

  if(isClassOrInterfaceDeclaration(decl)) {
    classDef(env, decl, name)
  } else {
    miscDef(env, decl, name, false, false)
  }

}
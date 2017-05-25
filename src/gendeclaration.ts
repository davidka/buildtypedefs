import StringBuilder = require('string-builder');
import {FunctionType, Type, isFunction, isObject, Declaration, ClassOrInterfaceDeclaration, isClassOrInterfaceDeclaration} from "./types";
import {typeDef, functionParamsDef, functionReturnDef, functionDef} from "./gentype";

function functionDeclarationDef(sb: StringBuilder, item: FunctionType, items: Object, imports: string[], additionalTypes: Object) {
  functionParamsDef(sb, item.params, items, imports, additionalTypes);
  sb.append(": ")
  functionReturnDef(sb, item, items, imports, additionalTypes);
}

export function miscDef(sb: StringBuilder, type: Type, name: string, isInlineProp: boolean, items: Object, 
  imports: string[], additionalTypes: Object, processItemProperties: boolean = true) {

  if (isFunction(type)) {
    const isConstructor = typeof type.id == "string" && /\.constructor$/.test(type.id);
    if (isConstructor) {
      sb.append("constructor")
      functionParamsDef(sb, type.params, items, imports, additionalTypes);
    } else {
      if(!isInlineProp) sb.append("function ")
      sb.append(name)
      functionDeclarationDef(sb, type, items, imports, additionalTypes);
    }
  }
  else {
    if(!isInlineProp) sb.append("let ")
    sb.append(name + ": ")
    if (type.type) typeDef(sb, type, items, imports, additionalTypes);
    sb.append(";")
  }

  sb.appendLine("");

  if(isObject(type) && processItemProperties) {
    for (let prop in type.properties) {
      miscDef(sb, type.properties[prop], prop, true, items, imports, additionalTypes)
    }
  }

}

export function classDef(sb: StringBuilder, decl: ClassOrInterfaceDeclaration, name: string, items: Object, imports: string[], additionalTypes: Object) {
  sb.append(decl.type + " " + name + " ")

  if (decl.typeParams) {
    sb.append("<")
    for(let i in decl.typeParams) {
      if (i != "0"){
        sb.append(", ")
      }

      typeDef(sb, decl.typeParams[i], items, imports, additionalTypes);
    }
    sb.append("> ")
  }

  if(decl.extends) {
    sb.append(" extends ")
    typeDef(sb, decl.extends, items, imports, additionalTypes);
  }

  sb.append("{ ")
  sb.appendLine("")

  if ("constructor" in decl && !(decl.constructor instanceof Function)) {
    miscDef(sb, decl.constructor, name, false, items, imports, additionalTypes);
  }

  if (decl.properties) {
    for (let prop in decl.properties) {
      miscDef(sb, decl.properties[prop], prop, true, items, imports, additionalTypes);
    }
  }

  if (decl.staticProperties) {
    for (let prop in decl.staticProperties) {
      sb.append("static ")
      miscDef(sb, decl.staticProperties[prop], prop, true, items, imports, additionalTypes);
    }
  }

  sb.appendLine("}")
  sb.appendLine("")
}

export function itemDef(sb: StringBuilder, decl: Declaration, name: string, items: Object, imports: string[], additionalTypes: Object) {

  if(additionalTypes[name]) {
    name = additionalTypes[name].replacement;
  }

  if(isClassOrInterfaceDeclaration(decl)) {
    classDef(sb, decl, name, items, imports, additionalTypes)
  } else {
    miscDef(sb, decl, name, false, items, imports, additionalTypes, false)
  }

}
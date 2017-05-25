import StringBuilder = require('string-builder');
import {typeDef, functionDef} from "./gentype";

export function miscDef(sb: StringBuilder, item: any, name: string, isStatic: boolean, isInlineProp: boolean, items: Object, 
  imports: Array<string>, additionalTypes: Object, processItemProperties: boolean = true) {
  item.name = name;

  if (isStatic) {
    sb.append("static ")
  }

  if(item.type == "Function") {   
    const isConstructor = /\.constructor$/.test(item.id);
    if (isConstructor) {
      sb.append("constructor")
    } else {
      if(!isInlineProp) sb.append("function ")
      sb.append(item.name)
    }
    functionDef(sb, item, items, imports, false, isConstructor, additionalTypes);
    
  }
  else {
    if(!isInlineProp) sb.append("let ")
    sb.append(name + ": ")
    if (item.type) typeDef(sb, item, false, items, imports, additionalTypes);
    sb.append(";")
  }

  sb.appendLine("");

  if(processItemProperties) {
    for (let prop in item.properties) {
      miscDef(sb, item.properties[prop], prop, false, true, items, imports, additionalTypes)
    }
  }

}

export function classDef(sb: StringBuilder, item: any, name: string, items: Object, imports: Array<string>, additionalTypes: Object) {
  sb.append(item.type + " " + name + " ")

  if (item.typeParams) {
    sb.append("<")
    for(let i in item.typeParams) {
      if (i != "0"){
        sb.append(", ")
      }

      typeDef(sb, item.typeParams[i], true, items, imports, additionalTypes);
    }
    sb.append("> ")
  }

  if(item.extends) {
    sb.append(" extends ")
    typeDef(sb, item.extends, false, items, imports, additionalTypes);
  }

  sb.append("{ ")
  sb.appendLine("")

  if ("constructor" in item && !(item.constructor instanceof Function)) {
    miscDef(sb, item.constructor, name, false, false, items, imports, additionalTypes);
  }

  if (item.properties) {
    for (let prop in item.properties) {
      miscDef(sb, item.properties[prop], prop, false, true,  items, imports, additionalTypes);
    }
  }

  if (item.staticProperties) {
    for (let prop in item.staticProperties) {
      miscDef(sb, item.staticProperties[prop], prop, true, true,  items, imports, additionalTypes);
    }
  }

  sb.appendLine("}")
  sb.appendLine("")
}

export function itemDef(sb: StringBuilder, item: any, name: string, items: Object, imports: Array<string>, additionalTypes: Object) {

  if(additionalTypes[name]) {
    name = additionalTypes[name].replacement;
  }

  if(item.type == "class" || item.type == "interface") {
    classDef(sb, item, name, items, imports, additionalTypes)
  } else {
    miscDef(sb, item, name, false, false, items, imports, additionalTypes, false)
  }

}
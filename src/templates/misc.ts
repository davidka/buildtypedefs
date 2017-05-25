import StringBuilder = require('string-builder');
import {typeDef, functionDef} from "../gentype";
import miscDef from "./misc";

export default function (sb: StringBuilder, item: any, name: string, isStatic: boolean, isInlineProp: boolean, items: Object, 
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
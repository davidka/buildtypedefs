import StringBuilder = require('string-builder');
import functionDef from "./function";
import typeDef from "./type";
import objectDef from "./object";
import importDef from "./import";


export default function (sb: StringBuilder, item: any, skipOptional: boolean, skipColon: boolean, isParam: boolean, 
  items: Object, imports: Array<string>, additionalTypes: Object, useDummyName: boolean = true) {

  switch(item.type) {
    case "Function":
      functionDef(sb, item, items, imports, isParam, additionalTypes, useDummyName)
      break;
    case "Array":
      if (!skipOptional && item.optional) sb.append("?")
      if (item.typeParams[0].type == "Function") {
        sb.append(": (")
        functionDef(sb, item.typeParams[0], items, imports, true, additionalTypes, false);
        sb.append(")")
      } else {
        typeDef(sb, item.typeParams[0], false, skipColon, false, items, imports, additionalTypes)
      }
      sb.append("[]");
      break;
    case "union":
      if (!skipOptional && item.optional) sb.append("?")
      if (isParam || /\^returns$/.test(item.id) || !skipColon){
        sb.append(": ")
      }
      for (let i in item.typeParams) {
        if (i != "0") sb.append(" | ")
        if (item.typeParams[i].type == "Function") {
          sb.append("(")
          typeDef(sb, item.typeParams[i], false, true, true, items, imports, additionalTypes, false)
          sb.append(")")
        } else {
          typeDef(sb, item.typeParams[i], false, true, true, items, imports, additionalTypes)
        }
  
      }
      break;
    case "Object":
      objectDef(sb, item, skipColon, items, imports, additionalTypes)
      break;
    default:
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
      break;

  }
}
// <<in {item, skipOptional, skipColon, items, imports}>>

// <<if item.type == "Function">>
//   <<fntype {item: item, items: items, imports: imports}>>
// <<elif item.type == "Array">>
//   <<for elt item.typeParams || []>><<if $i>>, <</if>><<type {item: elt, items: items, imports: imports}>><</for>>[]
// <<elif item.type == "union">>
//   <<for elt item.typeParams>>
//     <<if $i>> | 
//     <</if>>
//     <<type {item: elt, items: items, skipColon: true, imports: imports}>>
//   <</for>>
// <<elif item.type == "Object">>
//   <<objecttype {item: item, items: items, imports: imports}>>
// <<else>>
//   <<import {type: item.type, items: items, imports: imports}>>
  
//   <<if (!skipOptional && item.optional)>>?<</if>>
//   <<if !skipColon>><<t ": ">><</if>>
//   <<t item.type>>
//   <<if item.typeParams>>
//     <
//     <<for elt item.typeParams>><<if $i>>, <</if>><<type {item: elt, items: items, imports: imports}>><</for>>
//     >
//   <</if>>
// <</if>>

import StringBuilder = require('string-builder');
import functionDef from "./function";
import typeDef from "./type";
import objectDef from "./object";
import importDef from "./import";


export default function (sb: StringBuilder, item: any, skipOptional: boolean, skipColon: boolean, isParam: boolean, items: Object, imports: Object) {

  switch(item.type) {
    case "Function":
      functionDef(sb, item, items, imports, isParam)
      break;
    case "Array":
      if (!skipOptional && item.optional) sb.append("?")
      // if (!skipColon) sb.append(": ")
      if (item.typeParams[0].type == "Function") {
        sb.append("(")
        // typeDef(sb, item.typeParams[0], false, false, true, items, imports)
        functionDef(sb, item.typeParams[0], items, imports, true, false);
        sb.append(")")
      } else {
        typeDef(sb, item.typeParams[0], false, skipColon, false, items, imports)
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
        typeDef(sb, item.typeParams[i], false, true, true, items, imports)
      }
      break;
    case "Object":
      objectDef(sb, item, skipColon, items, imports)
      break;
    default:
      importDef(sb, item.type, items, imports)
      
      if(!skipOptional && item.optional) sb.append("?")
      if (!skipColon) sb.append(": ")

      switch(item.type) {
        case "bool":
          sb.append("boolean")
          break
        default:
          sb.append(item.type)
          break
      }

      if (item.typeParams) {
        sb.append("<")
        for (let i in item.typeParams) {
          if (i != "0") sb.append(", ")
          typeDef(sb, item.typeParams[i], false, true, true, items, imports)
        }
        sb.append(">")
      }
      break;

  }
}
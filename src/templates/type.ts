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
// import StringBuilder = require('string-builder');
import functionDef from "./function";



export default function (sb: StringBuilder, item: any, skipColon: boolean, items: Object, imports: Object) {
  switch(item.type) {
    case "Function":
      functionDef(sb, item, items, imports);
      break;
    case "Array":
      break;
    case "union":
      break;
    case "Object":
      break;
    default:
      break;

  }
}
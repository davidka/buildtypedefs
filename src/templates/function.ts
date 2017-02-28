// <<in {item, items, imports, isParam}>>

// <<if item.name>><<t item.name>><</if>>
// <<if isParam>>: <</if>>
// (
// <<for param item.params || []>>
//   <<if $i>>, <</if>><<if param.rest>>...<</if>>
//   <<if param.type == "Function">>
//     <<fntype {item: param, items: items, imports: imports, isParam: true}>>
//   <<else>>
//     <<if param.name>><<t param.name>><</if>><<type {item: param, items: items,imports: imports}>>
//   <</if>>
  
// <</for>>
// )

// <<if item.returns>>
//   <<if isParam>><<t "=> ">><</if>>
//   <<type { item: item.returns, skipOptional: true, items: items, imports: imports }>>
// <<else>>
//   <<if isParam>><<t "=> ">>
//   <<else>>:   
//   <</if>>
//   void
// <</if>>


import StringBuilder = require('string-builder');
import functionDef from "./function";
import typeDef from "./type";

export default function (sb: StringBuilder, item: any, items: Object, imports: Object, isParam: boolean) {
  if(item.name) sb.append(item.name)
  if (isParam) sb.append(": ")
  sb.append("(")

  for(let i in item.params) {
    let param = item.params[i];
    if(i != "0") sb.append(", ")
    if(param.rest) sb.append("...")

    if(param.type == "Function") {
      functionDef(sb, param, items, imports, true);
    } else {
      if (param.name) sb.append(param.name)
      typeDef(sb, param, false, false, items, imports)
    }
  }

  sb.append(")")

  if(item.returns) {
    if(isParam) sb.append(" => ")
    typeDef(sb, item.returns, true, false, items, imports)
  } else {
    if (isParam) sb.append(" => ")
    else sb.append(": ")
    sb.append("void")
  }

}
import StringBuilder = require('string-builder');
import functionDef from "./function";
import typeDef from "./type";
import {FunctionType, isFunction} from "../types"

export default function (sb: StringBuilder, item: FunctionType, items: Object, imports: Array<string>, isParam: boolean, isConstructor: boolean, additionalTypes: Object) {
  sb.append("(")

  let dummyNameCounter = 0;
  for(let i in item.params) {
    let param = item.params[i];
    if(i != "0") sb.append(", ")
    if(param.rest) {
      sb.append("...")
    }

    if (param.name) sb.append(param.name)
    else {
      sb.append("p")
      if(item.params.length > 1) sb.append((++dummyNameCounter).toString())
    }
    if (param.optional) sb.append("?")
    sb.append(": ")
    typeDef(sb, param, true, items, imports, additionalTypes)
  }

  sb.append(")")

  if(item.returns) {
    if (isParam || /\^returns\^returns$/.test(item.returns.id)) {
      sb.append(" => ")
      typeDef(sb, item.returns, true, items, imports, additionalTypes)
    } else {
      sb.append(": ")
      typeDef(sb, item.returns, false, items, imports, additionalTypes)
    }
    
  } else if (!isConstructor) {
    if (isParam) sb.append(" => ")
    else sb.append(": ")
    sb.append("void")
  }

}
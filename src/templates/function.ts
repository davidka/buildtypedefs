import StringBuilder = require('string-builder');
import functionDef from "./function";
import typeDef from "./type";

export default function (sb: StringBuilder, item: any, items: Object, imports: Array<string>, isParam: boolean, additionalTypes: Object, useDummyName: boolean = true) {
  if(item.name) sb.append(item.name)
  else if(isParam && useDummyName) sb.append("fn")

  if(item.optional) sb.append("?")

  if ((isParam && useDummyName) || /\^returns$/.test(item.id)) sb.append(": ")
  sb.append("(")

  let dummyNameCounter = 0;
  for(let i in item.params) {
    let param = item.params[i];
    if(i != "0") sb.append(", ")
    if(param.rest) {
      sb.append("...")
    }

    if(param.type == "Function") {
      functionDef(sb, param, items, imports, true, additionalTypes);
    } else {
      if (param.name) sb.append(param.name)
      else {
        sb.append("p")
        if(item.params.length > 1) sb.append((++dummyNameCounter).toString())
      }
      typeDef(sb, param, false, false, true, items, imports, additionalTypes)
    }
  }

  sb.append(")")

  if(item.returns) {
    if (isParam || /\^returns\^returns$/.test(item.returns.id)) {
      sb.append(" => ")
      typeDef(sb, item.returns, true, true, true, items, imports, additionalTypes)
    } else {
      typeDef(sb, item.returns, true, false, false, items, imports, additionalTypes)
    }
    
  } else if (item.name != "constructor") {
    if (isParam) sb.append(" => ")
    else sb.append(": ")
    sb.append("void")
  }

}
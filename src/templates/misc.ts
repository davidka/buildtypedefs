import StringBuilder = require('string-builder');
import typeDef from "./type";
import functionDef from "./function";
import miscDef from "./misc";

export default function (sb: StringBuilder, item: any, name: string, isStatic: boolean, isInlineProp: boolean, items: Object, 
  imports: Array<string>, additionalTypes: Object, processItemProperties: boolean = true) {
  item.name = name;

  if (isStatic) {
    sb.append("static ")
  }

  if(item.type == "Function") {   

    if (/\.constructor$/.test(item.id)) {
      item.name = "constructor";
    } else if(!isInlineProp) {
      sb.append("function ")
    }
    functionDef(sb, item, items, imports, false, additionalTypes);
    
  }
  else {
    if(!isInlineProp) sb.append("let ")
    sb.append(name)
    if (item.type) typeDef(sb, item, false, false, false, items, imports, additionalTypes);
    sb.append(";")
  }

  sb.appendLine("");

  if(processItemProperties) {
    for (let prop in item.properties) {
      miscDef(sb, item.properties[prop], prop, false, true, items, imports, additionalTypes)
    }
  }

}
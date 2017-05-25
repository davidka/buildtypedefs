import StringBuilder = require('string-builder');
import typeDef from "./type";
import miscDef from "./misc";

export default function (sb: StringBuilder, item: any, name: string, items: Object, imports: Array<string>, additionalTypes: Object) {
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
// <<in {item, name, items, imports}>>

// export class <<t item.id>>
// <<if item.typeParams>>
//   <
//   <<for elt item.typeParams>><<if $i>>, <</if>><<type {item: elt, skipColon: true, items: items, imports: imports}>><</for>>
//   >
// <</if>> 

// <<if item.extends>> extends <<type  {item: item.extends, skipColon: true, items: items, imports: imports}>><</if>>{ 
// <<t "\n">>
// <<if item.constructor>>
//   <<define {item: item.constructor, name: name, items: items, imports: imports}>>
// <</if>>

// <<if item.properties>>
//   <<for name, prop in item.properties>><<define {item: prop, name: name, items: items, imports: imports}>><</for>>
// <</if>>

// <<if item.staticProperties>>
//   <<for name, prop in item.staticProperties>><<define {item: prop, name: name, static: true, items: items, imports: imports}>><</for>>
// <</if>>

// }
// <<t "\n">>



import StringBuilder = require('string-builder');
import typeDef from "./type";
import miscDef from "./misc";

export default function (sb: StringBuilder, item: any, name: string, items: Object, imports: Array<string>) {
  sb.append(item.type + " " + name + " ")

  if (item.typeParams) {
    sb.append("<")
    for(let i in item.typeParams) {
      if (i != "0"){
        sb.append(", ")
      }

      typeDef(sb, item.typeParams[i], false, true, true, items, imports);
    }
    sb.append("> ")
  }

  if(item.extends) {
    sb.append(" extends ")
    typeDef(sb, item.extends, false, true, false, items, imports);
  }

  sb.append("{ ")
  sb.appendLine("")

  if ("constructor" in item && !(item.constructor instanceof Function)) {
    miscDef(sb, item.constructor, name, false, false, items, imports);
  }

  if (item.properties) {
    for (let prop in item.properties) {
      miscDef(sb, item.properties[prop], prop, false, true,  items, imports);
    }
  }

  if (item.staticProperties) {
    for (let prop in item.staticProperties) {
      miscDef(sb, item.staticProperties[prop], prop, true, true,  items, imports);
    }
  }

  sb.appendLine("}")
  sb.appendLine("")
}
// <<in {item, name, static, items, imports}>>

// <<do item.name = name>>

// <<t "\t">>

// <<if item.type == "Function">>
//   <<if static>>static <</if>>
//   <<if /\.constructor$/.test(item.id)>>
//     <<do item.name = "constructor">>
//   <</if>>
//   <<fntype {item: item, items: items, imports: imports}>>;
// <<else>>
//   <<t name>><<if item.type>><<type  {item: item, items: items, imports: imports}>><</if>>;
// <</if>>
// <<t "\n">>

// <<for name, prop in item.properties || {}>>
//   <<define {item: prop, name: name, items: items, imports: imports}>>
// <</for>>


import StringBuilder = require('string-builder');
import typeDef from "./type";
import functionDef from "./function";
import miscDef from "./misc";

export default function (sb: StringBuilder, item: any, name: string, isStatic: boolean, items: Object, imports: Object) {
  item.name = name;

  sb.appendLine("");

  if(item.type == "Function") {
    if (isStatic) {
      sb.append(" static ")
      if (/\.constructor$/.test(item.id)) {
        item.name = "constructor";
      }

      functionDef(sb, item, items, imports, false);
    }
    else {
      sb.append(name)
      if(item.type) {
        typeDef(sb, item, false, false, items, imports);
      }

      sb.append(";")
    }

    sb.appendLine("");

    for(let prop in item.properties) {
      miscDef(sb, item.properties[prop], prop, false, items, imports)
    }

  }
}
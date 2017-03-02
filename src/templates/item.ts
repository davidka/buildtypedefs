// <<in { item, name, items, imports } >>

// <<if item.type == "class" || item.type == "interface" >>
//   <<class { item: item, name: name, items: items, imports: imports } >>
// <<else>>
//   <<define { item: item, name: name, items: items, imports: imports }>>
// <</if>>



import StringBuilder = require('string-builder');
import classDef from "./class";
import miscDef from "./misc";

export default function (sb: StringBuilder, item: any, name: string, items: Object, imports: Object) {

  if(item.type == "class" || item.type == "interface") {
    classDef(sb, item, name, items, imports)
  } else {
    miscDef(sb, item, name, false, false, items, imports)
  }

}
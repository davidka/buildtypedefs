import StringBuilder = require('string-builder');
import classDef from "./class";
import miscDef from "./misc";

export default function (sb: StringBuilder, item: any, name: string, items: Object, imports: Array<string>, additionalTypes: Object) {

  if(item.type == "class" || item.type == "interface") {
    classDef(sb, item, name, items, imports, additionalTypes)
  } else {
    miscDef(sb, item, name, false, false, items, imports, additionalTypes, false)
  }

}
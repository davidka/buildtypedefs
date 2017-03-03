import StringBuilder = require('string-builder');
import itemDef from "./item";

export default function (module: any, name: string, deps: Object, additionalTypes: Object): StringBuilder {

  let sb = new StringBuilder("");
  let imports = new Array<string>();
  sb.appendLine("declare module \"" + name + "\" {");
  sb.appendLine("");

  for (let item in module.items) {
    sb.append("export ")
    itemDef(sb, module.items[item], item, module.items, imports, additionalTypes);
  }

  sb.appendLine("}");

  let importSb = new StringBuilder("");
  for(let imp of imports) {
    let found = false;
    for(let dep in deps) {
      if (deps[dep].indexOf(imp) > -1) {
        importSb.appendLine("import {" + imp + "} from '" + dep + "'")
        found = true;
      }
    }

    if(!found) {
      let result = (<any>Object).values(additionalTypes).filter((o) => o.replacement == imp);
      if(result && result.length == 1) {
        importSb.appendLine("import {" + result[0].replacement + "} from '" + result[0].source +  "'")
      } else{
        console.log(imp + " not found for " + name)
      }
    }
  }
  importSb.appendLine("");

  return new StringBuilder(importSb.toString() + sb.toString())

}
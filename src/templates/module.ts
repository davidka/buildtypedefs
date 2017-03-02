import StringBuilder = require('string-builder');
import itemDef from "./item";

export default function (module: any, name: string, deps: Object): StringBuilder {

  let sb = new StringBuilder("");
  let imports = [];
  sb.appendLine("declare module \"" + name + "\" {");
  sb.appendLine("");

  for (let item in module.items) {
    sb.append("export ")
    itemDef(sb, module.items[item], item, module.items, imports);
  }

  sb.appendLine("}");

  let importSb = new StringBuilder("");
  for(let imp of imports) {
    for(let dep in deps) {
      if (deps[dep].indexOf(imp) > -1) importSb.appendLine("import {" + imp + "} from '" + dep + "'")
    }
  }
  importSb.appendLine("");

  return new StringBuilder(importSb.toString() + sb.toString())

}
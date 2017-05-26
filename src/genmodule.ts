import StringBuilder = require('string-builder');
//import StringBuilder = require('string-builder');
import {ModuleContents} from "./types"
import {GenEnv, AdditionalTypes} from "./env"
import {itemDef} from "./gendeclaration";

export default function (module: ModuleContents, name: string, deps: Object, additionalTypes: AdditionalTypes): StringBuilder {

  const imports: string[] = [];
  const items = module.items || {};
  const env = new GenEnv(items, imports, additionalTypes, new StringBuilder(""));

  env.appendLine("declare module \"" + name + "\" {");
  env.appendLine("");

  for (let item in items) {
    env.append("export ")
    itemDef(env, items[item], item);
  }

  env.appendLine("}");

  const importSb = new StringBuilder("");
  for(let imp of imports) {

    if(additionalTypes[imp]) {
      imp = additionalTypes[imp].replacement
    }

    let found = false;
    for(let dep in deps) {
      if (deps[dep].indexOf(imp) > -1) {
        importSb.appendLine("import {" + imp + "} from '" + dep + "'")
        found = true;
      }
    }

    if(!found) {
      let result = (<any>Object).values(additionalTypes).filter((o: {replacement:string}) => o.replacement == imp);
      if (result && result.length == 1 && result[0].source) {
        importSb.appendLine("import {" + result[0].replacement + "} from '" + result[0].source +  "'")
      } else{
        console.log(imp + " not found for " + name)
      }
    }
  }
  importSb.appendLine("");

  return new StringBuilder(importSb.toString() + env.sb.toString())

}
import {GenEnv, emptyEnvForTests} from "../src/env"
import {itemDef} from "../src/gendeclaration";


let env: GenEnv;
let cr = "\r\n";

beforeEach(function () {
  env = emptyEnvForTests();
});

describe('should add item definition', () => {
  it('should create a class', () => {
    let item = { name: "Plugin", type: "class" };
    itemDef(env, item, "Plugin");
    env.sb.toString().should.equal('class Plugin {' + cr + "}")
  });
  it('should create a interface', () => {
    let item = { name: "Plugin", type: "interface" };
    itemDef(env, item, "Plugin");
    env.sb.toString().should.equal('interface Plugin {' + cr + "}")
  });

  it('should create an object', () => {
    let item = { name: "PluginSpec", type: "Object", properties: { props: {type: "EditorProps", optional: true}} };
    itemDef(env, item, "PluginSpec");
    env.sb.toString().should.equal("let PluginSpec: { props?: EditorProps | null };")
  });

});
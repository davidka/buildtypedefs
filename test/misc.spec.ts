import {GenEnv, emptyEnv} from "../src/env"
import {miscDef} from "../src/gendeclaration";


let env: GenEnv;
let cr = "\r\n";

beforeEach(function () {
  env = emptyEnv()
});

describe('when adding misc module definition', () => {

  it('should create a constructor', () => {
    let item = {id: "Plugin.constructor", name: "Plugin", type: "Function"};
    miscDef(env, item, "item1", false);
    env.sb.toString().should.equal('constructor()')
  });

  it('should create a constructor with one parameter', () => {
    let item = { id: "Plugin.constructor", name: "Plugin", type: "Function", params: [{name: "spec", type: "PluginSpec"}] };
    miscDef(env, item, "item1", false);
    env.sb.toString().should.equal('constructor(spec: PluginSpec)')
  });

  it('should create a constructor with two parameter', () => {
    let item = { id: "Plugin.constructor", name: "Plugin", type: "Function", params: [{ name: "spec", type: "PluginSpec" }, { name: "spec2", type: "number" }] };
    miscDef(env, item, "item1", false);
    env.sb.toString().should.equal('constructor(spec: PluginSpec, spec2: number)')
  });


});

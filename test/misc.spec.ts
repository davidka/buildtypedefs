import StringBuilder = require('string-builder');
import {miscDef} from "../src/gendeclaration";


let sb;
let cr = "\r\n";

beforeEach(function () {
  sb = new StringBuilder();
});

describe('when adding misc module definition', () => {

  it('should create a constructor', () => {
    let item = {id: "Plugin.constructor", name: "Plugin", type: "Function"};
    miscDef(sb, item, "item1", false, {}, [], {});
    sb.toString().should.equal('constructor()' + cr)
  });

  it('should create a constructor with one parameter', () => {
    let item = { id: "Plugin.constructor", name: "Plugin", type: "Function", params: [{name: "spec", type: "PluginSpec"}] };
    miscDef(sb, item, "item1", false, {}, [], {});
    sb.toString().should.equal('constructor(spec: PluginSpec)' + cr)
  });

  it('should create a constructor with two parameter', () => {
    let item = { id: "Plugin.constructor", name: "Plugin", type: "Function", params: [{ name: "spec", type: "PluginSpec" }, { name: "spec2", type: "number" }] };
    miscDef(sb, item, "item1", false, {}, [], {});
    sb.toString().should.equal('constructor(spec: PluginSpec, spec2: number)' + cr)
  });


});

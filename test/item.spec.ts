import StringBuilder = require('string-builder');
import {itemDef} from "../src/gendeclaration";


let sb;
let cr = "\r\n";

beforeEach(function () {
  sb = new StringBuilder();
});

describe('should add item definition', () => {
  it('should create a class', () => {
    let item = { name: "Plugin", type: "class" };
    itemDef(sb, item, "Plugin", {}, [], {});
    sb.toString().should.equal('class Plugin { ' + cr + cr + "}" + cr)
  });
  it('should create a interface', () => {
    let item = { name: "Plugin", type: "interface" };
    itemDef(sb, item, "Plugin", {}, [], {});
    sb.toString().should.equal('interface Plugin { ' + cr + cr + "}" + cr)
  });

  it('should create a object', () => {
    let item = { name: "PluginSpec", type: "Object", properties: { props: {type: "EditorProps", optional: true}} };
    itemDef(sb, item, "PluginSpec", {}, [], {});
    sb.toString().should.equal("let PluginSpec: {props?: EditorProps};" + cr)
  });

});
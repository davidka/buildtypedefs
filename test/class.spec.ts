import classDef from "../src/templates/class";
import StringBuilder = require('string-builder');

describe('class definition', () => {

  let cr = "\r\n";

  it('should add class definition', () => {
    let sb = new StringBuilder();
    let item = { type: "class"};
    classDef(sb, item, "Foo", {}, [], {});
    sb.toString().should.equal("class Foo { " + cr + cr + "}" + cr)
  });

  it('should add class definition with generics', () => {
    let sb = new StringBuilder();
    let item = { type: "class", typeParams: [{ type: "Foo" }, { type: "Bar" }]};
    classDef(sb, item, "Class1", {}, [], {});
    sb.toString().should.equal("class Class1 <Foo, Bar> { " + cr + cr + "}" + cr)
  });

  it('should not use return type for a constructor', () => {
    let sb = new StringBuilder();
    let item = { type: "class", constructor: { type: "Function", id: "Foo.constructor"} };
    classDef(sb, item, "Foo", {}, [], {});
    sb.toString().should.equal("class Foo { " + cr + "constructor()" + cr + cr + "}" + cr)
  });

  it('should add class definition with one let property', () => {
    let sb = new StringBuilder();
    let item = { type: "class", properties: { prop1: { type: "number" } } };
    classDef(sb, item, "Foo", {}, [], {});
    sb.toString().should.equal("class Foo { " + cr + "prop1: number;" + cr + cr + "}" + cr)
  });

  it('should add class definition with one union property', () => {
    let sb = new StringBuilder();
    let item = { type: "class", properties: { prop2: { type: "union", typeParams: [{type: "Node"}, {type: "Node2"}] } } };
    classDef(sb, item, "Class1", {}, [], {});
    sb.toString().should.equal("class Class1 { " + cr + "prop2: Node | Node2;" + cr + cr + "}" + cr)
  });

  it('should add class definition with one function property', () => {
    let sb = new StringBuilder();
    let item = { type: "class", properties: { prop1: { type: "Function", returns: { type: "any"}, params: [{name: "state", type: "EditorState"}] } } };
    classDef(sb, item, "Foo", {}, [], {});
    sb.toString().should.equal("class Foo { " + cr + "prop1(state: EditorState): any" + cr + cr + "}" + cr)
  });

  it('should add class definition with one static let property', () => {
    let sb = new StringBuilder();
    let item = { type: "class", staticProperties: { prop1: { type: "number" } } };
    classDef(sb, item, "Foo", {}, [], {});
    sb.toString().should.equal("class Foo { " + cr + "static prop1: number;" + cr + cr + "}" + cr)
  });

  it('should add class definition with one static function property', () => {
    let sb = new StringBuilder();
    let item = { type: "class", staticProperties: { prop1: { type: "Function", returns: { type: "any" }, params: [{ name: "state", type: "EditorState" }] } } };
    classDef(sb, item, "Foo", {}, [], {});
    sb.toString().should.equal("class Foo { " + cr + "static prop1(state: EditorState): any" + cr + cr + "}" + cr)
  });
});
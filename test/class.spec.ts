import {GenEnv, emptyEnv} from "../src/env"
import {classDef} from "../src/gendeclaration";
import {ClassOrInterfaceDeclaration} from "../src/types";

describe('class definition', () => {

  let env: GenEnv;
  let cr = "\r\n";

  beforeEach(function () {
    env = emptyEnv()
  });

  it('should add class definition', () => {
    const item: ClassOrInterfaceDeclaration = { type: "class" };
    classDef(env, item, "Foo");
    env.sb.toString().should.equal("class Foo { " + cr + cr + "}" + cr)
  });

  it('should add class definition with generics', () => {
    const item: ClassOrInterfaceDeclaration= { type: "class", typeParams: [{ type: "Foo" }, { type: "Bar" }]};
    classDef(env, item, "Class1");
    env.sb.toString().should.equal("class Class1 <Foo, Bar> { " + cr + cr + "}" + cr)
  });

  it('should not use return type for a constructor', () => {
    const item: ClassOrInterfaceDeclaration = { type: "class", constructor: { type: "Function", id: "Foo.constructor"} };
    classDef(env, item, "Foo");
    env.sb.toString().should.equal("class Foo { " + cr + "constructor()" + cr + cr + "}" + cr)
  });

  it('should add class definition with one let property', () => {
    const item: ClassOrInterfaceDeclaration = { type: "class", properties: { prop1: { type: "number" } } };
    classDef(env, item, "Foo");
    env.sb.toString().should.equal("class Foo { " + cr + "prop1: number;" + cr + cr + "}" + cr)
  });

  it('should add class definition with one union property', () => {
    const item: ClassOrInterfaceDeclaration = { type: "class", properties: { prop2: { type: "union", typeParams: [{type: "Node"}, {type: "Node2"}] } } };
    classDef(env, item, "Class1");
    env.sb.toString().should.equal("class Class1 { " + cr + "prop2: Node | Node2;" + cr + cr + "}" + cr)
  });

  it('should add class definition with one function property', () => {
    const item: ClassOrInterfaceDeclaration = { type: "class", properties: { prop1: { type: "Function", returns: { type: "any"}, params: [{name: "state", type: "EditorState"}] } } };
    classDef(env, item, "Foo");
    env.sb.toString().should.equal("class Foo { " + cr + "prop1(state: EditorState): any" + cr + cr + "}" + cr)
  });

  it('should add class definition with one static let property', () => {
    const item: ClassOrInterfaceDeclaration = { type: "class", staticProperties: { prop1: { type: "number" } } };
    classDef(env, item, "Foo");
    env.sb.toString().should.equal("class Foo { " + cr + "static prop1: number;" + cr + cr + "}" + cr)
  });

  it('should add class definition with one static function property', () => {
    const item: ClassOrInterfaceDeclaration = { type: "class", staticProperties: { prop1: { type: "Function", returns: { type: "any" }, params: [{ name: "state", type: "EditorState" }] } } };
    classDef(env, item, "Foo");
    env.sb.toString().should.equal("class Foo { " + cr + "static prop1(state: EditorState): any" + cr + cr + "}" + cr)
  });
});
import StringBuilder = require('string-builder');
import typeDef from "../src/templates/type";
import { FunctionType, OtherType } from "../src/types";


let sb;
let cr = "\r\n";

beforeEach(function () {
  sb = new StringBuilder();
});

describe('when adding type definition', () => {

  it('should handle a function', () => {
    const item: FunctionType & { name: string } = { name: "Type1", id: "Type1", type: "Function", params: [] };
    typeDef(sb, item, false, {}, [], {});
    sb.toString().should.equal("(): void")
  });

  it('should handle an array with one type param', () => {
    const item = { type: "Array", id: "a", typeParams: [{ type: "string", id: "a.s" }] };
    typeDef(sb, item, false, {}, [], {});
    sb.toString().should.equal("string[]")
  });

  it('should handle an union with one type param', () => {
    const item = { type: "union", id: "u", typeParams: [{ type: "string", id: "u.s" }] };
    typeDef(sb, item, false, {}, [], {});
    sb.toString().should.equal("string")
  });

  it('should handle an union with two type params', () => {
    const item = { type: "union", id: "u", typeParams: [{ type: "number", id: "u.n" }, { type: "string", id: "u.s" }] };
    typeDef(sb, item, false, {}, [], {});
    sb.toString().should.equal("number | string")
  });

  it('should handle an union with one array type param', () => {
    const item = { type: "union", id: "u", typeParams: [{ type: "Array", id: "u.a", typeParams: [{type: "Node", id: "u.a.n"}] }] };
    typeDef(sb, item, false, {}, [], {});
    sb.toString().should.equal("Node[]")
  });

  it('should handle an union with one number param and one function', () => {
    const item = { type: "union", id: "u", typeParams: [{ type: "number", id: "u.n" }, { type: "Function", id: "u.f", params: [{type: "string", id: "u.f.s"}] }] };
    typeDef(sb, item, false, {}, [], {});
    sb.toString().should.equal("number | ((p: string) => void)")
  });

  it('should handle an union with one number param and one function with two params', () => {
    const item = { type: "union", id: "u", typeParams: [{ type: "number", id: "u.n" }, { type: "Function", id: "u.f", params: [{ type: "string", id: "u.f.s1" }, { type: "string", id: "u.f.s2" }] }] };
    typeDef(sb, item, false, {}, [], {});
    sb.toString().should.equal("number | ((p1: string, p2: string) => void)")
  });

  it('should handle an object with unknown properties', () => {
    const item = { type: "Object", id: "o" };
    typeDef(sb, item, false, {}, [], {});
    sb.toString().should.equal("Object")
  });

  it('should handle string', () => {
    let item = { type: "string", id: "s" };
    typeDef(sb, item, false, {}, [], {});
    sb.toString().should.equal("string")
  });

  it('should handle bool', () => {
    let item = { type: "bool", id: "b" };
    typeDef(sb, item, false, {}, [], {});
    sb.toString().should.equal("boolean")
  });

  it('should handle other with one type param', () => {
    const item = { type: "MyType", id: "m", typeParams: [{name: "typeParam1", type: "string", id: "m.s"}]};
    typeDef(sb, item, false, {}, [], {});
    sb.toString().should.equal("MyType<string>")
  });

  it('should handle other with two type params', () => {
    const item = { type: "MyType", id: "m", typeParams: [{ name: "typeParam1", type: "string", id: "m.s" }, { name: "typeParam2", type: "number", id: "m.n" }]};
    typeDef(sb, item, false, {}, [], {});
    sb.toString().should.equal("MyType<string, number>")
  });

  describe('when type is unknown', () => {
    it('should replace type', () => {
      const item = { type: "MyType", id: "m", typeParams: [{ name: "typeParam1", type: "string", id: "s.m" }, { name: "typeParam2", type: "number", id: "m.n" }] };
      typeDef(sb, item, false, {}, [], {});
      sb.toString().should.equal("MyType<string, number>")
    });
  });

});
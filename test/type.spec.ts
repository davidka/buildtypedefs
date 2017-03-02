import StringBuilder = require('string-builder');
import typeDef from "../src/templates/type";


let sb;
let cr = "\r\n";

beforeEach(function () {
  sb = new StringBuilder();
});

describe('when adding type definition', () => {

  it('should handle a function', () => {
    let item = { name: "Type1", type: "Function" };
    typeDef(sb, item, false, false, false, {}, {});
    sb.toString().should.equal("Type1(): void")
  });

  it('should handle an array with one type param', () => {
    let item = { type: "Array", typeParams: [{ type: "string"}] };
    typeDef(sb, item, true, false, false, {}, {});
    sb.toString().should.equal(": string[]")
  });

  it('should handle an union with one type param', () => {
    let item = { type: "union", typeParams: [{ type: "string" }] };
    typeDef(sb, item, false, true, false, {}, {});
    sb.toString().should.equal("string")
  });

  it('should handle an union with two type params', () => {
    let item = { type: "union", typeParams: [{ type: "number" }, { type: "string" }] };
    typeDef(sb, item, false, true, false, {}, {});
    sb.toString().should.equal("number | string")
  });

  it('should handle an union with one array type param', () => {
    let item = { type: "union", typeParams: [{ type: "Array", typeParams: [{type: "Node"}] }] };
    typeDef(sb, item, false, true, false, {}, {});
    sb.toString().should.equal("Node[]")
  });

  it('should handle an object', () => {
    let item = { type: "Object"};
    typeDef(sb, item, false, false, false, {}, {});
    sb.toString().should.equal(": Object")
  });

  it('should handle other and add optional marker', () => {
    let item = { type: "string", optional: true};
    typeDef(sb, item, false, false, false, {}, {});
    sb.toString().should.equal("?: string")
  });

  it('should handle other and add skip optional', () => {
    let item = { type: "string", optional: true};
    typeDef(sb, item, true, false, false, {}, {});
    sb.toString().should.equal(": string")
  });

  it('should handle other and add skip colon', () => {
    let item = { type: "string"};
    typeDef(sb, item, false, true, false, {}, {});
    sb.toString().should.equal("string")
  });

  it('should handle bool', () => {
    let item = { type: "bool"};
    typeDef(sb, item, false, false, false, {}, {});
    sb.toString().should.equal(": boolean")
  });

  it('should handle other with one type param', () => {
    let item = { type: "MyType", typeParams: [{name: "typeParam1", type: "string"}]};
    typeDef(sb, item, false, false, false, {}, {});
    sb.toString().should.equal(": MyType<string>")
  });

  it('should handle other with two type params', () => {
    let item = { type: "MyType", typeParams: [{ name: "typeParam1", type: "string" }, { name: "typeParam2", type: "number" }]};
    typeDef(sb, item, false, false, false, {}, {});
    sb.toString().should.equal(": MyType<string, number>")
  });

});
import StringBuilder = require('string-builder');
import functionDef from "../src/templates/function";


let sb;
let cr = "\r\n";

beforeEach(function () {
  sb = new StringBuilder();
});

describe('should add function definition', () => {

  describe('with return type', () => {

    it('void', () => {
      let item = {name: "Func"};
      functionDef(sb, item, {}, {}, false);
      sb.toString().should.equal("Func(): void")
    });

    it('=> void', () => {
      let item = { name: "Func" };
      functionDef(sb, item, {}, {}, false, true);
      sb.toString().should.equal("Func(): void")
    });

  });

  describe('with parameters', () => {

    it('one named parameter', () => {
      let item = { name: "Func", params: [{type: "bool", name: "param1"}] };
      functionDef(sb, item, {}, {}, false);
      sb.toString().should.equal("Func(param1: boolean): void")
    });

    it('one optional named parameter', () => {
      let item = { name: "Func", params: [{ type: "bool", name: "param1", optional: true }] };
      functionDef(sb, item, {}, {}, false);
      sb.toString().should.equal("Func(param1?: boolean): void")
    });

    it('two named parameters', () => {
      let item = { name: "Func", params: [{ type: "bool", name: "param1" }, { type: "Object", name: "param2" }] };
      functionDef(sb, item, {}, {}, false);
      sb.toString().should.equal("Func(param1: boolean, param2: Object): void")
    });

    it('two optional named parameters', () => {
      let item = { name: "Func", params: [{ type: "bool", name: "param1", optional: true }, { type: "number", name: "param2", optional: true }] };
      functionDef(sb, item, {}, {}, false);
      sb.toString().should.equal("Func(param1?: boolean, param2?: number): void")
    });

    it('rest parameter', () => {
      let item = { name: "Func", params: [{ type: "bool", name: "param1", rest: true }] };
      functionDef(sb, item, {}, {}, false);
      sb.toString().should.equal("Func(...param1: boolean): void")
    });

    it('function parameter', () => {
      let item = { name: "Func", params: [{ type: "Function", name: "param1" }] };
      functionDef(sb, item, {}, {}, false);
      sb.toString().should.equal("Func(param1: () => void): void")
    });

    it('optional function parameter', () => {
      let item = { name: "Func", params: [{ type: "Function", name: "param1", optional: true }] };
      functionDef(sb, item, {}, {}, false);
      sb.toString().should.equal("Func(param1?: () => void): void")
    });

  });

});

import StringBuilder = require('string-builder');
import {functionDef} from "../src/gentype";
import {FunctionType, Parameter} from "../src/types";

let sb;
let cr = "\r\n";

function mkFunction(name: string, params: Parameter[] = []): FunctionType & { name: string } {
  return {
    type: "Function",
    id: name,
    name, params
  };
}

beforeEach(function () {
  sb = new StringBuilder();
});

describe('should add function definition', () => {

  describe('with return type', () => {

    it('void', () => {
      let item = mkFunction("Func");
      functionDef(sb, item, {}, [], false, false, {});
      sb.toString().should.equal("(): void")
    });

    it('=> void', () => {
      let item = mkFunction("Func");
      functionDef(sb, item, {}, [], false, false, true);
      sb.toString().should.equal("(): void")
    });

  });

  describe('with parameters', () => {

    it('one named parameter', () => {
      const item = mkFunction("Func", [{ type: "bool", name: "param1", id: "Func^f^param1" }])
      functionDef(sb, item, {}, [], false, false, {});
      sb.toString().should.equal("(param1: boolean): void")
    });

    it('one optional named parameter', () => {
      const item = mkFunction("Func", [{ type: "bool", name: "param1", id: "Func^f^param1", optional: true }])
      functionDef(sb, item, {}, [], false, false, {});
      sb.toString().should.equal("(param1?: boolean): void")
    });

    it('two named parameters', () => {
      const item = mkFunction("Func", [{ type: "bool", name: "param1", id: "Func^f^param1" }, { type: "Object", name: "param2", id: "Func^f^param2" }])
      functionDef(sb, item, {}, [], false, false, {});
      sb.toString().should.equal("(param1: boolean, param2: Object): void")
    });

    it('two optional named parameters', () => {
      const item = mkFunction("Func", [{ type: "bool", name: "param1", id: "Func^f^param1", optional: true }, { type: "number", name: "param2", id: "Func^f^param2", optional: true }])
      functionDef(sb, item, {}, [], false, false, {});
      sb.toString().should.equal("(param1?: boolean, param2?: number): void")
    });

    it('rest parameter', () => {
      const item = mkFunction("Func", [{ type: "bool", name: "param1", id: "Func^f^param1", rest: true }]);
      functionDef(sb, item, {}, [], false, false, {});
      sb.toString().should.equal("(...param1: boolean): void")
    });

    it('array with function parameter', () => {
      const functionType: FunctionType = {type: "Function", id: "Func^f^param1^foo", params: []};
      const param: Parameter = { type: "Array", name: "param1", id: "Func^f^param1", typeParams: [functionType] }
      const item = mkFunction("Func", [param])
      functionDef(sb, item, {}, [], false, false, {});
      sb.toString().should.equal("(param1: (() => void)[]): void")
    });

    it('function parameter', () => {
      const param: FunctionType & Parameter = { type: "Function", params: [], name: "param1", id: "Func^f^param1" }
      const item = mkFunction("Func", [param]);
      functionDef(sb, item, {}, [], false, false, {});
      sb.toString().should.equal("(param1: () => void): void")
    });

    it('optional function parameter', () => {
      const param: FunctionType & Parameter = { type: "Function", params: [], name: "param1", id: "Func^f^param1", optional: true }
      const item = mkFunction("Func", [param]);
      functionDef(sb, item, {}, [], false, false, {});
      sb.toString().should.equal("(param1?: () => void): void")
    });

  });

});

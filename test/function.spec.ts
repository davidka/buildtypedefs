import StringBuilder = require('string-builder');
import {functionDef} from "../src/gentype";
import {FunctionType, Parameter} from "../src/types";

let sb;
let cr = "\r\n";

function mkFunction(...params: Parameter[]): FunctionType {
  return { type: "Function", params };
}

beforeEach(function () {
  sb = new StringBuilder();
});

describe('should add function definition', () => {

  describe('with return type', () => {

    it('void', () => {
      let item = mkFunction();
      functionDef(sb, item, {}, [], {});
      sb.toString().should.equal("() => void")
    });

    it('=> void', () => {
      let item = mkFunction();
      functionDef(sb, item, {}, [], true);
      sb.toString().should.equal("() => void")
    });

  });

  describe('with parameters', () => {

    it('one named parameter', () => {
      const item = mkFunction({ type: "bool", name: "param1" })
      functionDef(sb, item, {}, [], {});
      sb.toString().should.equal("(param1: boolean) => void")
    });

    it('one optional named parameter', () => {
      const item = mkFunction({ type: "bool", name: "param1", optional: true })
      functionDef(sb, item, {}, [], {});
      sb.toString().should.equal("(param1?: boolean) => void")
    });

    it('two named parameters', () => {
      const item = mkFunction({ type: "bool", name: "param1" }, { type: "Object", name: "param2" })
      functionDef(sb, item, {}, [], {});
      sb.toString().should.equal("(param1: boolean, param2: Object) => void")
    });

    it('two optional named parameters', () => {
      const item = mkFunction({ type: "bool", name: "param1", optional: true }, { type: "number", name: "param2", optional: true })
      functionDef(sb, item, {}, [], {});
      sb.toString().should.equal("(param1?: boolean, param2?: number) => void")
    });

    it('rest parameter', () => {
      const item = mkFunction({ type: "bool", name: "param1", rest: true });
      functionDef(sb, item, {}, [], {});
      sb.toString().should.equal("(...param1: boolean) => void")
    });

    it('array with function parameter', () => {
      const item = mkFunction({ type: "Array", name: "param1", typeParams: [{type: "Function", params: []}] })
      functionDef(sb, item, {}, [], {});
      sb.toString().should.equal("(param1: (() => void)[]) => void")
    });

    it('function parameter', () => {
      const item = mkFunction({ type: "Function", params: [], name: "param1" });
      functionDef(sb, item, {}, [], {});
      sb.toString().should.equal("(param1: () => void) => void")
    });

    it('optional function parameter', () => {
      const item = mkFunction({ type: "Function", params: [], name: "param1", optional: true });
      functionDef(sb, item, {}, [], {});
      sb.toString().should.equal("(param1?: () => void) => void")
    });

  });

});

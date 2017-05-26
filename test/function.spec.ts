import {GenEnv, emptyEnv} from "../src/env"
import {functionDef} from "../src/gentype";
import {FunctionType, Parameter} from "../src/types";

let env: GenEnv;

function mkFunction(...params: Parameter[]): FunctionType {
  return { type: "Function", params };
}

beforeEach(function () {
  env = emptyEnv()
});

describe('should add function definition', () => {

  describe('with return type', () => {

    it('void', () => {
      let item = mkFunction();
      functionDef(env, item);
      env.sb.toString().should.equal("() => void")
    });

    it('should handle optional bool return type', () => {
      const item: FunctionType = { type: "Function", params: [], returns: { type: "bool", optional: true } }
      functionDef(env, item);
      env.sb.toString().should.equal("() => boolean | null | undefined")
    })

    it('should handle optional function return type', () => {
      const item: FunctionType = { type: "Function", params: [], returns: { type: "Function", params: [], optional: true } }
      functionDef(env, item);
      env.sb.toString().should.equal("() => (() => void) | null | undefined")
    })

  });

  describe('with parameters', () => {

    it('one named parameter', () => {
      const item = mkFunction({ type: "bool", name: "param1" })
      functionDef(env, item);
      env.sb.toString().should.equal("(param1: boolean) => void")
    });

    it('one optional named parameter', () => {
      const item = mkFunction({ type: "bool", name: "param1", optional: true })
      functionDef(env, item);
      env.sb.toString().should.equal("(param1?: boolean) => void")
    });

    it('two named parameters', () => {
      const item = mkFunction({ type: "bool", name: "param1" }, { type: "Object", name: "param2" })
      functionDef(env, item);
      env.sb.toString().should.equal("(param1: boolean, param2: Object) => void")
    });

    it('two optional named parameters', () => {
      const item = mkFunction({ type: "bool", name: "param1", optional: true }, { type: "number", name: "param2", optional: true })
      functionDef(env, item);
      env.sb.toString().should.equal("(param1?: boolean, param2?: number) => void")
    });

    it('rest parameter', () => {
      const item = mkFunction({ type: "bool", name: "param1", rest: true });
      functionDef(env, item);
      env.sb.toString().should.equal("(...param1: boolean) => void")
    });

    it('array with function parameter', () => {
      const item = mkFunction({ type: "Array", name: "param1", typeParams: [{type: "Function", params: []}] })
      functionDef(env, item);
      env.sb.toString().should.equal("(param1: (() => void)[]) => void")
    });

    it('function parameter', () => {
      const item = mkFunction({ type: "Function", params: [], name: "param1" });
      functionDef(env, item);
      env.sb.toString().should.equal("(param1: () => void) => void")
    });

    it('optional function parameter', () => {
      const item = mkFunction({ type: "Function", params: [], name: "param1", optional: true });
      functionDef(env, item);
      env.sb.toString().should.equal("(param1?: () => void) => void")
    });

  });

});

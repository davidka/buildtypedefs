import {GenEnv, emptyEnv} from "../src/env"
import {typeDef} from "../src/gentype";
import { FunctionType } from "../src/types";


let env: GenEnv;

beforeEach(function () {
  env = emptyEnv();
});

describe('when adding type definition', () => {

  it('should handle a function', () => {
    const item: FunctionType = { type: "Function", params: [] };
    typeDef(env, item);
    env.sb.toString().should.equal("() => void")
  });

  it('should handle an array with one type param', () => {
    const item = { type: "Array", typeParams: [{ type: "string" }] };
    typeDef(env, item);
    env.sb.toString().should.equal("string[]")
  });

  it('should handle an empty union', () => {
    const item = { type: "union", typeParams: [] };
    typeDef(env, item);
    env.sb.toString().should.equal("never")
  })

  it('should handle an union with one type param', () => {
    const item = { type: "union", typeParams: [{ type: "string" }] };
    typeDef(env, item);
    env.sb.toString().should.equal("string")
  });

  it('should handle an union with two type params', () => {
    const item = { type: "union", typeParams: [{ type: "number" }, { type: "string" }] };
    typeDef(env, item);
    env.sb.toString().should.equal("number | string")
  });

  it('should handle an union with one array type param', () => {
    const item = { type: "union", typeParams: [{ type: "Array", typeParams: [{type: "Node"}] }] };
    typeDef(env, item);
    env.sb.toString().should.equal("Node[]")
  });

  it('should handle an union with one number param and one function', () => {
    const item = { type: "union", typeParams: [{ type: "number" }, { type: "Function", params: [{type: "string"}] }] };
    typeDef(env, item);
    env.sb.toString().should.equal("number | ((p: string) => void)")
  });

  it('should handle an union with one number param and one function with two params', () => {
    const item = { type: "union", typeParams: [{ type: "number" }, { type: "Function", params: [{ type: "string" }, { type: "string" }] }] };
    typeDef(env, item);
    env.sb.toString().should.equal("number | ((p1: string, p2: string) => void)")
  });

  it('should handle an array of unions', () => {
    const item = { type: "Array", typeParams: [{ type: "union", typeParams: [{ type: "number" }, { type: "bool" }] }] };
    typeDef(env, item);
    env.sb.toString().should.equal("(number | boolean)[]")
  });

  it('should handle an object with unknown properties', () => {
    const item = { type: "Object", };
    typeDef(env, item);
    env.sb.toString().should.equal("Object")
  });

  it('should handle objects with a known value type', () => {
    const item = { type: "Object", typeParams: [{ type: "bool" }] }
    typeDef(env, item)
    env.sb.toString().should.equal("{ [name: string]: boolean }")
  })

  it('should handle string', () => {
    let item = { type: "string" };
    typeDef(env, item);
    env.sb.toString().should.equal("string")
  });

  it('should handle bool', () => {
    let item = { type: "bool" };
    typeDef(env, item);
    env.sb.toString().should.equal("boolean")
  });

  it('should handle other with one type param', () => {
    const item = { type: "MyType", typeParams: [{name: "typeParam1", type: "string" }]};
    typeDef(env, item);
    env.sb.toString().should.equal("MyType<string>")
  });

  it('should handle other with two type params', () => {
    const item = { type: "MyType", typeParams: [{ name: "typeParam1", type: "string" }, { name: "typeParam2", type: "number" }]};
    typeDef(env, item);
    env.sb.toString().should.equal("MyType<string, number>")
  });

  describe('when type is unknown', () => {
    it('should replace type', () => {
      const item = { type: "MyType", typeParams: [{ name: "typeParam1", type: "string" }, { name: "typeParam2", type: "number" }] };
      typeDef(env, item);
      env.sb.toString().should.equal("MyType<string, number>")
    });
  });

});
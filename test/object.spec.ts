import {GenEnv, emptyEnvForTests} from "../src/env"
import {objectDef} from "../src/gentype";
import {ObjectType} from "../src/types";

let env: GenEnv;

beforeEach(function () {
  env = emptyEnvForTests();
});

describe('should add object definition', () => {
  it('with one property', () => {
    const item: ObjectType = { type: "Object", properties: { prop1: { type: "string" } } };
    objectDef(env, item);
    env.sb.toString().should.equal("{ prop1: string }")
  });

  it('with two properties', () => {
    const item: ObjectType = {
      type: "Object",
      properties: { prop1: { type: "string" }, prop2: { type: "Object" } }
    };
    objectDef(env, item);
    env.sb.toString().should.equal("{ prop1: string, prop2: Object }")
  });
});
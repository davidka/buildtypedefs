import StringBuilder = require('string-builder');
import {objectDef} from "../src/gentype";
import {ObjectType, Parameter} from "../src/types";

let sb;

beforeEach(function () {
  sb = new StringBuilder();
});

describe('should add object definition', () => {
  it('with one property', () => {
    const item: ObjectType = { type: "Object", properties: { prop1: { type: "string" } } };
    objectDef(sb, item, {}, [], {});
    sb.toString().should.equal("{prop1: string}")
  });

  it('with two properties', () => {
    const item: ObjectType = {
      type: "Object",
      properties: { prop1: { type: "string" }, prop2: { type: "Object" } }
    };
    objectDef(sb, item, {}, [], {});
    sb.toString().should.equal("{prop1: string, prop2: Object}")
  });
});
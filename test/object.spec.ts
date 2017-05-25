import StringBuilder = require('string-builder');
import objectDef from "../src/templates/object";
import {ObjectType, Parameter} from "../src/types";

let sb;

beforeEach(function () {
  sb = new StringBuilder();
});

describe('should add object definition', () => {
  it('with one property', () => {
    const item: ObjectType = { type: "Object", id: "o", properties: { prop1: { type: "string", id: "o.prop1" } } };
    objectDef(sb, item, false, {}, [], {});
    sb.toString().should.equal(": {prop1: string}")
  });

  it('with two properties', () => {
    const item: ObjectType = {
      type: "Object",
      id: "o",
      properties: {
        prop1: { type: "string", id: "o.prop1" },
        prop2: { type: "Object", id: "o.prop2" }
      }
    };
    objectDef(sb, item, false, {}, [], {});
    sb.toString().should.equal(": {prop1: string, prop2: Object}")
  });
});
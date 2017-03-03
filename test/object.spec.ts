import StringBuilder = require('string-builder');
import objectDef from "../src/templates/object";

let sb;

beforeEach(function () {
  sb = new StringBuilder();
});

describe('should add object definition', () => {
  it('without properties', () => {
    let item = { };
    objectDef(sb, item, false, {}, [], {});
    sb.toString().should.equal(": Object")
  });

  it('with one property', () => {
    let item = { properties: { prop1: { type: "string" } } };
    objectDef(sb, item, false, {}, [], {});
    sb.toString().should.equal(": {prop1: string}")
  });

  it('with two properties', () => {
    let item = { properties: { prop1: { type: "string" }, prop2: { type: "Object" }  } };
    objectDef(sb, item, false, {}, [], {});
    sb.toString().should.equal(": {prop1: string, prop2: Object}")
  });
});
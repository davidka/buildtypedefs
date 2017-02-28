import StringBuilder = require('string-builder');
import moduleDef from "../src/templates/module";


let sb;
let cr = "\r\n";

beforeEach(function () {
  sb = new StringBuilder();
});

describe.only('when adding module definition', () => {

  it('should create an empty module', () => {
    let module = {};
    moduleDef(sb, module, "module1", {});
    sb.toString().should.equal(cr + 'declare module "module1" {' + cr + cr + '}')
  });

  it('should create an module with one item', () => {
    let module = { items: {Class1: { type: "class"}} };
    moduleDef(sb, module, "module1", {});
    sb.toString().should.equal(cr + 'declare module "module1" {' + cr + 'export class Class1 { ' + cr + '}' + cr + '}')
  });

});
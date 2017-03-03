import StringBuilder = require('string-builder');
import moduleDef from "../src/templates/module";


let sb;
let cr = "\r\n";

describe('when adding module definition', () => {

  it('should create an empty module', () => {
    let module = {};
    let sb = moduleDef(module, "module1", {}, {});
    sb.toString().should.equal(cr + cr + 'declare module "module1" {' + cr + cr + '}')
  });

  it('should create an module with one item', () => {
    let module = { items: {Class1: { type: "class"}} };
    let sb = moduleDef(module, "module1", {}, {});
    sb.toString().should.equal(cr + cr + 'declare module "module1" {' + cr + 'export class Class1 { ' + cr + cr + '}' + cr + cr + '}')
  });

});
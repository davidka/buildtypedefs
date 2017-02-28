import classDef from "../src/templates/class";
import StringBuilder = require('string-builder');

describe('class definition', () => {

  let cr = "\r\n";

  it('should add class definition', () => {
    let sb = new StringBuilder();

    let item = {

    };

    classDef(sb, item, "Foo", {}, {});

    sb.toString().should.equal("export class Foo { " + cr + "}")
  });

  // it('should error', () => {
  //   (() => {
  //     throw new Error();
  //   }).should.throw();
  // });
});
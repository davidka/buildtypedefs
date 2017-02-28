
import chai = require('chai');
import chaiAsPromised = require('chai-as-promised');

global.before(function () {
  chai.should();
  chai.use(chaiAsPromised);
});


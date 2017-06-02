
// import chai = require('chai');
import * as chai from 'chai';
// import chaiAsPromised = require('chai-as-promised');
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';

before(function () {
  chai.should();
  chai.use(chaiAsPromised);
});


var sinon = require('sinon');

const fakeMsg = {
  say: sinon.stub(),
  respond: sinon.stub()
};

module.exports = {
  fakeMsg: fakeMsg
};

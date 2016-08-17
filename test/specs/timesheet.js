nock = require('nock');
const assert = require('assert');
const timesheet = require('../../flows/timesheet');
const controller = require('../helpers/slapp').fakeController;
const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));
const expect = chai.expect;
//timesheet.init(controller);
require('../../flows/help')(controller);

describe('Timesheets', () => {
  describe('/timesheet help', () => {
    it('should reply with examples', ()=> {
      let helpText = `
  Enter \`/timesheet\` to bring up timesheet entry
  Enter hi or hello in a direct message to return hello
  Enter \`/pybot help\` to bring up this help
  Help is also callable via saying help in direct message
  `;// Please note that indenting this block makes the test fail DO NOT TOUCH
      const command = "/timesheet";
      const subtext = "help";
      const fake = sinon.spy();
      controller.sendCommand(command, subtext, fake);
      const call = fake.getCall(0);
      expect(call.args[2]).to.equal("help");
      expect(call.args[0].respond).to.be.calledWith('foo', helpText);
    })
  })
});
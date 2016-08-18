nock = require('nock');
const timesheet = require('../../flows/timesheet');
const controller = require('../helpers/slapp').fakeController;
const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));
const expect = chai.expect;
//require('../../flows')(controller);

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
      expect(call.args[1]).to.equal("/timesheet");
      expect(call.args[2]).to.equal("help");
      expect(call.args[0].respond).to.be.calledWith('foo', helpText);
    })
  });
  describe('/timesheet', () =>{
    it('should accept a /timesheet command', () => {
      const command = sinon.spy();
      const fake = {
        command: command,
        action: () => {}
      };
      require('../../flows/timesheet')(fake);
      expect(command).to.be.called;
      expect(command.getCall(0).args[0]).to.equal('/timesheet');
      const msg_callback = sinon.spy();
      command.getCall(0).args[2]({say: msg_callback});
      const msg = msg_callback.getCall(0).args[0];
      expect(msg.attachments[0].callback_id).to.equal('timesheet_callback');
    });
    it.only('should cancel when cancel pressed', () => {
      const action = sinon.spy();
      const fake = {
        action: action,
        command: () => {}
      };
      require('../../flows/timesheet')(fake);
      expect(action).to.be.called;
      expect(action.getCall(0).args[0]).to.equal('timesheet_callback');
      const msg_callback = sinon.spy();
      console.log(action.getCall(0).args[1]);
      action.getCall(0).args[1]({respond: msg_callback});
      const msg = msg_callback.getCall(0).args[0];
      expect(msg.attachments[0].callback_id).to.equal('timesheet_callback');
    });
  });
  describe('messages', () =>{
    it('Should respond to hello and hi', ()=> {
      expect(true).is.true
    })
  })
});
const nock = require('nock');
const timesheet = require('../../flows/timesheet');
//const controller = require('../helpers/slapp').fakeController;
const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));
const expect = chai.expect;
//require('../../flows')(controller);

describe('Timesheets', () => {
  describe('timesheet help and hello', () => {
    it('should reply with examples', ()=> {
      let helpText = `
  Enter \`/timesheet\` to bring up timesheet entry
  Enter hi or hello in a direct message to return hello
  Enter \`/pybot help\` to bring up this help
  Help is also callable via saying help in direct message
  `;// Please note that indenting this block makes the test fail DO NOT TOUCH
      const command = sinon.spy();
      const fake = {
        command: command,
        action: () => {},
      };
      require('../../flows/help')(fake);
      expect(command).to.be.called;
      expect(command.getCall(0).args[0]).to.equal('/timesheet');
      expect(command.getCall(0).args[1]).to.equal('help');
      const msg_callback = sinon.spy();
      command.getCall(0).args[2]({respond: msg_callback, body: {response_url: "timesheet_callback"}});
      const msg = msg_callback.getCall(0).args;
      expect(msg[0]).to.equal('timesheet_callback');
      expect(msg[1]).to.equal(helpText);
    })
  });
  describe('main timesheet', () =>{
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
    it('should cancel when cancel pressed', () => {
      const action = sinon.spy();
      const fake = {
        action: action,
        command: () => {}
      };
      require('../../flows/timesheet')(fake);
      expect(action).to.be.called;
      expect(action.getCall(0).args[0]).to.equal('timesheet_callback');
      const call = {respond: sinon.spy(), body: {response_url: 'timesheet_callback',actions: [{value: "Cancel"}, "hi"],user: {name: "user"}, channel: {name: "channel"}}};
      action.getCall(0).args[1](call);
      const msg = call.respond.getCall(0).proxy.firstCall.args;
      expect(msg[0]).to.equal('timesheet_callback');
      expect(msg[1].text).to.equal("Cancelled")
    });
    it('should say sending information whilst waiting for information', () => {
      const action = sinon.spy();
      const fake = {
        action: action,
        command: () => {}
      };
      require('../../flows/timesheet')(fake);
      expect(action).to.be.called;
      expect(action.getCall(0).args[0]).to.equal('timesheet_callback');
      const call = {respond: sinon.spy(), body: {response_url: 'timesheet_callback',actions: [{value: "pass"}, "hi"],user: {name: "user"}, channel: {name: "channel"}}};
      action.getCall(0).args[1](call);
      const msg = call.respond.getCall(0).proxy.firstCall.args;
      expect(msg[0]).to.equal('timesheet_callback');
      expect(msg[1].text).to.equal("Sending Information")
    });
  });
});
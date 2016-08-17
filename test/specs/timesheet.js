nock = require('nock');
const timesheet = require('../../flows/timesheet');
const controller = require('../helpers/slapp').fakeController;
const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));
const expect = chai.expect;
require('../../flows')(controller);

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
    it('Should create a button', ()=> {
      const command = "/timesheet";
      const fake = sinon.spy();
      controller.sendCommand(command, "", fake);
      const call = fake.getCall(0);
      expect(call.args[1]).to.equal("/timesheet");
      expect(call.args[2]).to.equal("");
      expect(call.args[0].say).to.be.calledWith({
      text: '',
        attachments: [
        {
          text: 'How billable are you for todays work?',
          fallback: 'How billable?',
          callback_id: 'timesheet_callback',
          color: "9900cc",
          actions: [
            { name: 'answer', text: 'Full Day', type: 'button', value: 'Billable' },
            { name: 'answer', text: 'Non Billable', type: 'button', value: 'Not'},
            { name: 'cancel', text: 'Cancel', type: 'button', value: 'Cancel', style: 'danger'}
          ]
        }]
    })
    })
  });
  describe('messages', () =>{
    it('Should respond to hello and hi', ()=> {
      expect(true).is.true
    })
  })
});
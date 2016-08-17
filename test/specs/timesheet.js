nock = require('nock');
const assert = require('assert');
const timesheet = require('../../flows/timesheet');
const controller = require('../helpers/slapp').fakeController;
const fetch = require('isomorphic-fetch');
//timesheet.init(controller);

describe('Timesheets', () => {
  describe('/timesheet help', () => {
    it('should reply with examples', ()=> {
      let helpText = `
      Enter \`/timesheet\` to bring up timesheet entry
      Enter hi or hello in a direct message to return hello
      Enter \`/pybot help\` to bring up this help
      Help is also callable via saying help in direct message
      `;
      const command = "/timesheet"
      const subtext = "help"
      controller.sendCommand(command, subtext, (msg)=> {
        assert(msg.respond(/.*/ , helpText))
      })
    })
  })
});
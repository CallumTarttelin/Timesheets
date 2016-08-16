nock = require('nock');
const timesheet = require('../../flows/timesheet');
const controller = require('../helpers/slapp').fakeMsg;
const fetch = require('isomorphic-fetch');
timesheet.init(controller)

describe('api', () => {
  it('should return help text when help in direct message'), ()=>{
    return fetch(`http://127.0.0.1:5000/`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        status: '',
        channelName: '',
        interviewStep: '',
        user: '',
      })
    })
      .catch((err)=> {
        console.log("failed to post", err);
        bot.reply(message, "Oops, something went wrong with that command.")
      })
      .then(x => {
        let help = `
        Enter \`/timesheet\` to bring up timesheet entry
        Enter hi or hello in a direct message to return hello
        Enter \`/pybot help\` to bring up this help
        Help is also callable via saying help in direct message
        `;
        assert(msg.respond.calledWith(help))
      });
    ;
  }
});
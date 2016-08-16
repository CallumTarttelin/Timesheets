nock = require('nock');
const timesheet = require('../../flows/timesheet');
const msg = require('../helpers/slapp').fakeMsg;
const fetch = require('isomorphic-fetch');

describe('api', () => {
  it('should return the response from backend after giving correct information'), ()=>{



    return fetch(`http://127.0.0.1:5000/`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        status: ,
        channelName: ,
        interviewStep: ,
        user: ,
      })
    })
      .catch((err)=> {
        console.log("failed to post", err);
        bot.reply(message, "Oops, something went wrong with that command.")
      })

  }
});
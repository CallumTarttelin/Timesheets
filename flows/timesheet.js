'use strict';
var fetch = require('fetch');
const API_ROOT = 'the url';


module.exports = (slapp) => {

  slapp.command('/timesheet', (msg) => {
    var state = { requested: Date.now() };
    msg
      .say({
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
              { name: 'cancel', text: 'Cancel', type: 'button', value: 'Cancel'}
            ]
          }]
      })
      .route('handleTimesheet', state, 60)
  });

  slapp.route('handleTimesheet', (msg, state) => {
    if (msg.type !== 'action') {
      msg
        .say('Please choose a button')
        .route('handleOutcomeConfirmation', state, 60);
      return
    }

    let answer = msg.body.actions[0].value;
    if (answer == 'Not') {
      msg.respond(msg.body.response_url, {
        text: `Sending Information`,
        delete_original: true
      });
      }
    else {
      msg.respond(msg.body.response_url, {
        text: `Sending Information`,
        delete_original: true
      });
      return fetch(`${API_ROOT}/PLACEHOLDER_URL`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          status: status,
          channelName: channel.group.name,
          interviewStep: step,
          user: user.user.profile.email,
        })
      })
        .then(response => response.text())
        .then(msg => {
          msg.respond(msg.body.response_url, {
            text: response.text(),
            delete_original: true
            }
          )
        });
    }
  })
};

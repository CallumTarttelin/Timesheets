'use strict'
var fetch = require('fetch');


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
    if (answer == 'Billable') {
      msg.respond(msg.body.response_url, {
        text: `Sending Information`,
        delete_original: true
      });
      return
    }
    if (answer == 'Not') {
      msg.respond(msg.body.response_url, {
        text: `Sending Information`,
        delete_original: true
      });
      return fetch
    }
    else {
      msg.respond(msg.body.response_url, {
        text: `Cancelled`,
        delete_original: true
      })
    }
  })
};

'use strict';
const fetch = require('isomorphic-fetch');

module.exports = (slapp) => {

  slapp.command('/timesheet', "", (msg) => {
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
              { name: 'cancel', text: 'Cancel', type: 'button', value: 'Cancel', style: 'danger'}
            ]
          }]
      });
  });

  slapp.action('timesheet_callback', (msg) => {
    const answer = msg.body.actions[0].value;
    const username = msg.body.user.name;
    const date = new Date().toISOString();
    if (answer === 'Cancel') {
      msg.respond(msg.body.response_url, {
        text: `Cancelled`,
        delete_original: true
      });
      }
    else {
      msg.respond(msg.body.response_url, {
        text: `Sending Information`,
        delete_original: true
      });
      return fetch(`http://127.0.0.1:5000/timesheets`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          billableness: answer,
          user: username,
          time: date
        })
      })
        .then(response => response.text())
          .then(msg => {
            msg.respond(msg.body.response_url, {
              text: response.text(),
              delete_original: true
              })
          });
    }
  })
};

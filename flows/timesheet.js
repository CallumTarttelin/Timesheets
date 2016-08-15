'use strict'

module.exports = (slapp) => {

  slapp.command('/pybot', /^hello/, (msg) => {
    msg.respond(msg.body.response_url, "Hello World")
  })

  slapp.message('^(hello|hi)', ['direct_mention', 'direct_message'], (msg, text) => {
    msg.say(["Hello World","Hi"])
  })

  slapp.command('/timesheet', (msg) => {
    console.log("called outcome")
    var state = { requested: Date.now() }
    msg
      .say({
        text: '',
        attachments: [
          {
            text: 'Pass or Fail?',
            fallback: 'Pass or Fail?',
            callback_id: 'outcome_confirm_callback',
            color: "9900cc",
            actions: [
              { name: 'answer', text: 'Full Day', type: 'button', value: 'Pass' },
              { name: 'answer', text: 'Non Billable', type: 'button', value: 'Fail'},
              { name: 'cancel', text: 'Cancel', type: 'button', value: 'Cancel'}
            ]
          }]
      })
      .route('handleOutcomeConfirmation', state, 60)
  })

  slapp.route('handleOutcomeConfirmation', (msg, state) => {
    if (msg.type !== 'action') {
      msg
        .say('Please choose a button')
        .route('handleOutcomeConfirmation', state, 60)
      return
    }

    let answer = msg.body.actions[0].value
    if (answer == 'Pass') {
      msg.respond(msg.body.response_url, {
        text: `Billed`,
        delete_original: true
      })
      return
    }
    if (answer == 'Failed') {
      msg.respond(msg.body.response_url, {
        text: `Not Billed`,
        delete_original: true
      })
    }
    else {
      msg.respond(msg.body.response_url, {
        text: `Cancelled`,
        delete_original: true
      })
    }
  })
}

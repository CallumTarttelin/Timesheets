'use strict'

module.exports = (slapp) => {

  let help = `
  /shrug test
  Enter \`/timesheet\` to bring up timesheet entry
  Enter hi or hello in a direct message to return hello
  Enter \`/pybot help\` to bring up this help
  Help is also callable via saying help in direct message
  `;

  slapp.command('/timesheet', /help/, (msg) => {
    msg.respond(msg.body.response_url, help)
  });

  slapp.message('help|panic', ['direct_message'], (msg) => {
    msg.say(help)
  });

  slapp.message('hello|hi', ['direct_message'], (msg) => {
    msg.say(["Hello World","Hi", "I like timesheets"])
  });
};

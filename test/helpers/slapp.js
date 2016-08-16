var sinon = require('sinon');

const fakeMsg = {
  say: sinon.stub(),
  respond: sinon.stub()
};

const fakeController = {
  command: (command, text, callback)=> {
    const regex = new RegExp(command);
    routes.push({
      regex: regex,
      types: types,
      callback: callback
    })
  },

  sendMessage: (message, after)=> {
    for (var i=0, l=routes.length; i<l; i++) {
      var route = routes[i];
      const text = message.text;
      const match = text.match(route.regex);
      if (match) {
        message.match = match;
        message.text = text;
        var promise = route.callback(fakeMsg, message);
        if (promise !== undefined){
          return promise.then(() => {
            if (after) {
              after(fakeMsg, message);
            }
          });
        }
      }
    }
    if (after) {
      after(fakeMsg, message)
    }
  }
};

module.exports = {
  fakeController: fakeController
};

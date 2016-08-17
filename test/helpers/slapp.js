var sinon = require('sinon');

let routes = [];

const fakeMsg = {
  respond: sinon.spy(),
  body: { response_url: 'foo'}
};

const fakeController = {
  command: (pattern, subtext, callback)=> {
    const regex = new RegExp(pattern);
    const subregex = new RegExp(subtext);
    routes.push({
      regex: regex,
      subregex: subregex,
      callback: callback
    })
  },

  sendCommand: (cmd, subtext, after)=> {
    for (var i=0, l=routes.length; i<l; i++) {
      var route = routes[i];
      var match = cmd.match(route.regex);
      if (match) {
        cmd.match = match;
        cmd.text = cmd;
        match = subtext.match(route.subregex);
        if (match) {
          subtext.match = match;
          subtext.text = subtext;
          var promise = route.callback(fakeMsg, cmd, subtext);
          if (promise !== undefined){
            return promise.then(() => {
              if (after) {
                after(fakeMsg, cmd, subtext);
              }
            });
          }}
      }
    }
    if (after) {
      after(fakeMsg, cmd, subtext)
    }
  }
};

module.exports = {
  fakeController: fakeController
};

var processPRs = require('./build/process');
var notifyHipchat = require('./build/notify');

processPRs.default()
  .then(notifyHipchat.default);

function notifyHipchat2(prs) {
  console.log(prs);
}
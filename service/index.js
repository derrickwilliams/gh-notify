var processPRs = require('./build/process');
//import notifyHipchat from './build/notify';

processPRs.default()
  .then(notifyHipchat2);

function notifyHipchat2(prs) {
  console.log(prs);
}
import Hipchatter from 'hipchatter';
import Promise from 'bluebird';
import { forEach } from 'lodash';

export default function notifyHipchat(params) {
  console.log('params:',params);

  let hipchatter = new Hipchatter('X7qQU0XPSjNn86rj6eLcZEX4tQ1rm6hojP7tLFuq');
  let colors = {
    'normal': 'green',
    'urgent': 'red'  
  };

  params = params || {
    pullRequests: [{
      link: 'https://github.com/cbdr/cbax-apply-platform/pull/271',
      title: 'Add redirect to CB',
      id: 271,
      assignees: ['derrickwilliams','mmoldavan'],
      level: 'normal'
    }]
  }

  forEach(params.pullRequests, sendNotifcation)
  function sendNotifcation(request) {
    hipchatter.notify('CBAX Scrum', 
        {
            message: '<b>PR:</b>: <a href="'+ request.link +'">' + request.title + ' ' + request.id + '</a><br/><b>Assignees:</b> '+request.assignees,
            color: colors[request.level],
            token: '7b6FlCfiFjgVaNpgM3YLOBNeJ3FxIgR2Tq1BC1Jp'
        }, function(err){
            if (err == null) console.log('Successfully notified the room.');
    });
  }
/*hipchatter.notify('CBAX Scrum', 
    {
        message: '<b>Outstanding Pullrequest</b>: <a href="https://github.com/cbdr/cbax-apply-platform/pull/271">Add redirect to CB #271</a><br/><b>Assignees:</b> derrickwilliams',
        color: 'green',
        token: '7b6FlCfiFjgVaNpgM3YLOBNeJ3FxIgR2Tq1BC1Jp'
    }, function(err){
        if (err == null) console.log('Successfully notified the room.');
});*/
return Promise.resolve();
  /*return Promise.resolve(request({
    url: 'https://api.hipchat.com/v2/room/CBAX Scrum/notifcation',
    headers: {
      'content-type':'application/json'
    },
    body: {
      from: 'Admiral Pugdalf',

    }

  }))*/

}
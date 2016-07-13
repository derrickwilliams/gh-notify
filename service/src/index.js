import express from 'express';
import request from 'request-promise';
import Promise from 'bluebird';
import { assign, filter, includes, forEach } from 'lodash';
import Hipchatter from 'hipchatter';

const app = express();

const GITHUB_API_URL = 'https://api.github.com';

app.get('/github/repos', (req, res) => {
  getRepositories(req.query)
    .then(repos => res.json({ repos }))
    .catch(err => res.status(500).json({ error: err.toString() }))
})

app.post('/hipchat/notify', (req, res) => {
  notifyHipchat(req.body)
    .catch(err => res.status(500).json({ error: err.toString() }))
})

app.listen(12121, () => console.log('listening', 12121));

function getRepositories({ repo }) {
  return githubRequest('search/repositories', {
    data: {
      q: `${repo} in:name pushed:>=2016-01-01`
    }
  })
  .get('items')
  .then(repos => filter(repos, (r) => r.owner.login === 'cbdr'))
  // .map(loadRepoIssues)
  .map(loadPullRequests)
  .map(r => {
    return {
      name: r.name,
      owner: r.owner.login,
      issues: r.issues,
      pullRequests: r.pullRequests
    };
  });
}

function loadPullRequests(repo) {
  let { pulls_url } = repo;
  return githubRequest(pulls_url)
    .map(p => ({ id: p.id, number: p.number, title: p.title, url: p.url, assignees: p.assignees }))
    .then(pulls => assign({}, repo, { ['pullRequests']: pulls }))
    .catch(err => {
      console.error(err)
      throw err;
    })
}

function loadRepoIssues(repo) {
  let { issues_url } = repo;
  return githubRequest(issues_url)
    .map(i => ({ id: i.id, number: i.number, title: i.title, url: i.url, assignees: i.assignees }))
    .then(issues => assign({}, repo, { issues }))
    .catch(err => {
      console.error(err)
      throw err;
    })
}

function removePlaceholder(url, placeholder) {
  return url.replace(new RegExp(`{/${placeholder}}`), '');
}

function githubRequest(endpoint, { data = {}, dataField = 'qs' } = {}) {
  return Promise.resolve(request({
    url: prepEndpointUrl(endpoint),
    [dataField]: data,
    headers: {
      'Authorization': `token ${process.env.GH_NOTIFY_AUTH_TOKEN}`,
      'User-Agent': 'cbax/gh-notify',
      'Accept': 'application/vnd.github.cerberus-preview+json'
    },
    json: true
  }))
}

function prepEndpointUrl(urlIn) {
  console.log('url in', urlIn);
  console.log(urlIn, 'includes', GITHUB_API_URL, includes(removePlaceholder(urlIn, 'number'), GITHUB_API_URL))
  urlIn = removePlaceholder(urlIn, 'number');
  return includes(urlIn, GITHUB_API_URL) ?
    urlIn : `${GITHUB_API_URL}/${urlIn}`;
}

function notifyHipchat(params) {
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
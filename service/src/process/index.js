import _ from 'lodash';
import Promise from 'bluebird';
import fs from 'fs';
import getRepositories from '../retreive';

let dataPromise = getRepositories({ repo: 'cbax-' })

let oneDay = 24 * 60 * 60 * 1000;

dataPromise
  .then((repos) => _.filter(repos, (r) => r.pullRequests.length > 0 ))
  .then((repos) => _.map(repos, mapPRs))
  .then((PRs) => _.flatten(PRs))
  .tap(console.log);

function mapPRs(repo) {
  return _.map(repo.pullRequests, (PR) => {

    PR.repo = repo.name;
    PR.owner = PR.owner.login;
    PR.link = PR.url;
    PR.timeOpen = (new Date() - new Date(PR.created)) / oneDay;
    PR.timeSinceLastModified = (new Date() - new Date(PR.updated)) / oneDay;

    PR.assignees = _.map(PR.assignees, (assignee) => assignee.login);
    PR.level = getLevel(PR);

    _.unset(PR, 'id');
    _.unset(PR, 'number');
    _.unset(PR, 'url');

    return PR;
  });
}

function getLevel(PR) {
  let noComments = false;
  if(PR.assignees.length === 0 || PR.timeOpen > 3) {
    return 10; //red: no assignees or stale
  }
  if(PR.timeOpen > 2 || (PR.timeOpen > 1 && noComments)) {
    return 5; //yellow going stale (outstanding > 2 days or no comments from assignees yet && older than 16 hours)
  }
  return 0; //green
}
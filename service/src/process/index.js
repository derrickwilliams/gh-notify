import _ from 'lodash';
import Promise from 'bluebird';
import fs from 'fs';

//get data here
let readFile = Promise.promisifyAll(fs).readFileAsync;
let dataPromise = readFile('./service/build/process/mock-data.json');

let output = [];

dataPromise
  .then((fileContent) => JSON.parse(fileContent).repos)
  .then((repos) => _.filter(repos, (r) => r.pullRequests.length > 0 ))
  .then((repos) => _.map(repos, mapPRs))
  .then((PRs) => _.flatten(PRs))
  .tap(console.log);

function mapPRs(repo) {
  return _.map(repo.pullRequests, (PR) => {

    PR.repo = repo.name;
    PR.link = PR.url;

    PR.assignees = _.map(PR.assignees, (assignee) => assignee.login);
    PR.level = getLevel(PR);

    _.unset(PR, 'id');
    _.unset(PR, 'number');
    _.unset(PR, 'url');

    return PR;
  });
}

function getLevel(PR) {
  if(PR.assignees.length === 0) {
    return 10; //red: no assignees or stale
  }
  let yellow = 5; //yellow going stale (outstanding > 2 days or no comments from assignees yet && older than 16 hours)
  return 0; //green
}
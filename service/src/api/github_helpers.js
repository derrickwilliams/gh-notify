import Promise from 'bluebird';
import Github from 'github-api';
import { filter } from 'lodash';

export function searchByName({ name, client = defaultClient()}) {
  let srch = client.search({ q: `${name} in:name` });
  return prms(srch.forRepositories())
    .get('data')
    .then(repos => filter(repos, (r) => r.owner.login === 'cbdr'));
}

function prms(lamePromise) {
  // make a better promise
  return Promise.resolve(lamePromise);
}

function defaultClient() {
  const auth = { token: process.env.GH_NOTIFY_AUTH_TOKEN };
  return new Github(auth);
}
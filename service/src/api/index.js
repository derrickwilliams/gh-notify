import Github from 'github-api';
import Promise from 'bluebird';
import { methods, filter } from 'lodash';
import { writeFileSync } from 'fs';
import { join } from 'path';

import github from './github';

export { github };

// const auth = { token: process.env.GH_NOTIFY_AUTH_TOKEN };
// const config = {
//   debug: true,
//   protocol: "https",
//   host: "api.github.com",
//   headers: {
//     "user-agent": "cbax/gh-notify"
//   },
//   Promise,
//   timeout: 5000
// };
// const github = new Github(auth);
// const cbdr = github.getOrganization('cbdr');

// searchByName({ name: 'cbax-', client: github })
//   .get('data')
//   .then(repos => filter(repos, (r) => r.owner.login === 'cbdr'))
//   .map(r => {
//     console.log(`name: ${r.name}`)
//     return r;
//   })
//   // .then(results => console.log('SEARCH RESULTS', results))//JSON.stringify(results, null, 2)))
//   .catch(err => console.error('SEARCH ERROR', err));

// function searchByName({ name, client }) {
//   let srch = client.search({ q: `${name} in:name` });
//   return prms(srch.forRepositories());
// }

// function prms(lamePromise) {
//   // make a better promise
//   return Promise.resolve(lamePromise);
// }

// // Promise.resolve(github.getOrganization('cbdr').getRepos())
// //   .get('data')
// //   .get(0)
// //   // .tap(repos => writeFileSync(join(__dirname, '../../..', 'cbdr_repos.json'), JSON.stringify(repos, null, 2)))
// //   .tap(repos => {
// //     console.log('REPO COUNT', repos.length)
// //   })
// //   .catch(err => console.error('ERRORS', err));

// // console.log('ISSUES', getIssues)
// // github.users.getFollowingForUser({
// //     // optional:
// //     // headers: {
// //     //     "cookie": "blahblah"
// //     // },
// //     user: "derrickwilliams"
// // }, function(err, res) {
// //     console.log(JSON.stringify(res));
// // });


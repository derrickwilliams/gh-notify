'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.github = undefined;

var _githubApi = require('github-api');

var _githubApi2 = _interopRequireDefault(_githubApi);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _fs = require('fs');

var _path = require('path');

var _github = require('./github');

var _github2 = _interopRequireDefault(_github);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.github = _github2.default;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7O1FBRVMsTTs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHaXRodWIgZnJvbSAnZ2l0aHViLWFwaSc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBtZXRob2RzLCBmaWx0ZXIgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgd3JpdGVGaWxlU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcblxuaW1wb3J0IGdpdGh1YiBmcm9tICcuL2dpdGh1Yic7XG5cbmV4cG9ydCB7IGdpdGh1YiB9O1xuXG4vLyBjb25zdCBhdXRoID0geyB0b2tlbjogcHJvY2Vzcy5lbnYuR0hfTk9USUZZX0FVVEhfVE9LRU4gfTtcbi8vIGNvbnN0IGNvbmZpZyA9IHtcbi8vICAgZGVidWc6IHRydWUsXG4vLyAgIHByb3RvY29sOiBcImh0dHBzXCIsXG4vLyAgIGhvc3Q6IFwiYXBpLmdpdGh1Yi5jb21cIixcbi8vICAgaGVhZGVyczoge1xuLy8gICAgIFwidXNlci1hZ2VudFwiOiBcImNiYXgvZ2gtbm90aWZ5XCJcbi8vICAgfSxcbi8vICAgUHJvbWlzZSxcbi8vICAgdGltZW91dDogNTAwMFxuLy8gfTtcbi8vIGNvbnN0IGdpdGh1YiA9IG5ldyBHaXRodWIoYXV0aCk7XG4vLyBjb25zdCBjYmRyID0gZ2l0aHViLmdldE9yZ2FuaXphdGlvbignY2JkcicpO1xuXG4vLyBzZWFyY2hCeU5hbWUoeyBuYW1lOiAnY2JheC0nLCBjbGllbnQ6IGdpdGh1YiB9KVxuLy8gICAuZ2V0KCdkYXRhJylcbi8vICAgLnRoZW4ocmVwb3MgPT4gZmlsdGVyKHJlcG9zLCAocikgPT4gci5vd25lci5sb2dpbiA9PT0gJ2NiZHInKSlcbi8vICAgLm1hcChyID0+IHtcbi8vICAgICBjb25zb2xlLmxvZyhgbmFtZTogJHtyLm5hbWV9YClcbi8vICAgICByZXR1cm4gcjtcbi8vICAgfSlcbi8vICAgLy8gLnRoZW4ocmVzdWx0cyA9PiBjb25zb2xlLmxvZygnU0VBUkNIIFJFU1VMVFMnLCByZXN1bHRzKSkvL0pTT04uc3RyaW5naWZ5KHJlc3VsdHMsIG51bGwsIDIpKSlcbi8vICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKCdTRUFSQ0ggRVJST1InLCBlcnIpKTtcblxuLy8gZnVuY3Rpb24gc2VhcmNoQnlOYW1lKHsgbmFtZSwgY2xpZW50IH0pIHtcbi8vICAgbGV0IHNyY2ggPSBjbGllbnQuc2VhcmNoKHsgcTogYCR7bmFtZX0gaW46bmFtZWAgfSk7XG4vLyAgIHJldHVybiBwcm1zKHNyY2guZm9yUmVwb3NpdG9yaWVzKCkpO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBwcm1zKGxhbWVQcm9taXNlKSB7XG4vLyAgIC8vIG1ha2UgYSBiZXR0ZXIgcHJvbWlzZVxuLy8gICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGxhbWVQcm9taXNlKTtcbi8vIH1cblxuLy8gLy8gUHJvbWlzZS5yZXNvbHZlKGdpdGh1Yi5nZXRPcmdhbml6YXRpb24oJ2NiZHInKS5nZXRSZXBvcygpKVxuLy8gLy8gICAuZ2V0KCdkYXRhJylcbi8vIC8vICAgLmdldCgwKVxuLy8gLy8gICAvLyAudGFwKHJlcG9zID0+IHdyaXRlRmlsZVN5bmMoam9pbihfX2Rpcm5hbWUsICcuLi8uLi8uLicsICdjYmRyX3JlcG9zLmpzb24nKSwgSlNPTi5zdHJpbmdpZnkocmVwb3MsIG51bGwsIDIpKSlcbi8vIC8vICAgLnRhcChyZXBvcyA9PiB7XG4vLyAvLyAgICAgY29uc29sZS5sb2coJ1JFUE8gQ09VTlQnLCByZXBvcy5sZW5ndGgpXG4vLyAvLyAgIH0pXG4vLyAvLyAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcignRVJST1JTJywgZXJyKSk7XG5cbi8vIC8vIGNvbnNvbGUubG9nKCdJU1NVRVMnLCBnZXRJc3N1ZXMpXG4vLyAvLyBnaXRodWIudXNlcnMuZ2V0Rm9sbG93aW5nRm9yVXNlcih7XG4vLyAvLyAgICAgLy8gb3B0aW9uYWw6XG4vLyAvLyAgICAgLy8gaGVhZGVyczoge1xuLy8gLy8gICAgIC8vICAgICBcImNvb2tpZVwiOiBcImJsYWhibGFoXCJcbi8vIC8vICAgICAvLyB9LFxuLy8gLy8gICAgIHVzZXI6IFwiZGVycmlja3dpbGxpYW1zXCJcbi8vIC8vIH0sIGZ1bmN0aW9uKGVyciwgcmVzKSB7XG4vLyAvLyAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XG4vLyAvLyB9KTtcblxuIl19
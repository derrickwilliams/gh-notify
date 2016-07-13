'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _path = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = (0, _express2.default)();

var GITHUB_API_URL = 'https://api.github.com';

app.get('/github/repos', function (req, res) {
  getRepositories(req.query).tap(function (repos) {
    return _fs2.default.writeFileSync((0, _path.join)(__dirname, 'full_response.json'), JSON.stringify(repos, null, 2));
  }).then(function (repos) {
    return res.json({ repos: repos });
  }).catch(function (err) {
    return res.status(500).json({ error: err.toString() });
  });
});

app.listen(12121, function () {
  return console.log('listening', 12121);
});

function getRepositories(_ref) {
  var repo = _ref.repo;

  return githubRequest('search/repositories', {
    data: {
      q: repo + ' in:name pushed:>=2016-01-01'
    }
  }).get('items').then(function (repos) {
    return (0, _lodash.filter)(repos, function (r) {
      return r.owner.login === 'cbdr';
    });
  })
  // .map(loadRepoIssues)
  .map(loadPullRequests);
  // .map(r => {
  //   return {
  //     name: r.name,
  //     owner: r.owner.login,
  //     issues: r.issues,
  //     pullRequests: r.pullRequests
  //   };
  // });
}

function loadPullRequests(repo) {
  var pulls_url = repo.pulls_url;

  return githubRequest(pulls_url)
  // .map(p => ({ id: p.id, number: p.number, title: p.title, url: p.url, assignees: p.assignees }))
  .then(function (pulls) {
    return (0, _lodash.assign)({}, repo, _defineProperty({}, 'pullRequests', pulls));
  }).catch(function (err) {
    console.error(err);
    throw err;
  });
}

function loadRepoIssues(repo) {
  var issues_url = repo.issues_url;

  return githubRequest(issues_url)
  // .map(i => ({ id: i.id, number: i.number, title: i.title, url: i.url, assignees: i.assignees }))
  .then(function (issues) {
    return (0, _lodash.assign)({}, repo, { issues: issues });
  }).catch(function (err) {
    console.error(err);
    throw err;
  });
}

function removePlaceholder(url, placeholder) {
  return url.replace(new RegExp('{/' + placeholder + '}'), '');
}

function githubRequest(endpoint) {
  var _request;

  var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref2$data = _ref2.data;
  var data = _ref2$data === undefined ? {} : _ref2$data;
  var _ref2$dataField = _ref2.dataField;
  var dataField = _ref2$dataField === undefined ? 'qs' : _ref2$dataField;

  return _bluebird2.default.resolve((0, _requestPromise2.default)((_request = {
    url: prepEndpointUrl(endpoint)
  }, _defineProperty(_request, dataField, data), _defineProperty(_request, 'headers', {
    'Authorization': 'token ' + process.env.GH_NOTIFY_AUTH_TOKEN,
    'User-Agent': 'cbax/gh-notify',
    'Accept': 'application/vnd.github.cerberus-preview+json'
  }), _defineProperty(_request, 'json', true), _request)));
}

function prepEndpointUrl(urlIn) {
  console.log('url in', urlIn);
  console.log(urlIn, 'includes', GITHUB_API_URL, (0, _lodash.includes)(removePlaceholder(urlIn, 'number'), GITHUB_API_URL));
  urlIn = removePlaceholder(urlIn, 'number');
  return (0, _lodash.includes)(urlIn, GITHUB_API_URL) ? urlIn : GITHUB_API_URL + '/' + urlIn;
}
//# sourceMappingURL=data:application/json;base64,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O0FBQ3JCLFNBQUssZ0JBQWdCLFFBQWhCO0FBRGdCLCtCQUVwQixTQUZvQixFQUVSLElBRlEsd0NBR1o7QUFDUCxnQ0FBMEIsUUFBUSxHQUFSLENBQVksb0JBRC9CO0FBRVAsa0JBQWMsZ0JBRlA7QUFHUCxjQUFVO0FBSEgsR0FIWSxxQ0FRZixJQVJlLGFBQWhCLENBQVA7QUFVRDs7QUFFRCxTQUFTLGVBQVQsQ0FBeUIsS0FBekIsRUFBZ0M7QUFDOUIsVUFBUSxHQUFSLENBQVksUUFBWixFQUFzQixLQUF0QjtBQUNBLFVBQVEsR0FBUixDQUFZLEtBQVosRUFBbUIsVUFBbkIsRUFBK0IsY0FBL0IsRUFBK0Msc0JBQVMsa0JBQWtCLEtBQWxCLEVBQXlCLFFBQXpCLENBQVQsRUFBNkMsY0FBN0MsQ0FBL0M7QUFDQSxVQUFRLGtCQUFrQixLQUFsQixFQUF5QixRQUF6QixDQUFSO0FBQ0EsU0FBTyxzQkFBUyxLQUFULEVBQWdCLGNBQWhCLElBQ0wsS0FESyxHQUNNLGNBRE4sU0FDd0IsS0FEL0I7QUFFRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IGFzc2lnbiwgZmlsdGVyLCBpbmNsdWRlcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbmNvbnN0IEdJVEhVQl9BUElfVVJMID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20nO1xuXG5hcHAuZ2V0KCcvZ2l0aHViL3JlcG9zJywgKHJlcSwgcmVzKSA9PiB7XG4gIGdldFJlcG9zaXRvcmllcyhyZXEucXVlcnkpXG4gICAgLnRhcChyZXBvcyA9PiBmcy53cml0ZUZpbGVTeW5jKGpvaW4oX19kaXJuYW1lLCAnZnVsbF9yZXNwb25zZS5qc29uJyksIEpTT04uc3RyaW5naWZ5KHJlcG9zLCBudWxsLCAyKSkpXG4gICAgLnRoZW4ocmVwb3MgPT4gcmVzLmpzb24oeyByZXBvcyB9KSlcbiAgICAuY2F0Y2goZXJyID0+IHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IGVyci50b1N0cmluZygpIH0pKVxufSlcblxuYXBwLmxpc3RlbigxMjEyMSwgKCkgPT4gY29uc29sZS5sb2coJ2xpc3RlbmluZycsIDEyMTIxKSk7XG5cbmZ1bmN0aW9uIGdldFJlcG9zaXRvcmllcyh7IHJlcG8gfSkge1xuICByZXR1cm4gZ2l0aHViUmVxdWVzdCgnc2VhcmNoL3JlcG9zaXRvcmllcycsIHtcbiAgICBkYXRhOiB7XG4gICAgICBxOiBgJHtyZXBvfSBpbjpuYW1lIHB1c2hlZDo+PTIwMTYtMDEtMDFgXG4gICAgfVxuICB9KVxuICAuZ2V0KCdpdGVtcycpXG4gIC50aGVuKHJlcG9zID0+IGZpbHRlcihyZXBvcywgKHIpID0+IHIub3duZXIubG9naW4gPT09ICdjYmRyJykpXG4gIC8vIC5tYXAobG9hZFJlcG9Jc3N1ZXMpXG4gIC5tYXAobG9hZFB1bGxSZXF1ZXN0cylcbiAgLy8gLm1hcChyID0+IHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgbmFtZTogci5uYW1lLFxuICAvLyAgICAgb3duZXI6IHIub3duZXIubG9naW4sXG4gIC8vICAgICBpc3N1ZXM6IHIuaXNzdWVzLFxuICAvLyAgICAgcHVsbFJlcXVlc3RzOiByLnB1bGxSZXF1ZXN0c1xuICAvLyAgIH07XG4gIC8vIH0pO1xufVxuXG5mdW5jdGlvbiBsb2FkUHVsbFJlcXVlc3RzKHJlcG8pIHtcbiAgbGV0IHsgcHVsbHNfdXJsIH0gPSByZXBvO1xuICByZXR1cm4gZ2l0aHViUmVxdWVzdChwdWxsc191cmwpXG4gICAgLy8gLm1hcChwID0+ICh7IGlkOiBwLmlkLCBudW1iZXI6IHAubnVtYmVyLCB0aXRsZTogcC50aXRsZSwgdXJsOiBwLnVybCwgYXNzaWduZWVzOiBwLmFzc2lnbmVlcyB9KSlcbiAgICAudGhlbihwdWxscyA9PiBhc3NpZ24oe30sIHJlcG8sIHsgWydwdWxsUmVxdWVzdHMnXTogcHVsbHMgfSkpXG4gICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgIHRocm93IGVycjtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBsb2FkUmVwb0lzc3VlcyhyZXBvKSB7XG4gIGxldCB7IGlzc3Vlc191cmwgfSA9IHJlcG87XG4gIHJldHVybiBnaXRodWJSZXF1ZXN0KGlzc3Vlc191cmwpXG4gICAgLy8gLm1hcChpID0+ICh7IGlkOiBpLmlkLCBudW1iZXI6IGkubnVtYmVyLCB0aXRsZTogaS50aXRsZSwgdXJsOiBpLnVybCwgYXNzaWduZWVzOiBpLmFzc2lnbmVlcyB9KSlcbiAgICAudGhlbihpc3N1ZXMgPT4gYXNzaWduKHt9LCByZXBvLCB7IGlzc3VlcyB9KSlcbiAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgdGhyb3cgZXJyO1xuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHJlbW92ZVBsYWNlaG9sZGVyKHVybCwgcGxhY2Vob2xkZXIpIHtcbiAgcmV0dXJuIHVybC5yZXBsYWNlKG5ldyBSZWdFeHAoYHsvJHtwbGFjZWhvbGRlcn19YCksICcnKTtcbn1cblxuZnVuY3Rpb24gZ2l0aHViUmVxdWVzdChlbmRwb2ludCwgeyBkYXRhID0ge30sIGRhdGFGaWVsZCA9ICdxcycgfSA9IHt9KSB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVxdWVzdCh7XG4gICAgdXJsOiBwcmVwRW5kcG9pbnRVcmwoZW5kcG9pbnQpLFxuICAgIFtkYXRhRmllbGRdOiBkYXRhLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdBdXRob3JpemF0aW9uJzogYHRva2VuICR7cHJvY2Vzcy5lbnYuR0hfTk9USUZZX0FVVEhfVE9LRU59YCxcbiAgICAgICdVc2VyLUFnZW50JzogJ2NiYXgvZ2gtbm90aWZ5JyxcbiAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vdm5kLmdpdGh1Yi5jZXJiZXJ1cy1wcmV2aWV3K2pzb24nXG4gICAgfSxcbiAgICBqc29uOiB0cnVlXG4gIH0pKVxufVxuXG5mdW5jdGlvbiBwcmVwRW5kcG9pbnRVcmwodXJsSW4pIHtcbiAgY29uc29sZS5sb2coJ3VybCBpbicsIHVybEluKTtcbiAgY29uc29sZS5sb2codXJsSW4sICdpbmNsdWRlcycsIEdJVEhVQl9BUElfVVJMLCBpbmNsdWRlcyhyZW1vdmVQbGFjZWhvbGRlcih1cmxJbiwgJ251bWJlcicpLCBHSVRIVUJfQVBJX1VSTCkpXG4gIHVybEluID0gcmVtb3ZlUGxhY2Vob2xkZXIodXJsSW4sICdudW1iZXInKTtcbiAgcmV0dXJuIGluY2x1ZGVzKHVybEluLCBHSVRIVUJfQVBJX1VSTCkgP1xuICAgIHVybEluIDogYCR7R0lUSFVCX0FQSV9VUkx9LyR7dXJsSW59YDtcbn0iXX0=
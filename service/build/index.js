'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = (0, _express2.default)();

var GITHUB_API_URL = 'https://api.github.com';

app.get('/github/repos', function (req, res) {
  getRepositories(req.query).then(function (repos) {
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
  .map(loadPullRequests).map(function (r) {
    return {
      name: r.name,
      owner: r.owner.login,
      issues: r.issues,
      pullRequests: r.pullRequests
    };
  });
}

function loadPullRequests(repo) {
  var pulls_url = repo.pulls_url;

  return githubRequest(pulls_url).map(function (p) {
    return { id: p.id, number: p.number, title: p.title, url: p.url, assignees: p.assignees };
  }).then(function (pulls) {
    return (0, _lodash.assign)({}, repo, _defineProperty({}, 'pullRequests', pulls));
  }).catch(function (err) {
    console.error(err);
    throw err;
  });
}

function loadRepoIssues(repo) {
  var issues_url = repo.issues_url;

  return githubRequest(issues_url).map(function (i) {
    return { id: i.id, number: i.number, title: i.title, url: i.url, assignees: i.assignees };
  }).then(function (issues) {
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
//# sourceMappingURL=data:application/json;base64,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O0FBQzNDLFNBQU8sSUFBSSxPQUFKLENBQVksSUFBSSxNQUFKLFFBQWdCLFdBQWhCLE9BQVosRUFBNkMsRUFBN0MsQ0FBUDtBQUNEOztBQUVELFNBQVMsYUFBVCxDQUF1QixRQUF2QixFQUF1RTtBQUFBOztBQUFBLG9FQUFKLEVBQUk7O0FBQUEseUJBQXBDLElBQW9DO0FBQUEsTUFBcEMsSUFBb0MsOEJBQTdCLEVBQTZCO0FBQUEsOEJBQXpCLFNBQXlCO0FBQUEsTUFBekIsU0FBeUIsbUNBQWIsSUFBYTs7QUFDckUsU0FBTyxtQkFBUSxPQUFSLENBQWdCO0FBQ3JCLFNBQUssZ0JBQWdCLFFBQWhCO0FBRGdCLCtCQUVwQixTQUZvQixFQUVSLElBRlEsd0NBR1o7QUFDUCxnQ0FBMEIsUUFBUSxHQUFSLENBQVksb0JBRC9CO0FBRVAsa0JBQWMsZ0JBRlA7QUFHUCxjQUFVO0FBSEgsR0FIWSxxQ0FRZixJQVJlLGFBQWhCLENBQVA7QUFVRDs7QUFFRCxTQUFTLGVBQVQsQ0FBeUIsS0FBekIsRUFBZ0M7QUFDOUIsVUFBUSxHQUFSLENBQVksUUFBWixFQUFzQixLQUF0QjtBQUNBLFVBQVEsR0FBUixDQUFZLEtBQVosRUFBbUIsVUFBbkIsRUFBK0IsY0FBL0IsRUFBK0Msc0JBQVMsa0JBQWtCLEtBQWxCLEVBQXlCLFFBQXpCLENBQVQsRUFBNkMsY0FBN0MsQ0FBL0M7QUFDQSxVQUFRLGtCQUFrQixLQUFsQixFQUF5QixRQUF6QixDQUFSO0FBQ0EsU0FBTyxzQkFBUyxLQUFULEVBQWdCLGNBQWhCLElBQ0wsS0FESyxHQUNNLGNBRE4sU0FDd0IsS0FEL0I7QUFFRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IGFzc2lnbiwgZmlsdGVyLCBpbmNsdWRlcyB9IGZyb20gJ2xvZGFzaCdcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG5jb25zdCBHSVRIVUJfQVBJX1VSTCA9ICdodHRwczovL2FwaS5naXRodWIuY29tJztcblxuYXBwLmdldCgnL2dpdGh1Yi9yZXBvcycsIChyZXEsIHJlcykgPT4ge1xuICBnZXRSZXBvc2l0b3JpZXMocmVxLnF1ZXJ5KVxuICAgIC50aGVuKHJlcG9zID0+IHJlcy5qc29uKHsgcmVwb3MgfSkpXG4gICAgLmNhdGNoKGVyciA9PiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiBlcnIudG9TdHJpbmcoKSB9KSlcbn0pXG5cbmFwcC5saXN0ZW4oMTIxMjEsICgpID0+IGNvbnNvbGUubG9nKCdsaXN0ZW5pbmcnLCAxMjEyMSkpO1xuXG5mdW5jdGlvbiBnZXRSZXBvc2l0b3JpZXMoeyByZXBvIH0pIHtcbiAgcmV0dXJuIGdpdGh1YlJlcXVlc3QoJ3NlYXJjaC9yZXBvc2l0b3JpZXMnLCB7XG4gICAgZGF0YToge1xuICAgICAgcTogYCR7cmVwb30gaW46bmFtZSBwdXNoZWQ6Pj0yMDE2LTAxLTAxYFxuICAgIH1cbiAgfSlcbiAgLmdldCgnaXRlbXMnKVxuICAudGhlbihyZXBvcyA9PiBmaWx0ZXIocmVwb3MsIChyKSA9PiByLm93bmVyLmxvZ2luID09PSAnY2JkcicpKVxuICAvLyAubWFwKGxvYWRSZXBvSXNzdWVzKVxuICAubWFwKGxvYWRQdWxsUmVxdWVzdHMpXG4gIC5tYXAociA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHIubmFtZSxcbiAgICAgIG93bmVyOiByLm93bmVyLmxvZ2luLFxuICAgICAgaXNzdWVzOiByLmlzc3VlcyxcbiAgICAgIHB1bGxSZXF1ZXN0czogci5wdWxsUmVxdWVzdHNcbiAgICB9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZFB1bGxSZXF1ZXN0cyhyZXBvKSB7XG4gIGxldCB7IHB1bGxzX3VybCB9ID0gcmVwbztcbiAgcmV0dXJuIGdpdGh1YlJlcXVlc3QocHVsbHNfdXJsKVxuICAgIC5tYXAocCA9PiAoeyBpZDogcC5pZCwgbnVtYmVyOiBwLm51bWJlciwgdGl0bGU6IHAudGl0bGUsIHVybDogcC51cmwsIGFzc2lnbmVlczogcC5hc3NpZ25lZXMgfSkpXG4gICAgLnRoZW4ocHVsbHMgPT4gYXNzaWduKHt9LCByZXBvLCB7IFsncHVsbFJlcXVlc3RzJ106IHB1bGxzIH0pKVxuICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gbG9hZFJlcG9Jc3N1ZXMocmVwbykge1xuICBsZXQgeyBpc3N1ZXNfdXJsIH0gPSByZXBvO1xuICByZXR1cm4gZ2l0aHViUmVxdWVzdChpc3N1ZXNfdXJsKVxuICAgIC5tYXAoaSA9PiAoeyBpZDogaS5pZCwgbnVtYmVyOiBpLm51bWJlciwgdGl0bGU6IGkudGl0bGUsIHVybDogaS51cmwsIGFzc2lnbmVlczogaS5hc3NpZ25lZXMgfSkpXG4gICAgLnRoZW4oaXNzdWVzID0+IGFzc2lnbih7fSwgcmVwbywgeyBpc3N1ZXMgfSkpXG4gICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgIHRocm93IGVycjtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiByZW1vdmVQbGFjZWhvbGRlcih1cmwsIHBsYWNlaG9sZGVyKSB7XG4gIHJldHVybiB1cmwucmVwbGFjZShuZXcgUmVnRXhwKGB7LyR7cGxhY2Vob2xkZXJ9fWApLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGdpdGh1YlJlcXVlc3QoZW5kcG9pbnQsIHsgZGF0YSA9IHt9LCBkYXRhRmllbGQgPSAncXMnIH0gPSB7fSkge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcXVlc3Qoe1xuICAgIHVybDogcHJlcEVuZHBvaW50VXJsKGVuZHBvaW50KSxcbiAgICBbZGF0YUZpZWxkXTogZGF0YSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQXV0aG9yaXphdGlvbic6IGB0b2tlbiAke3Byb2Nlc3MuZW52LkdIX05PVElGWV9BVVRIX1RPS0VOfWAsXG4gICAgICAnVXNlci1BZ2VudCc6ICdjYmF4L2doLW5vdGlmeScsXG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIuY2VyYmVydXMtcHJldmlldytqc29uJ1xuICAgIH0sXG4gICAganNvbjogdHJ1ZVxuICB9KSlcbn1cblxuZnVuY3Rpb24gcHJlcEVuZHBvaW50VXJsKHVybEluKSB7XG4gIGNvbnNvbGUubG9nKCd1cmwgaW4nLCB1cmxJbik7XG4gIGNvbnNvbGUubG9nKHVybEluLCAnaW5jbHVkZXMnLCBHSVRIVUJfQVBJX1VSTCwgaW5jbHVkZXMocmVtb3ZlUGxhY2Vob2xkZXIodXJsSW4sICdudW1iZXInKSwgR0lUSFVCX0FQSV9VUkwpKVxuICB1cmxJbiA9IHJlbW92ZVBsYWNlaG9sZGVyKHVybEluLCAnbnVtYmVyJyk7XG4gIHJldHVybiBpbmNsdWRlcyh1cmxJbiwgR0lUSFVCX0FQSV9VUkwpID9cbiAgICB1cmxJbiA6IGAke0dJVEhVQl9BUElfVVJMfS8ke3VybElufWA7XG59Il19
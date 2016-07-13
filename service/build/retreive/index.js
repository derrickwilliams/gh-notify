'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRepositories;

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GITHUB_API_URL = 'https://api.github.com';

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
};

function loadPullRequests(repo) {
  var pulls_url = repo.pulls_url;

  return githubRequest(pulls_url).map(function (p) {
    return {
      id: p.id,
      owner: p.user,
      number: p.number,
      title: p.title,
      url: p.url,
      assignees: p.assignees,
      created: p.created_at,
      updated: p.updated_at
    };
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
  urlIn = removePlaceholder(urlIn, 'number');
  return (0, _lodash.includes)(urlIn, GITHUB_API_URL) ? urlIn : GITHUB_API_URL + '/' + urlIn;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXRyZWl2ZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFLd0IsZTs7QUFMeEI7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFDQSxJQUFNLGlCQUFpQix3QkFBdkI7O0FBRWUsU0FBUyxlQUFULE9BQW1DO0FBQUEsTUFBUixJQUFRLFFBQVIsSUFBUTs7QUFDaEQsU0FBTyxjQUFjLHFCQUFkLEVBQXFDO0FBQzFDLFVBQU07QUFDSixTQUFNLElBQU47QUFESTtBQURvQyxHQUFyQyxFQUtOLEdBTE0sQ0FLRixPQUxFLEVBTU4sSUFOTSxDQU1EO0FBQUEsV0FBUyxvQkFBTyxLQUFQLEVBQWMsVUFBQyxDQUFEO0FBQUEsYUFBTyxFQUFFLEtBQUYsQ0FBUSxLQUFSLEtBQWtCLE1BQXpCO0FBQUEsS0FBZCxDQUFUO0FBQUEsR0FOQzs7QUFBQSxHQVFOLEdBUk0sQ0FRRixnQkFSRSxFQVNOLEdBVE0sQ0FTRixhQUFLO0FBQ1IsV0FBTztBQUNMLFlBQU0sRUFBRSxJQURIO0FBRUwsYUFBTyxFQUFFLEtBQUYsQ0FBUSxLQUZWO0FBR0wsY0FBUSxFQUFFLE1BSEw7QUFJTCxvQkFBYyxFQUFFO0FBSlgsS0FBUDtBQU1ELEdBaEJNLENBQVA7QUFpQkQ7O0FBRUQsU0FBUyxnQkFBVCxDQUEwQixJQUExQixFQUFnQztBQUFBLE1BQ3hCLFNBRHdCLEdBQ1YsSUFEVSxDQUN4QixTQUR3Qjs7QUFFOUIsU0FBTyxjQUFjLFNBQWQsRUFDSixHQURJLENBQ0E7QUFBQSxXQUFNO0FBQ1QsVUFBSSxFQUFFLEVBREc7QUFFVCxhQUFPLEVBQUUsSUFGQTtBQUdULGNBQVEsRUFBRSxNQUhEO0FBSVQsYUFBTyxFQUFFLEtBSkE7QUFLVCxXQUFLLEVBQUUsR0FMRTtBQU1ULGlCQUFXLEVBQUUsU0FOSjtBQU9ULGVBQVMsRUFBRSxVQVBGO0FBUVQsZUFBUyxFQUFFO0FBUkYsS0FBTjtBQUFBLEdBREEsRUFXSixJQVhJLENBV0M7QUFBQSxXQUFTLG9CQUFPLEVBQVAsRUFBVyxJQUFYLHNCQUFvQixjQUFwQixFQUFxQyxLQUFyQyxFQUFUO0FBQUEsR0FYRCxFQVlKLEtBWkksQ0FZRSxlQUFPO0FBQ1osWUFBUSxLQUFSLENBQWMsR0FBZDtBQUNBLFVBQU0sR0FBTjtBQUNELEdBZkksQ0FBUDtBQWdCRDs7QUFFRCxTQUFTLGNBQVQsQ0FBd0IsSUFBeEIsRUFBOEI7QUFBQSxNQUN0QixVQURzQixHQUNQLElBRE8sQ0FDdEIsVUFEc0I7O0FBRTVCLFNBQU8sY0FBYyxVQUFkLEVBQ0osR0FESSxDQUNBO0FBQUEsV0FBTSxFQUFFLElBQUksRUFBRSxFQUFSLEVBQVksUUFBUSxFQUFFLE1BQXRCLEVBQThCLE9BQU8sRUFBRSxLQUF2QyxFQUE4QyxLQUFLLEVBQUUsR0FBckQsRUFBMEQsV0FBVyxFQUFFLFNBQXZFLEVBQU47QUFBQSxHQURBLEVBRUosSUFGSSxDQUVDO0FBQUEsV0FBVSxvQkFBTyxFQUFQLEVBQVcsSUFBWCxFQUFpQixFQUFFLGNBQUYsRUFBakIsQ0FBVjtBQUFBLEdBRkQsRUFHSixLQUhJLENBR0UsZUFBTztBQUNaLFlBQVEsS0FBUixDQUFjLEdBQWQ7QUFDQSxVQUFNLEdBQU47QUFDRCxHQU5JLENBQVA7QUFPRDs7QUFFRCxTQUFTLGlCQUFULENBQTJCLEdBQTNCLEVBQWdDLFdBQWhDLEVBQTZDO0FBQzNDLFNBQU8sSUFBSSxPQUFKLENBQVksSUFBSSxNQUFKLFFBQWdCLFdBQWhCLE9BQVosRUFBNkMsRUFBN0MsQ0FBUDtBQUNEOztBQUVELFNBQVMsYUFBVCxDQUF1QixRQUF2QixFQUF1RTtBQUFBOztBQUFBLG9FQUFKLEVBQUk7O0FBQUEseUJBQXBDLElBQW9DO0FBQUEsTUFBcEMsSUFBb0MsOEJBQTdCLEVBQTZCO0FBQUEsOEJBQXpCLFNBQXlCO0FBQUEsTUFBekIsU0FBeUIsbUNBQWIsSUFBYTs7QUFDckUsU0FBTyxtQkFBUSxPQUFSLENBQWdCO0FBQ3JCLFNBQUssZ0JBQWdCLFFBQWhCO0FBRGdCLCtCQUVwQixTQUZvQixFQUVSLElBRlEsd0NBR1o7QUFDUCxnQ0FBMEIsUUFBUSxHQUFSLENBQVksb0JBRC9CO0FBRVAsa0JBQWMsZ0JBRlA7QUFHUCxjQUFVO0FBSEgsR0FIWSxxQ0FRZixJQVJlLGFBQWhCLENBQVA7QUFVRDs7QUFFRCxTQUFTLGVBQVQsQ0FBeUIsS0FBekIsRUFBZ0M7QUFDOUIsVUFBUSxrQkFBa0IsS0FBbEIsRUFBeUIsUUFBekIsQ0FBUjtBQUNBLFNBQU8sc0JBQVMsS0FBVCxFQUFnQixjQUFoQixJQUNMLEtBREssR0FDTSxjQUROLFNBQ3dCLEtBRC9CO0FBRUQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgYXNzaWduLCBmaWx0ZXIsIGluY2x1ZGVzIH0gZnJvbSAnbG9kYXNoJztcbmNvbnN0IEdJVEhVQl9BUElfVVJMID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRSZXBvc2l0b3JpZXMoeyByZXBvIH0pIHtcbiAgcmV0dXJuIGdpdGh1YlJlcXVlc3QoJ3NlYXJjaC9yZXBvc2l0b3JpZXMnLCB7XG4gICAgZGF0YToge1xuICAgICAgcTogYCR7cmVwb30gaW46bmFtZSBwdXNoZWQ6Pj0yMDE2LTAxLTAxYFxuICAgIH1cbiAgfSlcbiAgLmdldCgnaXRlbXMnKVxuICAudGhlbihyZXBvcyA9PiBmaWx0ZXIocmVwb3MsIChyKSA9PiByLm93bmVyLmxvZ2luID09PSAnY2JkcicpKVxuICAvLyAubWFwKGxvYWRSZXBvSXNzdWVzKVxuICAubWFwKGxvYWRQdWxsUmVxdWVzdHMpXG4gIC5tYXAociA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHIubmFtZSxcbiAgICAgIG93bmVyOiByLm93bmVyLmxvZ2luLFxuICAgICAgaXNzdWVzOiByLmlzc3VlcyxcbiAgICAgIHB1bGxSZXF1ZXN0czogci5wdWxsUmVxdWVzdHNcbiAgICB9O1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGxvYWRQdWxsUmVxdWVzdHMocmVwbykge1xuICBsZXQgeyBwdWxsc191cmwgfSA9IHJlcG87XG4gIHJldHVybiBnaXRodWJSZXF1ZXN0KHB1bGxzX3VybClcbiAgICAubWFwKHAgPT4gKHtcbiAgICAgIGlkOiBwLmlkLFxuICAgICAgb3duZXI6IHAudXNlcixcbiAgICAgIG51bWJlcjogcC5udW1iZXIsXG4gICAgICB0aXRsZTogcC50aXRsZSxcbiAgICAgIHVybDogcC51cmwsXG4gICAgICBhc3NpZ25lZXM6IHAuYXNzaWduZWVzLFxuICAgICAgY3JlYXRlZDogcC5jcmVhdGVkX2F0LFxuICAgICAgdXBkYXRlZDogcC51cGRhdGVkX2F0XG4gICAgfSkpXG4gICAgLnRoZW4ocHVsbHMgPT4gYXNzaWduKHt9LCByZXBvLCB7IFsncHVsbFJlcXVlc3RzJ106IHB1bGxzIH0pKVxuICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gbG9hZFJlcG9Jc3N1ZXMocmVwbykge1xuICBsZXQgeyBpc3N1ZXNfdXJsIH0gPSByZXBvO1xuICByZXR1cm4gZ2l0aHViUmVxdWVzdChpc3N1ZXNfdXJsKVxuICAgIC5tYXAoaSA9PiAoeyBpZDogaS5pZCwgbnVtYmVyOiBpLm51bWJlciwgdGl0bGU6IGkudGl0bGUsIHVybDogaS51cmwsIGFzc2lnbmVlczogaS5hc3NpZ25lZXMgfSkpXG4gICAgLnRoZW4oaXNzdWVzID0+IGFzc2lnbih7fSwgcmVwbywgeyBpc3N1ZXMgfSkpXG4gICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgIHRocm93IGVycjtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiByZW1vdmVQbGFjZWhvbGRlcih1cmwsIHBsYWNlaG9sZGVyKSB7XG4gIHJldHVybiB1cmwucmVwbGFjZShuZXcgUmVnRXhwKGB7LyR7cGxhY2Vob2xkZXJ9fWApLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGdpdGh1YlJlcXVlc3QoZW5kcG9pbnQsIHsgZGF0YSA9IHt9LCBkYXRhRmllbGQgPSAncXMnIH0gPSB7fSkge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcXVlc3Qoe1xuICAgIHVybDogcHJlcEVuZHBvaW50VXJsKGVuZHBvaW50KSxcbiAgICBbZGF0YUZpZWxkXTogZGF0YSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQXV0aG9yaXphdGlvbic6IGB0b2tlbiAke3Byb2Nlc3MuZW52LkdIX05PVElGWV9BVVRIX1RPS0VOfWAsXG4gICAgICAnVXNlci1BZ2VudCc6ICdjYmF4L2doLW5vdGlmeScsXG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIuY2VyYmVydXMtcHJldmlldytqc29uJ1xuICAgIH0sXG4gICAganNvbjogdHJ1ZVxuICB9KSlcbn1cblxuZnVuY3Rpb24gcHJlcEVuZHBvaW50VXJsKHVybEluKSB7XG4gIHVybEluID0gcmVtb3ZlUGxhY2Vob2xkZXIodXJsSW4sICdudW1iZXInKTtcbiAgcmV0dXJuIGluY2x1ZGVzKHVybEluLCBHSVRIVUJfQVBJX1VSTCkgP1xuICAgIHVybEluIDogYCR7R0lUSFVCX0FQSV9VUkx9LyR7dXJsSW59YDtcbn0iXX0=
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

  return githubRequest(pulls_url).map(loadPRComments).map(function (p) {
    return {
      id: p.id,
      owner: p.user,
      number: p.number,
      title: p.title,
      url: p.url,
      assignees: p.assignees,
      created: p.created_at,
      updated: p.updated_at,
      comments: p.comments
    };
  }).then(function (pulls) {
    return (0, _lodash.assign)({}, repo, _defineProperty({}, 'pullRequests', pulls));
  }).catch(function (err) {
    console.error(err);
    throw err;
  });
}

function loadPRComments(pr) {
  var comments_url = pr.comments_url;

  return githubRequest(comments_url).then(function (comments) {
    return (0, _lodash.assign)({}, pr, { comments: comments });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXRyaWV2ZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFLd0IsZTs7QUFMeEI7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFDQSxJQUFNLGlCQUFpQix3QkFBdkI7O0FBRWUsU0FBUyxlQUFULE9BQW1DO0FBQUEsTUFBUixJQUFRLFFBQVIsSUFBUTs7QUFDaEQsU0FBTyxjQUFjLHFCQUFkLEVBQXFDO0FBQzFDLFVBQU07QUFDSixTQUFNLElBQU47QUFESTtBQURvQyxHQUFyQyxFQUtOLEdBTE0sQ0FLRixPQUxFLEVBTU4sSUFOTSxDQU1EO0FBQUEsV0FBUyxvQkFBTyxLQUFQLEVBQWMsVUFBQyxDQUFEO0FBQUEsYUFBTyxFQUFFLEtBQUYsQ0FBUSxLQUFSLEtBQWtCLE1BQXpCO0FBQUEsS0FBZCxDQUFUO0FBQUEsR0FOQzs7QUFBQSxHQVFOLEdBUk0sQ0FRRixnQkFSRSxFQVNOLEdBVE0sQ0FTRixhQUFLO0FBQ1IsV0FBTztBQUNMLFlBQU0sRUFBRSxJQURIO0FBRUwsYUFBTyxFQUFFLEtBQUYsQ0FBUSxLQUZWO0FBR0wsY0FBUSxFQUFFLE1BSEw7QUFJTCxvQkFBYyxFQUFFO0FBSlgsS0FBUDtBQU1ELEdBaEJNLENBQVA7QUFpQkQ7O0FBRUQsU0FBUyxnQkFBVCxDQUEwQixJQUExQixFQUFnQztBQUFBLE1BQ3hCLFNBRHdCLEdBQ1YsSUFEVSxDQUN4QixTQUR3Qjs7QUFFOUIsU0FBTyxjQUFjLFNBQWQsRUFDSixHQURJLENBQ0EsY0FEQSxFQUVKLEdBRkksQ0FFQTtBQUFBLFdBQU07QUFDVCxVQUFJLEVBQUUsRUFERztBQUVULGFBQU8sRUFBRSxJQUZBO0FBR1QsY0FBUSxFQUFFLE1BSEQ7QUFJVCxhQUFPLEVBQUUsS0FKQTtBQUtULFdBQUssRUFBRSxHQUxFO0FBTVQsaUJBQVcsRUFBRSxTQU5KO0FBT1QsZUFBUyxFQUFFLFVBUEY7QUFRVCxlQUFTLEVBQUUsVUFSRjtBQVNULGdCQUFVLEVBQUU7QUFUSCxLQUFOO0FBQUEsR0FGQSxFQWFKLElBYkksQ0FhQztBQUFBLFdBQVMsb0JBQU8sRUFBUCxFQUFXLElBQVgsc0JBQW9CLGNBQXBCLEVBQXFDLEtBQXJDLEVBQVQ7QUFBQSxHQWJELEVBY0osS0FkSSxDQWNFLGVBQU87QUFDWixZQUFRLEtBQVIsQ0FBYyxHQUFkO0FBQ0EsVUFBTSxHQUFOO0FBQ0QsR0FqQkksQ0FBUDtBQWtCRDs7QUFFRCxTQUFTLGNBQVQsQ0FBd0IsRUFBeEIsRUFBNEI7QUFBQSxNQUNwQixZQURvQixHQUNILEVBREcsQ0FDcEIsWUFEb0I7O0FBRTFCLFNBQU8sY0FBYyxZQUFkLEVBQ0osSUFESSxDQUNDO0FBQUEsV0FBWSxvQkFBTyxFQUFQLEVBQVcsRUFBWCxFQUFlLEVBQUUsa0JBQUYsRUFBZixDQUFaO0FBQUEsR0FERCxDQUFQO0FBRUQ7O0FBRUQsU0FBUyxjQUFULENBQXdCLElBQXhCLEVBQThCO0FBQUEsTUFDdEIsVUFEc0IsR0FDUCxJQURPLENBQ3RCLFVBRHNCOztBQUU1QixTQUFPLGNBQWMsVUFBZCxFQUNKLEdBREksQ0FDQTtBQUFBLFdBQU0sRUFBRSxJQUFJLEVBQUUsRUFBUixFQUFZLFFBQVEsRUFBRSxNQUF0QixFQUE4QixPQUFPLEVBQUUsS0FBdkMsRUFBOEMsS0FBSyxFQUFFLEdBQXJELEVBQTBELFdBQVcsRUFBRSxTQUF2RSxFQUFOO0FBQUEsR0FEQSxFQUVKLElBRkksQ0FFQztBQUFBLFdBQVUsb0JBQU8sRUFBUCxFQUFXLElBQVgsRUFBaUIsRUFBRSxjQUFGLEVBQWpCLENBQVY7QUFBQSxHQUZELEVBR0osS0FISSxDQUdFLGVBQU87QUFDWixZQUFRLEtBQVIsQ0FBYyxHQUFkO0FBQ0EsVUFBTSxHQUFOO0FBQ0QsR0FOSSxDQUFQO0FBT0Q7O0FBRUQsU0FBUyxpQkFBVCxDQUEyQixHQUEzQixFQUFnQyxXQUFoQyxFQUE2QztBQUMzQyxTQUFPLElBQUksT0FBSixDQUFZLElBQUksTUFBSixRQUFnQixXQUFoQixPQUFaLEVBQTZDLEVBQTdDLENBQVA7QUFDRDs7QUFFRCxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsRUFBdUU7QUFBQTs7QUFBQSxvRUFBSixFQUFJOztBQUFBLHlCQUFwQyxJQUFvQztBQUFBLE1BQXBDLElBQW9DLDhCQUE3QixFQUE2QjtBQUFBLDhCQUF6QixTQUF5QjtBQUFBLE1BQXpCLFNBQXlCLG1DQUFiLElBQWE7O0FBQ3JFLFNBQU8sbUJBQVEsT0FBUixDQUFnQjtBQUNyQixTQUFLLGdCQUFnQixRQUFoQjtBQURnQiwrQkFFcEIsU0FGb0IsRUFFUixJQUZRLHdDQUdaO0FBQ1AsZ0NBQTBCLFFBQVEsR0FBUixDQUFZLG9CQUQvQjtBQUVQLGtCQUFjLGdCQUZQO0FBR1AsY0FBVTtBQUhILEdBSFkscUNBUWYsSUFSZSxhQUFoQixDQUFQO0FBVUQ7O0FBRUQsU0FBUyxlQUFULENBQXlCLEtBQXpCLEVBQWdDO0FBQzlCLFVBQVEsa0JBQWtCLEtBQWxCLEVBQXlCLFFBQXpCLENBQVI7QUFDQSxTQUFPLHNCQUFTLEtBQVQsRUFBZ0IsY0FBaEIsSUFDTCxLQURLLEdBQ00sY0FETixTQUN3QixLQUQvQjtBQUVEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IGFzc2lnbiwgZmlsdGVyLCBpbmNsdWRlcyB9IGZyb20gJ2xvZGFzaCc7XG5jb25zdCBHSVRIVUJfQVBJX1VSTCA9ICdodHRwczovL2FwaS5naXRodWIuY29tJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UmVwb3NpdG9yaWVzKHsgcmVwbyB9KSB7XG4gIHJldHVybiBnaXRodWJSZXF1ZXN0KCdzZWFyY2gvcmVwb3NpdG9yaWVzJywge1xuICAgIGRhdGE6IHtcbiAgICAgIHE6IGAke3JlcG99IGluOm5hbWUgcHVzaGVkOj49MjAxNi0wMS0wMWBcbiAgICB9XG4gIH0pXG4gIC5nZXQoJ2l0ZW1zJylcbiAgLnRoZW4ocmVwb3MgPT4gZmlsdGVyKHJlcG9zLCAocikgPT4gci5vd25lci5sb2dpbiA9PT0gJ2NiZHInKSlcbiAgLy8gLm1hcChsb2FkUmVwb0lzc3VlcylcbiAgLm1hcChsb2FkUHVsbFJlcXVlc3RzKVxuICAubWFwKHIgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiByLm5hbWUsXG4gICAgICBvd25lcjogci5vd25lci5sb2dpbixcbiAgICAgIGlzc3Vlczogci5pc3N1ZXMsXG4gICAgICBwdWxsUmVxdWVzdHM6IHIucHVsbFJlcXVlc3RzXG4gICAgfTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBsb2FkUHVsbFJlcXVlc3RzKHJlcG8pIHtcbiAgbGV0IHsgcHVsbHNfdXJsIH0gPSByZXBvO1xuICByZXR1cm4gZ2l0aHViUmVxdWVzdChwdWxsc191cmwpXG4gICAgLm1hcChsb2FkUFJDb21tZW50cylcbiAgICAubWFwKHAgPT4gKHtcbiAgICAgIGlkOiBwLmlkLFxuICAgICAgb3duZXI6IHAudXNlcixcbiAgICAgIG51bWJlcjogcC5udW1iZXIsXG4gICAgICB0aXRsZTogcC50aXRsZSxcbiAgICAgIHVybDogcC51cmwsXG4gICAgICBhc3NpZ25lZXM6IHAuYXNzaWduZWVzLFxuICAgICAgY3JlYXRlZDogcC5jcmVhdGVkX2F0LFxuICAgICAgdXBkYXRlZDogcC51cGRhdGVkX2F0LFxuICAgICAgY29tbWVudHM6IHAuY29tbWVudHNcbiAgICB9KSlcbiAgICAudGhlbihwdWxscyA9PiBhc3NpZ24oe30sIHJlcG8sIHsgWydwdWxsUmVxdWVzdHMnXTogcHVsbHMgfSkpXG4gICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgIHRocm93IGVycjtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBsb2FkUFJDb21tZW50cyhwcikge1xuICBsZXQgeyBjb21tZW50c191cmwgfSA9IHByO1xuICByZXR1cm4gZ2l0aHViUmVxdWVzdChjb21tZW50c191cmwpXG4gICAgLnRoZW4oY29tbWVudHMgPT4gYXNzaWduKHt9LCBwciwgeyBjb21tZW50cyB9KSlcbn1cblxuZnVuY3Rpb24gbG9hZFJlcG9Jc3N1ZXMocmVwbykge1xuICBsZXQgeyBpc3N1ZXNfdXJsIH0gPSByZXBvO1xuICByZXR1cm4gZ2l0aHViUmVxdWVzdChpc3N1ZXNfdXJsKVxuICAgIC5tYXAoaSA9PiAoeyBpZDogaS5pZCwgbnVtYmVyOiBpLm51bWJlciwgdGl0bGU6IGkudGl0bGUsIHVybDogaS51cmwsIGFzc2lnbmVlczogaS5hc3NpZ25lZXMgfSkpXG4gICAgLnRoZW4oaXNzdWVzID0+IGFzc2lnbih7fSwgcmVwbywgeyBpc3N1ZXMgfSkpXG4gICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgIHRocm93IGVycjtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiByZW1vdmVQbGFjZWhvbGRlcih1cmwsIHBsYWNlaG9sZGVyKSB7XG4gIHJldHVybiB1cmwucmVwbGFjZShuZXcgUmVnRXhwKGB7LyR7cGxhY2Vob2xkZXJ9fWApLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGdpdGh1YlJlcXVlc3QoZW5kcG9pbnQsIHsgZGF0YSA9IHt9LCBkYXRhRmllbGQgPSAncXMnIH0gPSB7fSkge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcXVlc3Qoe1xuICAgIHVybDogcHJlcEVuZHBvaW50VXJsKGVuZHBvaW50KSxcbiAgICBbZGF0YUZpZWxkXTogZGF0YSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQXV0aG9yaXphdGlvbic6IGB0b2tlbiAke3Byb2Nlc3MuZW52LkdIX05PVElGWV9BVVRIX1RPS0VOfWAsXG4gICAgICAnVXNlci1BZ2VudCc6ICdjYmF4L2doLW5vdGlmeScsXG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIuY2VyYmVydXMtcHJldmlldytqc29uJ1xuICAgIH0sXG4gICAganNvbjogdHJ1ZVxuICB9KSlcbn1cblxuZnVuY3Rpb24gcHJlcEVuZHBvaW50VXJsKHVybEluKSB7XG4gIHVybEluID0gcmVtb3ZlUGxhY2Vob2xkZXIodXJsSW4sICdudW1iZXInKTtcbiAgcmV0dXJuIGluY2x1ZGVzKHVybEluLCBHSVRIVUJfQVBJX1VSTCkgP1xuICAgIHVybEluIDogYCR7R0lUSFVCX0FQSV9VUkx9LyR7dXJsSW59YDtcbn0iXX0=
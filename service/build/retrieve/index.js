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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXRyaWV2ZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFLd0IsZTs7QUFMeEI7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFDQSxJQUFNLGlCQUFpQix3QkFBdkI7O0FBRWUsU0FBUyxlQUFULE9BQW1DO0FBQUEsTUFBUixJQUFRLFFBQVIsSUFBUTs7QUFDaEQsU0FBTyxjQUFjLHFCQUFkLEVBQXFDO0FBQzFDLFVBQU07QUFDSixTQUFNLElBQU47QUFESTtBQURvQyxHQUFyQyxFQUtOLEdBTE0sQ0FLRixPQUxFLEVBTU4sSUFOTSxDQU1EO0FBQUEsV0FBUyxvQkFBTyxLQUFQLEVBQWMsVUFBQyxDQUFEO0FBQUEsYUFBTyxFQUFFLEtBQUYsQ0FBUSxLQUFSLEtBQWtCLE1BQXpCO0FBQUEsS0FBZCxDQUFUO0FBQUEsR0FOQztBQU9QO0FBUE8sR0FRTixHQVJNLENBUUYsZ0JBUkUsRUFTTixHQVRNLENBU0YsYUFBSztBQUNSLFdBQU87QUFDTCxZQUFNLEVBQUUsSUFESDtBQUVMLGFBQU8sRUFBRSxLQUFGLENBQVEsS0FGVjtBQUdMLGNBQVEsRUFBRSxNQUhMO0FBSUwsb0JBQWMsRUFBRTtBQUpYLEtBQVA7QUFNRCxHQWhCTSxDQUFQO0FBaUJEOztBQUVELFNBQVMsZ0JBQVQsQ0FBMEIsSUFBMUIsRUFBZ0M7QUFBQSxNQUN4QixTQUR3QixHQUNWLElBRFUsQ0FDeEIsU0FEd0I7O0FBRTlCLFNBQU8sY0FBYyxTQUFkLEVBQ0osR0FESSxDQUNBLGNBREEsRUFFSixHQUZJLENBRUE7QUFBQSxXQUFNO0FBQ1QsVUFBSSxFQUFFLEVBREc7QUFFVCxhQUFPLEVBQUUsSUFGQTtBQUdULGNBQVEsRUFBRSxNQUhEO0FBSVQsYUFBTyxFQUFFLEtBSkE7QUFLVCxXQUFLLEVBQUUsR0FMRTtBQU1ULGlCQUFXLEVBQUUsU0FOSjtBQU9ULGVBQVMsRUFBRSxVQVBGO0FBUVQsZUFBUyxFQUFFLFVBUkY7QUFTVCxnQkFBVSxFQUFFO0FBVEgsS0FBTjtBQUFBLEdBRkEsRUFhSixJQWJJLENBYUM7QUFBQSxXQUFTLG9CQUFPLEVBQVAsRUFBVyxJQUFYLHNCQUFvQixjQUFwQixFQUFxQyxLQUFyQyxFQUFUO0FBQUEsR0FiRCxFQWNKLEtBZEksQ0FjRSxlQUFPO0FBQ1osWUFBUSxLQUFSLENBQWMsR0FBZDtBQUNBLFVBQU0sR0FBTjtBQUNELEdBakJJLENBQVA7QUFrQkQ7O0FBRUQsU0FBUyxjQUFULENBQXdCLEVBQXhCLEVBQTRCO0FBQUEsTUFDcEIsWUFEb0IsR0FDSCxFQURHLENBQ3BCLFlBRG9COztBQUUxQixTQUFPLGNBQWMsWUFBZCxFQUNKLElBREksQ0FDQztBQUFBLFdBQVksb0JBQU8sRUFBUCxFQUFXLEVBQVgsRUFBZSxFQUFFLGtCQUFGLEVBQWYsQ0FBWjtBQUFBLEdBREQsQ0FBUDtBQUVEOztBQUVELFNBQVMsY0FBVCxDQUF3QixJQUF4QixFQUE4QjtBQUFBLE1BQ3RCLFVBRHNCLEdBQ1AsSUFETyxDQUN0QixVQURzQjs7QUFFNUIsU0FBTyxjQUFjLFVBQWQsRUFDSixHQURJLENBQ0E7QUFBQSxXQUFNLEVBQUUsSUFBSSxFQUFFLEVBQVIsRUFBWSxRQUFRLEVBQUUsTUFBdEIsRUFBOEIsT0FBTyxFQUFFLEtBQXZDLEVBQThDLEtBQUssRUFBRSxHQUFyRCxFQUEwRCxXQUFXLEVBQUUsU0FBdkUsRUFBTjtBQUFBLEdBREEsRUFFSixJQUZJLENBRUM7QUFBQSxXQUFVLG9CQUFPLEVBQVAsRUFBVyxJQUFYLEVBQWlCLEVBQUUsY0FBRixFQUFqQixDQUFWO0FBQUEsR0FGRCxFQUdKLEtBSEksQ0FHRSxlQUFPO0FBQ1osWUFBUSxLQUFSLENBQWMsR0FBZDtBQUNBLFVBQU0sR0FBTjtBQUNELEdBTkksQ0FBUDtBQU9EOztBQUVELFNBQVMsaUJBQVQsQ0FBMkIsR0FBM0IsRUFBZ0MsV0FBaEMsRUFBNkM7QUFDM0MsU0FBTyxJQUFJLE9BQUosQ0FBWSxJQUFJLE1BQUosUUFBZ0IsV0FBaEIsT0FBWixFQUE2QyxFQUE3QyxDQUFQO0FBQ0Q7O0FBRUQsU0FBUyxhQUFULENBQXVCLFFBQXZCLEVBQXVFO0FBQUE7O0FBQUEsb0VBQUosRUFBSTs7QUFBQSx5QkFBcEMsSUFBb0M7QUFBQSxNQUFwQyxJQUFvQyw4QkFBN0IsRUFBNkI7QUFBQSw4QkFBekIsU0FBeUI7QUFBQSxNQUF6QixTQUF5QixtQ0FBYixJQUFhOztBQUNyRSxTQUFPLG1CQUFRLE9BQVIsQ0FBZ0I7QUFDckIsU0FBSyxnQkFBZ0IsUUFBaEI7QUFEZ0IsK0JBRXBCLFNBRm9CLEVBRVIsSUFGUSx3Q0FHWjtBQUNQLGdDQUEwQixRQUFRLEdBQVIsQ0FBWSxvQkFEL0I7QUFFUCxrQkFBYyxnQkFGUDtBQUdQLGNBQVU7QUFISCxHQUhZLHFDQVFmLElBUmUsYUFBaEIsQ0FBUDtBQVVEOztBQUVELFNBQVMsZUFBVCxDQUF5QixLQUF6QixFQUFnQztBQUM5QixVQUFRLGtCQUFrQixLQUFsQixFQUF5QixRQUF6QixDQUFSO0FBQ0EsU0FBTyxzQkFBUyxLQUFULEVBQWdCLGNBQWhCLElBQ0wsS0FESyxHQUNNLGNBRE4sU0FDd0IsS0FEL0I7QUFFRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QtcHJvbWlzZSc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBhc3NpZ24sIGZpbHRlciwgaW5jbHVkZXMgfSBmcm9tICdsb2Rhc2gnO1xuY29uc3QgR0lUSFVCX0FQSV9VUkwgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFJlcG9zaXRvcmllcyh7IHJlcG8gfSkge1xuICByZXR1cm4gZ2l0aHViUmVxdWVzdCgnc2VhcmNoL3JlcG9zaXRvcmllcycsIHtcbiAgICBkYXRhOiB7XG4gICAgICBxOiBgJHtyZXBvfSBpbjpuYW1lIHB1c2hlZDo+PTIwMTYtMDEtMDFgXG4gICAgfVxuICB9KVxuICAuZ2V0KCdpdGVtcycpXG4gIC50aGVuKHJlcG9zID0+IGZpbHRlcihyZXBvcywgKHIpID0+IHIub3duZXIubG9naW4gPT09ICdjYmRyJykpXG4gIC8vIC5tYXAobG9hZFJlcG9Jc3N1ZXMpXG4gIC5tYXAobG9hZFB1bGxSZXF1ZXN0cylcbiAgLm1hcChyID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogci5uYW1lLFxuICAgICAgb3duZXI6IHIub3duZXIubG9naW4sXG4gICAgICBpc3N1ZXM6IHIuaXNzdWVzLFxuICAgICAgcHVsbFJlcXVlc3RzOiByLnB1bGxSZXF1ZXN0c1xuICAgIH07XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gbG9hZFB1bGxSZXF1ZXN0cyhyZXBvKSB7XG4gIGxldCB7IHB1bGxzX3VybCB9ID0gcmVwbztcbiAgcmV0dXJuIGdpdGh1YlJlcXVlc3QocHVsbHNfdXJsKVxuICAgIC5tYXAobG9hZFBSQ29tbWVudHMpXG4gICAgLm1hcChwID0+ICh7XG4gICAgICBpZDogcC5pZCxcbiAgICAgIG93bmVyOiBwLnVzZXIsXG4gICAgICBudW1iZXI6IHAubnVtYmVyLFxuICAgICAgdGl0bGU6IHAudGl0bGUsXG4gICAgICB1cmw6IHAudXJsLFxuICAgICAgYXNzaWduZWVzOiBwLmFzc2lnbmVlcyxcbiAgICAgIGNyZWF0ZWQ6IHAuY3JlYXRlZF9hdCxcbiAgICAgIHVwZGF0ZWQ6IHAudXBkYXRlZF9hdCxcbiAgICAgIGNvbW1lbnRzOiBwLmNvbW1lbnRzXG4gICAgfSkpXG4gICAgLnRoZW4ocHVsbHMgPT4gYXNzaWduKHt9LCByZXBvLCB7IFsncHVsbFJlcXVlc3RzJ106IHB1bGxzIH0pKVxuICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gbG9hZFBSQ29tbWVudHMocHIpIHtcbiAgbGV0IHsgY29tbWVudHNfdXJsIH0gPSBwcjtcbiAgcmV0dXJuIGdpdGh1YlJlcXVlc3QoY29tbWVudHNfdXJsKVxuICAgIC50aGVuKGNvbW1lbnRzID0+IGFzc2lnbih7fSwgcHIsIHsgY29tbWVudHMgfSkpXG59XG5cbmZ1bmN0aW9uIGxvYWRSZXBvSXNzdWVzKHJlcG8pIHtcbiAgbGV0IHsgaXNzdWVzX3VybCB9ID0gcmVwbztcbiAgcmV0dXJuIGdpdGh1YlJlcXVlc3QoaXNzdWVzX3VybClcbiAgICAubWFwKGkgPT4gKHsgaWQ6IGkuaWQsIG51bWJlcjogaS5udW1iZXIsIHRpdGxlOiBpLnRpdGxlLCB1cmw6IGkudXJsLCBhc3NpZ25lZXM6IGkuYXNzaWduZWVzIH0pKVxuICAgIC50aGVuKGlzc3VlcyA9PiBhc3NpZ24oe30sIHJlcG8sIHsgaXNzdWVzIH0pKVxuICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcmVtb3ZlUGxhY2Vob2xkZXIodXJsLCBwbGFjZWhvbGRlcikge1xuICByZXR1cm4gdXJsLnJlcGxhY2UobmV3IFJlZ0V4cChgey8ke3BsYWNlaG9sZGVyfX1gKSwgJycpO1xufVxuXG5mdW5jdGlvbiBnaXRodWJSZXF1ZXN0KGVuZHBvaW50LCB7IGRhdGEgPSB7fSwgZGF0YUZpZWxkID0gJ3FzJyB9ID0ge30pIHtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXF1ZXN0KHtcbiAgICB1cmw6IHByZXBFbmRwb2ludFVybChlbmRwb2ludCksXG4gICAgW2RhdGFGaWVsZF06IGRhdGEsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0F1dGhvcml6YXRpb24nOiBgdG9rZW4gJHtwcm9jZXNzLmVudi5HSF9OT1RJRllfQVVUSF9UT0tFTn1gLFxuICAgICAgJ1VzZXItQWdlbnQnOiAnY2JheC9naC1ub3RpZnknLFxuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi92bmQuZ2l0aHViLmNlcmJlcnVzLXByZXZpZXcranNvbidcbiAgICB9LFxuICAgIGpzb246IHRydWVcbiAgfSkpXG59XG5cbmZ1bmN0aW9uIHByZXBFbmRwb2ludFVybCh1cmxJbikge1xuICB1cmxJbiA9IHJlbW92ZVBsYWNlaG9sZGVyKHVybEluLCAnbnVtYmVyJyk7XG4gIHJldHVybiBpbmNsdWRlcyh1cmxJbiwgR0lUSFVCX0FQSV9VUkwpID9cbiAgICB1cmxJbiA6IGAke0dJVEhVQl9BUElfVVJMfS8ke3VybElufWA7XG59Il19
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXRyZWl2ZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFLd0IsZTs7QUFMeEI7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFDQSxJQUFNLGlCQUFpQix3QkFBdkI7O0FBRWUsU0FBUyxlQUFULE9BQW1DO0FBQUEsTUFBUixJQUFRLFFBQVIsSUFBUTs7QUFDaEQsU0FBTyxjQUFjLHFCQUFkLEVBQXFDO0FBQzFDLFVBQU07QUFDSixTQUFNLElBQU47QUFESTtBQURvQyxHQUFyQyxFQUtOLEdBTE0sQ0FLRixPQUxFLEVBTU4sSUFOTSxDQU1EO0FBQUEsV0FBUyxvQkFBTyxLQUFQLEVBQWMsVUFBQyxDQUFEO0FBQUEsYUFBTyxFQUFFLEtBQUYsQ0FBUSxLQUFSLEtBQWtCLE1BQXpCO0FBQUEsS0FBZCxDQUFUO0FBQUEsR0FOQztBQU9QO0FBUE8sR0FRTixHQVJNLENBUUYsZ0JBUkUsRUFTTixHQVRNLENBU0YsYUFBSztBQUNSLFdBQU87QUFDTCxZQUFNLEVBQUUsSUFESDtBQUVMLGFBQU8sRUFBRSxLQUFGLENBQVEsS0FGVjtBQUdMLGNBQVEsRUFBRSxNQUhMO0FBSUwsb0JBQWMsRUFBRTtBQUpYLEtBQVA7QUFNRCxHQWhCTSxDQUFQO0FBaUJEOztBQUVELFNBQVMsZ0JBQVQsQ0FBMEIsSUFBMUIsRUFBZ0M7QUFBQSxNQUN4QixTQUR3QixHQUNWLElBRFUsQ0FDeEIsU0FEd0I7O0FBRTlCLFNBQU8sY0FBYyxTQUFkLEVBQ0osR0FESSxDQUNBO0FBQUEsV0FBTTtBQUNULFVBQUksRUFBRSxFQURHO0FBRVQsYUFBTyxFQUFFLElBRkE7QUFHVCxjQUFRLEVBQUUsTUFIRDtBQUlULGFBQU8sRUFBRSxLQUpBO0FBS1QsV0FBSyxFQUFFLEdBTEU7QUFNVCxpQkFBVyxFQUFFLFNBTko7QUFPVCxlQUFTLEVBQUUsVUFQRjtBQVFULGVBQVMsRUFBRTtBQVJGLEtBQU47QUFBQSxHQURBLEVBV0osSUFYSSxDQVdDO0FBQUEsV0FBUyxvQkFBTyxFQUFQLEVBQVcsSUFBWCxzQkFBb0IsY0FBcEIsRUFBcUMsS0FBckMsRUFBVDtBQUFBLEdBWEQsRUFZSixLQVpJLENBWUUsZUFBTztBQUNaLFlBQVEsS0FBUixDQUFjLEdBQWQ7QUFDQSxVQUFNLEdBQU47QUFDRCxHQWZJLENBQVA7QUFnQkQ7O0FBRUQsU0FBUyxjQUFULENBQXdCLElBQXhCLEVBQThCO0FBQUEsTUFDdEIsVUFEc0IsR0FDUCxJQURPLENBQ3RCLFVBRHNCOztBQUU1QixTQUFPLGNBQWMsVUFBZCxFQUNKLEdBREksQ0FDQTtBQUFBLFdBQU0sRUFBRSxJQUFJLEVBQUUsRUFBUixFQUFZLFFBQVEsRUFBRSxNQUF0QixFQUE4QixPQUFPLEVBQUUsS0FBdkMsRUFBOEMsS0FBSyxFQUFFLEdBQXJELEVBQTBELFdBQVcsRUFBRSxTQUF2RSxFQUFOO0FBQUEsR0FEQSxFQUVKLElBRkksQ0FFQztBQUFBLFdBQVUsb0JBQU8sRUFBUCxFQUFXLElBQVgsRUFBaUIsRUFBRSxjQUFGLEVBQWpCLENBQVY7QUFBQSxHQUZELEVBR0osS0FISSxDQUdFLGVBQU87QUFDWixZQUFRLEtBQVIsQ0FBYyxHQUFkO0FBQ0EsVUFBTSxHQUFOO0FBQ0QsR0FOSSxDQUFQO0FBT0Q7O0FBRUQsU0FBUyxpQkFBVCxDQUEyQixHQUEzQixFQUFnQyxXQUFoQyxFQUE2QztBQUMzQyxTQUFPLElBQUksT0FBSixDQUFZLElBQUksTUFBSixRQUFnQixXQUFoQixPQUFaLEVBQTZDLEVBQTdDLENBQVA7QUFDRDs7QUFFRCxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsRUFBdUU7QUFBQTs7QUFBQSxvRUFBSixFQUFJOztBQUFBLHlCQUFwQyxJQUFvQztBQUFBLE1BQXBDLElBQW9DLDhCQUE3QixFQUE2QjtBQUFBLDhCQUF6QixTQUF5QjtBQUFBLE1BQXpCLFNBQXlCLG1DQUFiLElBQWE7O0FBQ3JFLFNBQU8sbUJBQVEsT0FBUixDQUFnQjtBQUNyQixTQUFLLGdCQUFnQixRQUFoQjtBQURnQiwrQkFFcEIsU0FGb0IsRUFFUixJQUZRLHdDQUdaO0FBQ1AsZ0NBQTBCLFFBQVEsR0FBUixDQUFZLG9CQUQvQjtBQUVQLGtCQUFjLGdCQUZQO0FBR1AsY0FBVTtBQUhILEdBSFkscUNBUWYsSUFSZSxhQUFoQixDQUFQO0FBVUQ7O0FBRUQsU0FBUyxlQUFULENBQXlCLEtBQXpCLEVBQWdDO0FBQzlCLFVBQVEsa0JBQWtCLEtBQWxCLEVBQXlCLFFBQXpCLENBQVI7QUFDQSxTQUFPLHNCQUFTLEtBQVQsRUFBZ0IsY0FBaEIsSUFDTCxLQURLLEdBQ00sY0FETixTQUN3QixLQUQvQjtBQUVEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IGFzc2lnbiwgZmlsdGVyLCBpbmNsdWRlcyB9IGZyb20gJ2xvZGFzaCc7XG5jb25zdCBHSVRIVUJfQVBJX1VSTCA9ICdodHRwczovL2FwaS5naXRodWIuY29tJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UmVwb3NpdG9yaWVzKHsgcmVwbyB9KSB7XG4gIHJldHVybiBnaXRodWJSZXF1ZXN0KCdzZWFyY2gvcmVwb3NpdG9yaWVzJywge1xuICAgIGRhdGE6IHtcbiAgICAgIHE6IGAke3JlcG99IGluOm5hbWUgcHVzaGVkOj49MjAxNi0wMS0wMWBcbiAgICB9XG4gIH0pXG4gIC5nZXQoJ2l0ZW1zJylcbiAgLnRoZW4ocmVwb3MgPT4gZmlsdGVyKHJlcG9zLCAocikgPT4gci5vd25lci5sb2dpbiA9PT0gJ2NiZHInKSlcbiAgLy8gLm1hcChsb2FkUmVwb0lzc3VlcylcbiAgLm1hcChsb2FkUHVsbFJlcXVlc3RzKVxuICAubWFwKHIgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiByLm5hbWUsXG4gICAgICBvd25lcjogci5vd25lci5sb2dpbixcbiAgICAgIGlzc3Vlczogci5pc3N1ZXMsXG4gICAgICBwdWxsUmVxdWVzdHM6IHIucHVsbFJlcXVlc3RzXG4gICAgfTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBsb2FkUHVsbFJlcXVlc3RzKHJlcG8pIHtcbiAgbGV0IHsgcHVsbHNfdXJsIH0gPSByZXBvO1xuICByZXR1cm4gZ2l0aHViUmVxdWVzdChwdWxsc191cmwpXG4gICAgLm1hcChwID0+ICh7XG4gICAgICBpZDogcC5pZCxcbiAgICAgIG93bmVyOiBwLnVzZXIsXG4gICAgICBudW1iZXI6IHAubnVtYmVyLFxuICAgICAgdGl0bGU6IHAudGl0bGUsXG4gICAgICB1cmw6IHAudXJsLFxuICAgICAgYXNzaWduZWVzOiBwLmFzc2lnbmVlcyxcbiAgICAgIGNyZWF0ZWQ6IHAuY3JlYXRlZF9hdCxcbiAgICAgIHVwZGF0ZWQ6IHAudXBkYXRlZF9hdFxuICAgIH0pKVxuICAgIC50aGVuKHB1bGxzID0+IGFzc2lnbih7fSwgcmVwbywgeyBbJ3B1bGxSZXF1ZXN0cyddOiBwdWxscyB9KSlcbiAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgdGhyb3cgZXJyO1xuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGxvYWRSZXBvSXNzdWVzKHJlcG8pIHtcbiAgbGV0IHsgaXNzdWVzX3VybCB9ID0gcmVwbztcbiAgcmV0dXJuIGdpdGh1YlJlcXVlc3QoaXNzdWVzX3VybClcbiAgICAubWFwKGkgPT4gKHsgaWQ6IGkuaWQsIG51bWJlcjogaS5udW1iZXIsIHRpdGxlOiBpLnRpdGxlLCB1cmw6IGkudXJsLCBhc3NpZ25lZXM6IGkuYXNzaWduZWVzIH0pKVxuICAgIC50aGVuKGlzc3VlcyA9PiBhc3NpZ24oe30sIHJlcG8sIHsgaXNzdWVzIH0pKVxuICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcmVtb3ZlUGxhY2Vob2xkZXIodXJsLCBwbGFjZWhvbGRlcikge1xuICByZXR1cm4gdXJsLnJlcGxhY2UobmV3IFJlZ0V4cChgey8ke3BsYWNlaG9sZGVyfX1gKSwgJycpO1xufVxuXG5mdW5jdGlvbiBnaXRodWJSZXF1ZXN0KGVuZHBvaW50LCB7IGRhdGEgPSB7fSwgZGF0YUZpZWxkID0gJ3FzJyB9ID0ge30pIHtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXF1ZXN0KHtcbiAgICB1cmw6IHByZXBFbmRwb2ludFVybChlbmRwb2ludCksXG4gICAgW2RhdGFGaWVsZF06IGRhdGEsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0F1dGhvcml6YXRpb24nOiBgdG9rZW4gJHtwcm9jZXNzLmVudi5HSF9OT1RJRllfQVVUSF9UT0tFTn1gLFxuICAgICAgJ1VzZXItQWdlbnQnOiAnY2JheC9naC1ub3RpZnknLFxuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi92bmQuZ2l0aHViLmNlcmJlcnVzLXByZXZpZXcranNvbidcbiAgICB9LFxuICAgIGpzb246IHRydWVcbiAgfSkpXG59XG5cbmZ1bmN0aW9uIHByZXBFbmRwb2ludFVybCh1cmxJbikge1xuICB1cmxJbiA9IHJlbW92ZVBsYWNlaG9sZGVyKHVybEluLCAnbnVtYmVyJyk7XG4gIHJldHVybiBpbmNsdWRlcyh1cmxJbiwgR0lUSFVCX0FQSV9VUkwpID9cbiAgICB1cmxJbiA6IGAke0dJVEhVQl9BUElfVVJMfS8ke3VybElufWA7XG59Il19
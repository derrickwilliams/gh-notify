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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQU0sTUFBTSx3QkFBWjs7QUFFQSxJQUFNLGlCQUFpQix3QkFBdkI7O0FBRUEsSUFBSSxHQUFKLENBQVEsZUFBUixFQUF5QixVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQWM7QUFDckMsa0JBQWdCLElBQUksS0FBcEIsRUFDRyxHQURILENBQ087QUFBQSxXQUFTLGFBQUcsYUFBSCxDQUFpQixnQkFBSyxTQUFMLEVBQWdCLG9CQUFoQixDQUFqQixFQUF3RCxLQUFLLFNBQUwsQ0FBZSxLQUFmLEVBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQXhELENBQVQ7QUFBQSxHQURQLEVBRUcsSUFGSCxDQUVRO0FBQUEsV0FBUyxJQUFJLElBQUosQ0FBUyxFQUFFLFlBQUYsRUFBVCxDQUFUO0FBQUEsR0FGUixFQUdHLEtBSEgsQ0FHUztBQUFBLFdBQU8sSUFBSSxNQUFKLENBQVcsR0FBWCxFQUFnQixJQUFoQixDQUFxQixFQUFFLE9BQU8sSUFBSSxRQUFKLEVBQVQsRUFBckIsQ0FBUDtBQUFBLEdBSFQ7QUFJRCxDQUxEOztBQU9BLElBQUksTUFBSixDQUFXLEtBQVgsRUFBa0I7QUFBQSxTQUFNLFFBQVEsR0FBUixDQUFZLFdBQVosRUFBeUIsS0FBekIsQ0FBTjtBQUFBLENBQWxCOztBQUVBLFNBQVMsZUFBVCxPQUFtQztBQUFBLE1BQVIsSUFBUSxRQUFSLElBQVE7O0FBQ2pDLFNBQU8sY0FBYyxxQkFBZCxFQUFxQztBQUMxQyxVQUFNO0FBQ0osU0FBTSxJQUFOO0FBREk7QUFEb0MsR0FBckMsRUFLTixHQUxNLENBS0YsT0FMRSxFQU1OLElBTk0sQ0FNRDtBQUFBLFdBQVMsb0JBQU8sS0FBUCxFQUFjLFVBQUMsQ0FBRDtBQUFBLGFBQU8sRUFBRSxLQUFGLENBQVEsS0FBUixLQUFrQixNQUF6QjtBQUFBLEtBQWQsQ0FBVDtBQUFBLEdBTkM7O0FBQUEsR0FRTixHQVJNLENBUUYsZ0JBUkUsRUFTTixHQVRNLENBU0YsYUFBSztBQUNSLFdBQU87QUFDTCxZQUFNLEVBQUUsSUFESDtBQUVMLGFBQU8sRUFBRSxLQUFGLENBQVEsS0FGVjtBQUdMLGNBQVEsRUFBRSxNQUhMO0FBSUwsb0JBQWMsRUFBRTtBQUpYLEtBQVA7QUFNRCxHQWhCTSxDQUFQO0FBaUJEOztBQUVELFNBQVMsZ0JBQVQsQ0FBMEIsSUFBMUIsRUFBZ0M7QUFBQSxNQUN4QixTQUR3QixHQUNWLElBRFUsQ0FDeEIsU0FEd0I7O0FBRTlCLFNBQU8sY0FBYyxTQUFkLEVBQ0osR0FESSxDQUNBO0FBQUEsV0FBTTtBQUNULFVBQUksRUFBRSxFQURHO0FBRVQsYUFBTyxFQUFFLElBRkE7QUFHVCxjQUFRLEVBQUUsTUFIRDtBQUlULGFBQU8sRUFBRSxLQUpBO0FBS1QsV0FBSyxFQUFFLEdBTEU7QUFNVCxpQkFBVyxFQUFFLFNBTko7QUFPVCxlQUFTLEVBQUUsVUFQRjtBQVFULGVBQVMsRUFBRTtBQVJGLEtBQU47QUFBQSxHQURBLEVBV0osSUFYSSxDQVdDO0FBQUEsV0FBUyxvQkFBTyxFQUFQLEVBQVcsSUFBWCxzQkFBb0IsY0FBcEIsRUFBcUMsS0FBckMsRUFBVDtBQUFBLEdBWEQsRUFZSixLQVpJLENBWUUsZUFBTztBQUNaLFlBQVEsS0FBUixDQUFjLEdBQWQ7QUFDQSxVQUFNLEdBQU47QUFDRCxHQWZJLENBQVA7QUFnQkQ7O0FBRUQsU0FBUyxjQUFULENBQXdCLElBQXhCLEVBQThCO0FBQUEsTUFDdEIsVUFEc0IsR0FDUCxJQURPLENBQ3RCLFVBRHNCOztBQUU1QixTQUFPLGNBQWMsVUFBZCxFQUNKLEdBREksQ0FDQTtBQUFBLFdBQU0sRUFBRSxJQUFJLEVBQUUsRUFBUixFQUFZLFFBQVEsRUFBRSxNQUF0QixFQUE4QixPQUFPLEVBQUUsS0FBdkMsRUFBOEMsS0FBSyxFQUFFLEdBQXJELEVBQTBELFdBQVcsRUFBRSxTQUF2RSxFQUFOO0FBQUEsR0FEQSxFQUVKLElBRkksQ0FFQztBQUFBLFdBQVUsb0JBQU8sRUFBUCxFQUFXLElBQVgsRUFBaUIsRUFBRSxjQUFGLEVBQWpCLENBQVY7QUFBQSxHQUZELEVBR0osS0FISSxDQUdFLGVBQU87QUFDWixZQUFRLEtBQVIsQ0FBYyxHQUFkO0FBQ0EsVUFBTSxHQUFOO0FBQ0QsR0FOSSxDQUFQO0FBT0Q7O0FBRUQsU0FBUyxpQkFBVCxDQUEyQixHQUEzQixFQUFnQyxXQUFoQyxFQUE2QztBQUMzQyxTQUFPLElBQUksT0FBSixDQUFZLElBQUksTUFBSixRQUFnQixXQUFoQixPQUFaLEVBQTZDLEVBQTdDLENBQVA7QUFDRDs7QUFFRCxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsRUFBdUU7QUFBQTs7QUFBQSxvRUFBSixFQUFJOztBQUFBLHlCQUFwQyxJQUFvQztBQUFBLE1BQXBDLElBQW9DLDhCQUE3QixFQUE2QjtBQUFBLDhCQUF6QixTQUF5QjtBQUFBLE1BQXpCLFNBQXlCLG1DQUFiLElBQWE7O0FBQ3JFLFNBQU8sbUJBQVEsT0FBUixDQUFnQjtBQUNyQixTQUFLLGdCQUFnQixRQUFoQjtBQURnQiwrQkFFcEIsU0FGb0IsRUFFUixJQUZRLHdDQUdaO0FBQ1AsZ0NBQTBCLFFBQVEsR0FBUixDQUFZLG9CQUQvQjtBQUVQLGtCQUFjLGdCQUZQO0FBR1AsY0FBVTtBQUhILEdBSFkscUNBUWYsSUFSZSxhQUFoQixDQUFQO0FBVUQ7O0FBRUQsU0FBUyxlQUFULENBQXlCLEtBQXpCLEVBQWdDO0FBQzlCLFVBQVEsa0JBQWtCLEtBQWxCLEVBQXlCLFFBQXpCLENBQVI7QUFDQSxTQUFPLHNCQUFTLEtBQVQsRUFBZ0IsY0FBaEIsSUFDTCxLQURLLEdBQ00sY0FETixTQUN3QixLQUQvQjtBQUVEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgYXNzaWduLCBmaWx0ZXIsIGluY2x1ZGVzIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuY29uc3QgR0lUSFVCX0FQSV9VUkwgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSc7XG5cbmFwcC5nZXQoJy9naXRodWIvcmVwb3MnLCAocmVxLCByZXMpID0+IHtcbiAgZ2V0UmVwb3NpdG9yaWVzKHJlcS5xdWVyeSlcbiAgICAudGFwKHJlcG9zID0+IGZzLndyaXRlRmlsZVN5bmMoam9pbihfX2Rpcm5hbWUsICdmdWxsX3Jlc3BvbnNlLmpzb24nKSwgSlNPTi5zdHJpbmdpZnkocmVwb3MsIG51bGwsIDIpKSlcbiAgICAudGhlbihyZXBvcyA9PiByZXMuanNvbih7IHJlcG9zIH0pKVxuICAgIC5jYXRjaChlcnIgPT4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogZXJyLnRvU3RyaW5nKCkgfSkpXG59KVxuXG5hcHAubGlzdGVuKDEyMTIxLCAoKSA9PiBjb25zb2xlLmxvZygnbGlzdGVuaW5nJywgMTIxMjEpKTtcblxuZnVuY3Rpb24gZ2V0UmVwb3NpdG9yaWVzKHsgcmVwbyB9KSB7XG4gIHJldHVybiBnaXRodWJSZXF1ZXN0KCdzZWFyY2gvcmVwb3NpdG9yaWVzJywge1xuICAgIGRhdGE6IHtcbiAgICAgIHE6IGAke3JlcG99IGluOm5hbWUgcHVzaGVkOj49MjAxNi0wMS0wMWBcbiAgICB9XG4gIH0pXG4gIC5nZXQoJ2l0ZW1zJylcbiAgLnRoZW4ocmVwb3MgPT4gZmlsdGVyKHJlcG9zLCAocikgPT4gci5vd25lci5sb2dpbiA9PT0gJ2NiZHInKSlcbiAgLy8gLm1hcChsb2FkUmVwb0lzc3VlcylcbiAgLm1hcChsb2FkUHVsbFJlcXVlc3RzKVxuICAubWFwKHIgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiByLm5hbWUsXG4gICAgICBvd25lcjogci5vd25lci5sb2dpbixcbiAgICAgIGlzc3Vlczogci5pc3N1ZXMsXG4gICAgICBwdWxsUmVxdWVzdHM6IHIucHVsbFJlcXVlc3RzXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRQdWxsUmVxdWVzdHMocmVwbykge1xuICBsZXQgeyBwdWxsc191cmwgfSA9IHJlcG87XG4gIHJldHVybiBnaXRodWJSZXF1ZXN0KHB1bGxzX3VybClcbiAgICAubWFwKHAgPT4gKHtcbiAgICAgIGlkOiBwLmlkLFxuICAgICAgb3duZXI6IHAudXNlcixcbiAgICAgIG51bWJlcjogcC5udW1iZXIsXG4gICAgICB0aXRsZTogcC50aXRsZSxcbiAgICAgIHVybDogcC51cmwsXG4gICAgICBhc3NpZ25lZXM6IHAuYXNzaWduZWVzLFxuICAgICAgY3JlYXRlZDogcC5jcmVhdGVkX2F0LFxuICAgICAgdXBkYXRlZDogcC51cGRhdGVkX2F0XG4gICAgfSkpXG4gICAgLnRoZW4ocHVsbHMgPT4gYXNzaWduKHt9LCByZXBvLCB7IFsncHVsbFJlcXVlc3RzJ106IHB1bGxzIH0pKVxuICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gbG9hZFJlcG9Jc3N1ZXMocmVwbykge1xuICBsZXQgeyBpc3N1ZXNfdXJsIH0gPSByZXBvO1xuICByZXR1cm4gZ2l0aHViUmVxdWVzdChpc3N1ZXNfdXJsKVxuICAgIC5tYXAoaSA9PiAoeyBpZDogaS5pZCwgbnVtYmVyOiBpLm51bWJlciwgdGl0bGU6IGkudGl0bGUsIHVybDogaS51cmwsIGFzc2lnbmVlczogaS5hc3NpZ25lZXMgfSkpXG4gICAgLnRoZW4oaXNzdWVzID0+IGFzc2lnbih7fSwgcmVwbywgeyBpc3N1ZXMgfSkpXG4gICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgIHRocm93IGVycjtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiByZW1vdmVQbGFjZWhvbGRlcih1cmwsIHBsYWNlaG9sZGVyKSB7XG4gIHJldHVybiB1cmwucmVwbGFjZShuZXcgUmVnRXhwKGB7LyR7cGxhY2Vob2xkZXJ9fWApLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGdpdGh1YlJlcXVlc3QoZW5kcG9pbnQsIHsgZGF0YSA9IHt9LCBkYXRhRmllbGQgPSAncXMnIH0gPSB7fSkge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcXVlc3Qoe1xuICAgIHVybDogcHJlcEVuZHBvaW50VXJsKGVuZHBvaW50KSxcbiAgICBbZGF0YUZpZWxkXTogZGF0YSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQXV0aG9yaXphdGlvbic6IGB0b2tlbiAke3Byb2Nlc3MuZW52LkdIX05PVElGWV9BVVRIX1RPS0VOfWAsXG4gICAgICAnVXNlci1BZ2VudCc6ICdjYmF4L2doLW5vdGlmeScsXG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIuY2VyYmVydXMtcHJldmlldytqc29uJ1xuICAgIH0sXG4gICAganNvbjogdHJ1ZVxuICB9KSlcbn1cblxuZnVuY3Rpb24gcHJlcEVuZHBvaW50VXJsKHVybEluKSB7XG4gIHVybEluID0gcmVtb3ZlUGxhY2Vob2xkZXIodXJsSW4sICdudW1iZXInKTtcbiAgcmV0dXJuIGluY2x1ZGVzKHVybEluLCBHSVRIVUJfQVBJX1VSTCkgP1xuICAgIHVybEluIDogYCR7R0lUSFVCX0FQSV9VUkx9LyR7dXJsSW59YDtcbn0iXX0=
'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _hipchatter = require('hipchatter');

var _hipchatter2 = _interopRequireDefault(_hipchatter);

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

app.post('/hipchat/notify', function (req, res) {
  notifyHipchat(req.body).catch(function (err) {
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

function notifyHipchat(params) {
  console.log('params:', params);

  var hipchatter = new _hipchatter2.default('X7qQU0XPSjNn86rj6eLcZEX4tQ1rm6hojP7tLFuq');
  var colors = {
    'normal': 'green',
    'urgent': 'red'
  };

  params = params || {
    pullRequests: [{
      link: 'https://github.com/cbdr/cbax-apply-platform/pull/271',
      title: 'Add redirect to CB',
      id: 271,
      assignees: ['derrickwilliams', 'mmoldavan'],
      level: 'normal'
    }]
  };

  (0, _lodash.forEach)(params.pullRequests, sendNotifcation);
  function sendNotifcation(request) {
    hipchatter.notify('CBAX Scrum', {
      message: '<b>PR:</b>: <a href="' + request.link + '">' + request.title + ' ' + request.id + '</a><br/><b>Assignees:</b> ' + request.assignees,
      color: colors[request.level],
      token: '7b6FlCfiFjgVaNpgM3YLOBNeJ3FxIgR2Tq1BC1Jp'
    }, function (err) {
      if (err == null) console.log('Successfully notified the room.');
    });
  }
  /*hipchatter.notify('CBAX Scrum', 
      {
          message: '<b>Outstanding Pullrequest</b>: <a href="https://github.com/cbdr/cbax-apply-platform/pull/271">Add redirect to CB #271</a><br/><b>Assignees:</b> derrickwilliams',
          color: 'green',
          token: '7b6FlCfiFjgVaNpgM3YLOBNeJ3FxIgR2Tq1BC1Jp'
      }, function(err){
          if (err == null) console.log('Successfully notified the room.');
  });*/
  return _bluebird2.default.resolve();
  /*return Promise.resolve(request({
    url: 'https://api.hipchat.com/v2/room/CBAX Scrum/notifcation',
    headers: {
      'content-type':'application/json'
    },
    body: {
      from: 'Admiral Pugdalf',
     }
   }))*/
}
//# sourceMappingURL=data:application/json;base64,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QUN3QixLQUQvQjtBQUVEOztBQUVELFNBQVMsYUFBVCxDQUF1QixNQUF2QixFQUErQjtBQUM3QixVQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXNCLE1BQXRCOztBQUVBLE1BQUksYUFBYSx5QkFBZSwwQ0FBZixDQUFqQjtBQUNBLE1BQUksU0FBUztBQUNYLGNBQVUsT0FEQztBQUVYLGNBQVU7QUFGQyxHQUFiOztBQUtBLFdBQVMsVUFBVTtBQUNqQixrQkFBYyxDQUFDO0FBQ2IsWUFBTSxzREFETztBQUViLGFBQU8sb0JBRk07QUFHYixVQUFJLEdBSFM7QUFJYixpQkFBVyxDQUFDLGlCQUFELEVBQW1CLFdBQW5CLENBSkU7QUFLYixhQUFPO0FBTE0sS0FBRDtBQURHLEdBQW5COztBQVVBLHVCQUFRLE9BQU8sWUFBZixFQUE2QixlQUE3QjtBQUNBLFdBQVMsZUFBVCxDQUF5QixPQUF6QixFQUFrQztBQUNoQyxlQUFXLE1BQVgsQ0FBa0IsWUFBbEIsRUFDSTtBQUNJLGVBQVMsMEJBQXlCLFFBQVEsSUFBakMsR0FBdUMsSUFBdkMsR0FBOEMsUUFBUSxLQUF0RCxHQUE4RCxHQUE5RCxHQUFvRSxRQUFRLEVBQTVFLEdBQWlGLDZCQUFqRixHQUErRyxRQUFRLFNBRHBJO0FBRUksYUFBTyxPQUFPLFFBQVEsS0FBZixDQUZYO0FBR0ksYUFBTztBQUhYLEtBREosRUFLTyxVQUFTLEdBQVQsRUFBYTtBQUNaLFVBQUksT0FBTyxJQUFYLEVBQWlCLFFBQVEsR0FBUixDQUFZLGlDQUFaO0FBQ3hCLEtBUEQ7QUFRRDtBQUNIOzs7Ozs7OztBQVFBLFNBQU8sbUJBQVEsT0FBUixFQUFQO0FBQ0U7Ozs7Ozs7OztBQVlEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgYXNzaWduLCBmaWx0ZXIsIGluY2x1ZGVzLCBmb3JFYWNoIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBIaXBjaGF0dGVyIGZyb20gJ2hpcGNoYXR0ZXInO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbmNvbnN0IEdJVEhVQl9BUElfVVJMID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20nO1xuXG5hcHAuZ2V0KCcvZ2l0aHViL3JlcG9zJywgKHJlcSwgcmVzKSA9PiB7XG4gIGdldFJlcG9zaXRvcmllcyhyZXEucXVlcnkpXG4gICAgLnRoZW4ocmVwb3MgPT4gcmVzLmpzb24oeyByZXBvcyB9KSlcbiAgICAuY2F0Y2goZXJyID0+IHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IGVyci50b1N0cmluZygpIH0pKVxufSlcblxuYXBwLnBvc3QoJy9oaXBjaGF0L25vdGlmeScsIChyZXEsIHJlcykgPT4ge1xuICBub3RpZnlIaXBjaGF0KHJlcS5ib2R5KVxuICAgIC5jYXRjaChlcnIgPT4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogZXJyLnRvU3RyaW5nKCkgfSkpXG59KVxuXG5hcHAubGlzdGVuKDEyMTIxLCAoKSA9PiBjb25zb2xlLmxvZygnbGlzdGVuaW5nJywgMTIxMjEpKTtcblxuZnVuY3Rpb24gZ2V0UmVwb3NpdG9yaWVzKHsgcmVwbyB9KSB7XG4gIHJldHVybiBnaXRodWJSZXF1ZXN0KCdzZWFyY2gvcmVwb3NpdG9yaWVzJywge1xuICAgIGRhdGE6IHtcbiAgICAgIHE6IGAke3JlcG99IGluOm5hbWUgcHVzaGVkOj49MjAxNi0wMS0wMWBcbiAgICB9XG4gIH0pXG4gIC5nZXQoJ2l0ZW1zJylcbiAgLnRoZW4ocmVwb3MgPT4gZmlsdGVyKHJlcG9zLCAocikgPT4gci5vd25lci5sb2dpbiA9PT0gJ2NiZHInKSlcbiAgLy8gLm1hcChsb2FkUmVwb0lzc3VlcylcbiAgLm1hcChsb2FkUHVsbFJlcXVlc3RzKVxuICAubWFwKHIgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiByLm5hbWUsXG4gICAgICBvd25lcjogci5vd25lci5sb2dpbixcbiAgICAgIGlzc3Vlczogci5pc3N1ZXMsXG4gICAgICBwdWxsUmVxdWVzdHM6IHIucHVsbFJlcXVlc3RzXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRQdWxsUmVxdWVzdHMocmVwbykge1xuICBsZXQgeyBwdWxsc191cmwgfSA9IHJlcG87XG4gIHJldHVybiBnaXRodWJSZXF1ZXN0KHB1bGxzX3VybClcbiAgICAubWFwKHAgPT4gKHsgaWQ6IHAuaWQsIG51bWJlcjogcC5udW1iZXIsIHRpdGxlOiBwLnRpdGxlLCB1cmw6IHAudXJsLCBhc3NpZ25lZXM6IHAuYXNzaWduZWVzIH0pKVxuICAgIC50aGVuKHB1bGxzID0+IGFzc2lnbih7fSwgcmVwbywgeyBbJ3B1bGxSZXF1ZXN0cyddOiBwdWxscyB9KSlcbiAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgdGhyb3cgZXJyO1xuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGxvYWRSZXBvSXNzdWVzKHJlcG8pIHtcbiAgbGV0IHsgaXNzdWVzX3VybCB9ID0gcmVwbztcbiAgcmV0dXJuIGdpdGh1YlJlcXVlc3QoaXNzdWVzX3VybClcbiAgICAubWFwKGkgPT4gKHsgaWQ6IGkuaWQsIG51bWJlcjogaS5udW1iZXIsIHRpdGxlOiBpLnRpdGxlLCB1cmw6IGkudXJsLCBhc3NpZ25lZXM6IGkuYXNzaWduZWVzIH0pKVxuICAgIC50aGVuKGlzc3VlcyA9PiBhc3NpZ24oe30sIHJlcG8sIHsgaXNzdWVzIH0pKVxuICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcmVtb3ZlUGxhY2Vob2xkZXIodXJsLCBwbGFjZWhvbGRlcikge1xuICByZXR1cm4gdXJsLnJlcGxhY2UobmV3IFJlZ0V4cChgey8ke3BsYWNlaG9sZGVyfX1gKSwgJycpO1xufVxuXG5mdW5jdGlvbiBnaXRodWJSZXF1ZXN0KGVuZHBvaW50LCB7IGRhdGEgPSB7fSwgZGF0YUZpZWxkID0gJ3FzJyB9ID0ge30pIHtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXF1ZXN0KHtcbiAgICB1cmw6IHByZXBFbmRwb2ludFVybChlbmRwb2ludCksXG4gICAgW2RhdGFGaWVsZF06IGRhdGEsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0F1dGhvcml6YXRpb24nOiBgdG9rZW4gJHtwcm9jZXNzLmVudi5HSF9OT1RJRllfQVVUSF9UT0tFTn1gLFxuICAgICAgJ1VzZXItQWdlbnQnOiAnY2JheC9naC1ub3RpZnknLFxuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi92bmQuZ2l0aHViLmNlcmJlcnVzLXByZXZpZXcranNvbidcbiAgICB9LFxuICAgIGpzb246IHRydWVcbiAgfSkpXG59XG5cbmZ1bmN0aW9uIHByZXBFbmRwb2ludFVybCh1cmxJbikge1xuICBjb25zb2xlLmxvZygndXJsIGluJywgdXJsSW4pO1xuICBjb25zb2xlLmxvZyh1cmxJbiwgJ2luY2x1ZGVzJywgR0lUSFVCX0FQSV9VUkwsIGluY2x1ZGVzKHJlbW92ZVBsYWNlaG9sZGVyKHVybEluLCAnbnVtYmVyJyksIEdJVEhVQl9BUElfVVJMKSlcbiAgdXJsSW4gPSByZW1vdmVQbGFjZWhvbGRlcih1cmxJbiwgJ251bWJlcicpO1xuICByZXR1cm4gaW5jbHVkZXModXJsSW4sIEdJVEhVQl9BUElfVVJMKSA/XG4gICAgdXJsSW4gOiBgJHtHSVRIVUJfQVBJX1VSTH0vJHt1cmxJbn1gO1xufVxuXG5mdW5jdGlvbiBub3RpZnlIaXBjaGF0KHBhcmFtcykge1xuICBjb25zb2xlLmxvZygncGFyYW1zOicscGFyYW1zKTtcblxuICBsZXQgaGlwY2hhdHRlciA9IG5ldyBIaXBjaGF0dGVyKCdYN3FRVTBYUFNqTm44NnJqNmVMY1pFWDR0UTFybTZob2pQN3RMRnVxJyk7XG4gIGxldCBjb2xvcnMgPSB7XG4gICAgJ25vcm1hbCc6ICdncmVlbicsXG4gICAgJ3VyZ2VudCc6ICdyZWQnICBcbiAgfTtcblxuICBwYXJhbXMgPSBwYXJhbXMgfHwge1xuICAgIHB1bGxSZXF1ZXN0czogW3tcbiAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vY2Jkci9jYmF4LWFwcGx5LXBsYXRmb3JtL3B1bGwvMjcxJyxcbiAgICAgIHRpdGxlOiAnQWRkIHJlZGlyZWN0IHRvIENCJyxcbiAgICAgIGlkOiAyNzEsXG4gICAgICBhc3NpZ25lZXM6IFsnZGVycmlja3dpbGxpYW1zJywnbW1vbGRhdmFuJ10sXG4gICAgICBsZXZlbDogJ25vcm1hbCdcbiAgICB9XVxuICB9XG5cbiAgZm9yRWFjaChwYXJhbXMucHVsbFJlcXVlc3RzLCBzZW5kTm90aWZjYXRpb24pXG4gIGZ1bmN0aW9uIHNlbmROb3RpZmNhdGlvbihyZXF1ZXN0KSB7XG4gICAgaGlwY2hhdHRlci5ub3RpZnkoJ0NCQVggU2NydW0nLCBcbiAgICAgICAge1xuICAgICAgICAgICAgbWVzc2FnZTogJzxiPlBSOjwvYj46IDxhIGhyZWY9XCInKyByZXF1ZXN0LmxpbmsgKydcIj4nICsgcmVxdWVzdC50aXRsZSArICcgJyArIHJlcXVlc3QuaWQgKyAnPC9hPjxici8+PGI+QXNzaWduZWVzOjwvYj4gJytyZXF1ZXN0LmFzc2lnbmVlcyxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvcnNbcmVxdWVzdC5sZXZlbF0sXG4gICAgICAgICAgICB0b2tlbjogJzdiNkZsQ2ZpRmpnVmFOcGdNM1lMT0JOZUozRnhJZ1IyVHExQkMxSnAnXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICBpZiAoZXJyID09IG51bGwpIGNvbnNvbGUubG9nKCdTdWNjZXNzZnVsbHkgbm90aWZpZWQgdGhlIHJvb20uJyk7XG4gICAgfSk7XG4gIH1cbi8qaGlwY2hhdHRlci5ub3RpZnkoJ0NCQVggU2NydW0nLCBcbiAgICB7XG4gICAgICAgIG1lc3NhZ2U6ICc8Yj5PdXRzdGFuZGluZyBQdWxscmVxdWVzdDwvYj46IDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vY2Jkci9jYmF4LWFwcGx5LXBsYXRmb3JtL3B1bGwvMjcxXCI+QWRkIHJlZGlyZWN0IHRvIENCICMyNzE8L2E+PGJyLz48Yj5Bc3NpZ25lZXM6PC9iPiBkZXJyaWNrd2lsbGlhbXMnLFxuICAgICAgICBjb2xvcjogJ2dyZWVuJyxcbiAgICAgICAgdG9rZW46ICc3YjZGbENmaUZqZ1ZhTnBnTTNZTE9CTmVKM0Z4SWdSMlRxMUJDMUpwJ1xuICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgIGlmIChlcnIgPT0gbnVsbCkgY29uc29sZS5sb2coJ1N1Y2Nlc3NmdWxseSBub3RpZmllZCB0aGUgcm9vbS4nKTtcbn0pOyovXG5yZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIC8qcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXF1ZXN0KHtcbiAgICB1cmw6ICdodHRwczovL2FwaS5oaXBjaGF0LmNvbS92Mi9yb29tL0NCQVggU2NydW0vbm90aWZjYXRpb24nLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdjb250ZW50LXR5cGUnOidhcHBsaWNhdGlvbi9qc29uJ1xuICAgIH0sXG4gICAgYm9keToge1xuICAgICAgZnJvbTogJ0FkbWlyYWwgUHVnZGFsZicsXG5cbiAgICB9XG5cbiAgfSkpKi9cblxufSJdfQ==
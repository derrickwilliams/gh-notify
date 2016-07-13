'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = notifyHipchat;

var _hipchatter = require('hipchatter');

var _hipchatter2 = _interopRequireDefault(_hipchatter);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub3RpZnkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBSXdCLGE7O0FBSnhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVlLFNBQVMsYUFBVCxDQUF1QixNQUF2QixFQUErQjtBQUM1QyxVQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXNCLE1BQXRCOztBQUVBLE1BQUksYUFBYSx5QkFBZSwwQ0FBZixDQUFqQjtBQUNBLE1BQUksU0FBUztBQUNYLGNBQVUsT0FEQztBQUVYLGNBQVU7QUFGQyxHQUFiOztBQUtBLFdBQVMsVUFBVTtBQUNqQixrQkFBYyxDQUFDO0FBQ2IsWUFBTSxzREFETztBQUViLGFBQU8sb0JBRk07QUFHYixVQUFJLEdBSFM7QUFJYixpQkFBVyxDQUFDLGlCQUFELEVBQW1CLFdBQW5CLENBSkU7QUFLYixhQUFPO0FBTE0sS0FBRDtBQURHLEdBQW5COztBQVVBLHVCQUFRLE9BQU8sWUFBZixFQUE2QixlQUE3QjtBQUNBLFdBQVMsZUFBVCxDQUF5QixPQUF6QixFQUFrQztBQUNoQyxlQUFXLE1BQVgsQ0FBa0IsWUFBbEIsRUFDSTtBQUNJLGVBQVMsMEJBQXlCLFFBQVEsSUFBakMsR0FBdUMsSUFBdkMsR0FBOEMsUUFBUSxLQUF0RCxHQUE4RCxHQUE5RCxHQUFvRSxRQUFRLEVBQTVFLEdBQWlGLDZCQUFqRixHQUErRyxRQUFRLFNBRHBJO0FBRUksYUFBTyxPQUFPLFFBQVEsS0FBZixDQUZYO0FBR0ksYUFBTztBQUhYLEtBREosRUFLTyxVQUFTLEdBQVQsRUFBYTtBQUNaLFVBQUksT0FBTyxJQUFYLEVBQWlCLFFBQVEsR0FBUixDQUFZLGlDQUFaO0FBQ3hCLEtBUEQ7QUFRRDtBQUNIOzs7Ozs7OztBQVFBLFNBQU8sbUJBQVEsT0FBUixFQUFQO0FBQ0U7Ozs7Ozs7OztBQVlEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhpcGNoYXR0ZXIgZnJvbSAnaGlwY2hhdHRlcic7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm90aWZ5SGlwY2hhdChwYXJhbXMpIHtcbiAgY29uc29sZS5sb2coJ3BhcmFtczonLHBhcmFtcyk7XG5cbiAgbGV0IGhpcGNoYXR0ZXIgPSBuZXcgSGlwY2hhdHRlcignWDdxUVUwWFBTak5uODZyajZlTGNaRVg0dFExcm02aG9qUDd0TEZ1cScpO1xuICBsZXQgY29sb3JzID0ge1xuICAgICdub3JtYWwnOiAnZ3JlZW4nLFxuICAgICd1cmdlbnQnOiAncmVkJyAgXG4gIH07XG5cbiAgcGFyYW1zID0gcGFyYW1zIHx8IHtcbiAgICBwdWxsUmVxdWVzdHM6IFt7XG4gICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2NiZHIvY2JheC1hcHBseS1wbGF0Zm9ybS9wdWxsLzI3MScsXG4gICAgICB0aXRsZTogJ0FkZCByZWRpcmVjdCB0byBDQicsXG4gICAgICBpZDogMjcxLFxuICAgICAgYXNzaWduZWVzOiBbJ2RlcnJpY2t3aWxsaWFtcycsJ21tb2xkYXZhbiddLFxuICAgICAgbGV2ZWw6ICdub3JtYWwnXG4gICAgfV1cbiAgfVxuXG4gIGZvckVhY2gocGFyYW1zLnB1bGxSZXF1ZXN0cywgc2VuZE5vdGlmY2F0aW9uKVxuICBmdW5jdGlvbiBzZW5kTm90aWZjYXRpb24ocmVxdWVzdCkge1xuICAgIGhpcGNoYXR0ZXIubm90aWZ5KCdDQkFYIFNjcnVtJywgXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICc8Yj5QUjo8L2I+OiA8YSBocmVmPVwiJysgcmVxdWVzdC5saW5rICsnXCI+JyArIHJlcXVlc3QudGl0bGUgKyAnICcgKyByZXF1ZXN0LmlkICsgJzwvYT48YnIvPjxiPkFzc2lnbmVlczo8L2I+ICcrcmVxdWVzdC5hc3NpZ25lZXMsXG4gICAgICAgICAgICBjb2xvcjogY29sb3JzW3JlcXVlc3QubGV2ZWxdLFxuICAgICAgICAgICAgdG9rZW46ICc3YjZGbENmaUZqZ1ZhTnBnTTNZTE9CTmVKM0Z4SWdSMlRxMUJDMUpwJ1xuICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgaWYgKGVyciA9PSBudWxsKSBjb25zb2xlLmxvZygnU3VjY2Vzc2Z1bGx5IG5vdGlmaWVkIHRoZSByb29tLicpO1xuICAgIH0pO1xuICB9XG4vKmhpcGNoYXR0ZXIubm90aWZ5KCdDQkFYIFNjcnVtJywgXG4gICAge1xuICAgICAgICBtZXNzYWdlOiAnPGI+T3V0c3RhbmRpbmcgUHVsbHJlcXVlc3Q8L2I+OiA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2NiZHIvY2JheC1hcHBseS1wbGF0Zm9ybS9wdWxsLzI3MVwiPkFkZCByZWRpcmVjdCB0byBDQiAjMjcxPC9hPjxici8+PGI+QXNzaWduZWVzOjwvYj4gZGVycmlja3dpbGxpYW1zJyxcbiAgICAgICAgY29sb3I6ICdncmVlbicsXG4gICAgICAgIHRva2VuOiAnN2I2RmxDZmlGamdWYU5wZ00zWUxPQk5lSjNGeElnUjJUcTFCQzFKcCdcbiAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICBpZiAoZXJyID09IG51bGwpIGNvbnNvbGUubG9nKCdTdWNjZXNzZnVsbHkgbm90aWZpZWQgdGhlIHJvb20uJyk7XG59KTsqL1xucmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAvKnJldHVybiBQcm9taXNlLnJlc29sdmUocmVxdWVzdCh7XG4gICAgdXJsOiAnaHR0cHM6Ly9hcGkuaGlwY2hhdC5jb20vdjIvcm9vbS9DQkFYIFNjcnVtL25vdGlmY2F0aW9uJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnY29udGVudC10eXBlJzonYXBwbGljYXRpb24vanNvbidcbiAgICB9LFxuICAgIGJvZHk6IHtcbiAgICAgIGZyb206ICdBZG1pcmFsIFB1Z2RhbGYnLFxuXG4gICAgfVxuXG4gIH0pKSovXG5cbn0iXX0=
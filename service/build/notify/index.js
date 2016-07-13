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

function notifyHipchat(pullRequests) {
  console.log('pullRequests:', pullRequests);

  var hipchatter = new _hipchatter2.default('X7qQU0XPSjNn86rj6eLcZEX4tQ1rm6hojP7tLFuq');
  var colors = {
    '0': 'green',
    '5': 'yellow',
    '10': 'red'
  };
  var levels = {
    '0': 'new',
    '5': 'outstanding',
    '10': 'unassigned or stale'
  };
  var groupedPRs = {
    '0': [],
    '5': [],
    '10': []
  };
  var messages = {
    '0': '',
    '5': '',
    '10': ''
  };

  pullRequests = pullRequests || [{
    link: 'https://github.com/cbdr/cbax-apply-platform/pull/271',
    title: 'Add redirect to CB',
    id: 271,
    assignees: ['derrickwilliams', 'mmoldavan'],
    level: 'normal'
  }];

  (0, _lodash.forEach)(pullRequests, groupPRs);
  (0, _lodash.forEach)(messages, sendNotifcation);

  function groupPRs(pr) {
    groupedPRs[pr.level].push(pr);
    messages[pr.level] += '<b>' + pr.repo + ': <a href="' + pr.link + '">' + pr.title + '</a></b></br><i>Assignees: ' + pr.assignees + '</i><br/>';
  }

  function sendNotifcation(message, key) {
    console.log(key, message);
    if (groupedPRs[key].length > 0) {
      message = '<b>There are ' + groupedPRs[key].length + ' ' + levels[key] + ' pull requests.</b><br/><br/>' + message;
      hipchatter.notify('CBAX Scrum', {
        message: message,
        color: colors[key],
        notify: true,
        token: '7b6FlCfiFjgVaNpgM3YLOBNeJ3FxIgR2Tq1BC1Jp'
      }, function (err) {
        if (err == null) console.log('Successfully notified the room.');
      });
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub3RpZnkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBSXdCLGE7O0FBSnhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVlLFNBQVMsYUFBVCxDQUF1QixZQUF2QixFQUFxQztBQUNsRCxVQUFRLEdBQVIsQ0FBWSxlQUFaLEVBQTRCLFlBQTVCOztBQUVBLE1BQUksYUFBYSx5QkFBZSwwQ0FBZixDQUFqQjtBQUNBLE1BQUksU0FBUztBQUNYLFNBQUssT0FETTtBQUVYLFNBQUssUUFGTTtBQUdYLFVBQU07QUFISyxHQUFiO0FBS0EsTUFBSSxTQUFTO0FBQ1gsU0FBSyxLQURNO0FBRVgsU0FBSyxhQUZNO0FBR1gsVUFBTTtBQUhLLEdBQWI7QUFLQSxNQUFJLGFBQWE7QUFDZixTQUFLLEVBRFU7QUFFZixTQUFLLEVBRlU7QUFHZixVQUFNO0FBSFMsR0FBakI7QUFLQSxNQUFJLFdBQVc7QUFDYixTQUFLLEVBRFE7QUFFYixTQUFLLEVBRlE7QUFHYixVQUFNO0FBSE8sR0FBZjs7QUFNQSxpQkFBZSxnQkFBZ0IsQ0FBQztBQUM1QixVQUFNLHNEQURzQjtBQUU1QixXQUFPLG9CQUZxQjtBQUc1QixRQUFJLEdBSHdCO0FBSTVCLGVBQVcsQ0FBQyxpQkFBRCxFQUFtQixXQUFuQixDQUppQjtBQUs1QixXQUFPO0FBTHFCLEdBQUQsQ0FBL0I7O0FBUUEsdUJBQVEsWUFBUixFQUFzQixRQUF0QjtBQUNBLHVCQUFRLFFBQVIsRUFBa0IsZUFBbEI7O0FBRUEsV0FBUyxRQUFULENBQWtCLEVBQWxCLEVBQXNCO0FBQ3BCLGVBQVcsR0FBRyxLQUFkLEVBQXFCLElBQXJCLENBQTBCLEVBQTFCO0FBQ0EsYUFBUyxHQUFHLEtBQVosS0FBc0IsUUFBTyxHQUFHLElBQVYsR0FBZ0IsYUFBaEIsR0FBK0IsR0FBRyxJQUFsQyxHQUF3QyxJQUF4QyxHQUErQyxHQUFHLEtBQWxELEdBQTBELDZCQUExRCxHQUF3RixHQUFHLFNBQTNGLEdBQXFHLFdBQTNIO0FBQ0Q7O0FBRUQsV0FBUyxlQUFULENBQXlCLE9BQXpCLEVBQWtDLEdBQWxDLEVBQXVDO0FBQ3JDLFlBQVEsR0FBUixDQUFZLEdBQVosRUFBaUIsT0FBakI7QUFDQSxRQUFHLFdBQVcsR0FBWCxFQUFnQixNQUFoQixHQUF5QixDQUE1QixFQUErQjtBQUM3QixnQkFBVSxrQkFBa0IsV0FBVyxHQUFYLEVBQWdCLE1BQWxDLEdBQTJDLEdBQTNDLEdBQWlELE9BQU8sR0FBUCxDQUFqRCxHQUErRCwrQkFBL0QsR0FBaUcsT0FBM0c7QUFDQSxpQkFBVyxNQUFYLENBQWtCLFlBQWxCLEVBQ0k7QUFDSSxpQkFBUyxPQURiO0FBRUksZUFBTyxPQUFPLEdBQVAsQ0FGWDtBQUdJLGdCQUFRLElBSFo7QUFJSSxlQUFPO0FBSlgsT0FESixFQU1PLFVBQVMsR0FBVCxFQUFhO0FBQ1osWUFBSSxPQUFPLElBQVgsRUFBaUIsUUFBUSxHQUFSLENBQVksaUNBQVo7QUFDeEIsT0FSRDtBQVNEO0FBQ0Y7O0FBRUg7Ozs7Ozs7O0FBUUEsU0FBTyxtQkFBUSxPQUFSLEVBQVA7QUFDRTs7Ozs7Ozs7O0FBWUQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGlwY2hhdHRlciBmcm9tICdoaXBjaGF0dGVyJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3RpZnlIaXBjaGF0KHB1bGxSZXF1ZXN0cykge1xuICBjb25zb2xlLmxvZygncHVsbFJlcXVlc3RzOicscHVsbFJlcXVlc3RzKTtcblxuICBsZXQgaGlwY2hhdHRlciA9IG5ldyBIaXBjaGF0dGVyKCdYN3FRVTBYUFNqTm44NnJqNmVMY1pFWDR0UTFybTZob2pQN3RMRnVxJyk7XG4gIGxldCBjb2xvcnMgPSB7XG4gICAgJzAnOiAnZ3JlZW4nLFxuICAgICc1JzogJ3llbGxvdycsXG4gICAgJzEwJzogJ3JlZCcgIFxuICB9O1xuICBsZXQgbGV2ZWxzID0ge1xuICAgICcwJzogJ25ldycsXG4gICAgJzUnOiAnb3V0c3RhbmRpbmcnLFxuICAgICcxMCc6ICd1bmFzc2lnbmVkIG9yIHN0YWxlJ1xuICB9XG4gIGxldCBncm91cGVkUFJzID0ge1xuICAgICcwJzogW10sXG4gICAgJzUnOiBbXSxcbiAgICAnMTAnOiBbXVxuICB9XG4gIGxldCBtZXNzYWdlcyA9IHtcbiAgICAnMCc6ICcnLFxuICAgICc1JzogJycsXG4gICAgJzEwJzogJydcbiAgfVxuXG4gIHB1bGxSZXF1ZXN0cyA9IHB1bGxSZXF1ZXN0cyB8fCBbe1xuICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9jYmRyL2NiYXgtYXBwbHktcGxhdGZvcm0vcHVsbC8yNzEnLFxuICAgICAgdGl0bGU6ICdBZGQgcmVkaXJlY3QgdG8gQ0InLFxuICAgICAgaWQ6IDI3MSxcbiAgICAgIGFzc2lnbmVlczogWydkZXJyaWNrd2lsbGlhbXMnLCdtbW9sZGF2YW4nXSxcbiAgICAgIGxldmVsOiAnbm9ybWFsJ1xuICAgIH1dXG5cbiAgZm9yRWFjaChwdWxsUmVxdWVzdHMsIGdyb3VwUFJzKTtcbiAgZm9yRWFjaChtZXNzYWdlcywgc2VuZE5vdGlmY2F0aW9uKTtcblxuICBmdW5jdGlvbiBncm91cFBScyhwcikge1xuICAgIGdyb3VwZWRQUnNbcHIubGV2ZWxdLnB1c2gocHIpO1xuICAgIG1lc3NhZ2VzW3ByLmxldmVsXSArPSAnPGI+JyArcHIucmVwbyArJzogPGEgaHJlZj1cIicrIHByLmxpbmsgKydcIj4nICsgcHIudGl0bGUgKyAnPC9hPjwvYj48L2JyPjxpPkFzc2lnbmVlczogJytwci5hc3NpZ25lZXMrJzwvaT48YnIvPidcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbmROb3RpZmNhdGlvbihtZXNzYWdlLCBrZXkpIHtcbiAgICBjb25zb2xlLmxvZyhrZXksIG1lc3NhZ2UpO1xuICAgIGlmKGdyb3VwZWRQUnNba2V5XS5sZW5ndGggPiAwKSB7XG4gICAgICBtZXNzYWdlID0gJzxiPlRoZXJlIGFyZSAnICsgZ3JvdXBlZFBSc1trZXldLmxlbmd0aCArICcgJyArIGxldmVsc1trZXldICsgJyBwdWxsIHJlcXVlc3RzLjwvYj48YnIvPjxici8+JyArIG1lc3NhZ2VcbiAgICAgIGhpcGNoYXR0ZXIubm90aWZ5KCdDQkFYIFNjcnVtJywgXG4gICAgICAgICAge1xuICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgICBjb2xvcjogY29sb3JzW2tleV0sXG4gICAgICAgICAgICAgIG5vdGlmeTogdHJ1ZSxcbiAgICAgICAgICAgICAgdG9rZW46ICc3YjZGbENmaUZqZ1ZhTnBnTTNZTE9CTmVKM0Z4SWdSMlRxMUJDMUpwJ1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgIGlmIChlcnIgPT0gbnVsbCkgY29uc29sZS5sb2coJ1N1Y2Nlc3NmdWxseSBub3RpZmllZCB0aGUgcm9vbS4nKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4vKmhpcGNoYXR0ZXIubm90aWZ5KCdDQkFYIFNjcnVtJywgXG4gICAge1xuICAgICAgICBtZXNzYWdlOiAnPGI+T3V0c3RhbmRpbmcgUHVsbHJlcXVlc3Q8L2I+OiA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2NiZHIvY2JheC1hcHBseS1wbGF0Zm9ybS9wdWxsLzI3MVwiPkFkZCByZWRpcmVjdCB0byBDQiAjMjcxPC9hPjxici8+PGI+QXNzaWduZWVzOjwvYj4gZGVycmlja3dpbGxpYW1zJyxcbiAgICAgICAgY29sb3I6ICdncmVlbicsXG4gICAgICAgIHRva2VuOiAnN2I2RmxDZmlGamdWYU5wZ00zWUxPQk5lSjNGeElnUjJUcTFCQzFKcCdcbiAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICBpZiAoZXJyID09IG51bGwpIGNvbnNvbGUubG9nKCdTdWNjZXNzZnVsbHkgbm90aWZpZWQgdGhlIHJvb20uJyk7XG59KTsqL1xucmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAvKnJldHVybiBQcm9taXNlLnJlc29sdmUocmVxdWVzdCh7XG4gICAgdXJsOiAnaHR0cHM6Ly9hcGkuaGlwY2hhdC5jb20vdjIvcm9vbS9DQkFYIFNjcnVtL25vdGlmY2F0aW9uJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnY29udGVudC10eXBlJzonYXBwbGljYXRpb24vanNvbidcbiAgICB9LFxuICAgIGJvZHk6IHtcbiAgICAgIGZyb206ICdBZG1pcmFsIFB1Z2RhbGYnLFxuXG4gICAgfVxuXG4gIH0pKSovXG5cbn0iXX0=
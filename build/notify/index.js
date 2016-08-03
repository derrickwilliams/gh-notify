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
    debugger;
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

  return _bluebird2.default.resolve();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub3RpZnkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBSXdCLGE7O0FBSnhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVlLFNBQVMsYUFBVCxDQUF1QixZQUF2QixFQUFxQztBQUNsRCxVQUFRLEdBQVIsQ0FBWSxlQUFaLEVBQTRCLFlBQTVCOztBQUVBLE1BQUksYUFBYSx5QkFBZSwwQ0FBZixDQUFqQjtBQUNBLE1BQUksU0FBUztBQUNYLFNBQUssT0FETTtBQUVYLFNBQUssUUFGTTtBQUdYLFVBQU07QUFISyxHQUFiO0FBS0EsTUFBSSxTQUFTO0FBQ1gsU0FBSyxLQURNO0FBRVgsU0FBSyxhQUZNO0FBR1gsVUFBTTtBQUhLLEdBQWI7QUFLQSxNQUFJLGFBQWE7QUFDZixTQUFLLEVBRFU7QUFFZixTQUFLLEVBRlU7QUFHZixVQUFNO0FBSFMsR0FBakI7QUFLQSxNQUFJLFdBQVc7QUFDYixTQUFLLEVBRFE7QUFFYixTQUFLLEVBRlE7QUFHYixVQUFNO0FBSE8sR0FBZjs7QUFNQSxpQkFBZSxnQkFBZ0IsQ0FBQztBQUM1QixVQUFNLHNEQURzQjtBQUU1QixXQUFPLG9CQUZxQjtBQUc1QixRQUFJLEdBSHdCO0FBSTVCLGVBQVcsQ0FBQyxpQkFBRCxFQUFtQixXQUFuQixDQUppQjtBQUs1QixXQUFPO0FBTHFCLEdBQUQsQ0FBL0I7O0FBUUEsdUJBQVEsWUFBUixFQUFzQixRQUF0QjtBQUNBLHVCQUFRLFFBQVIsRUFBa0IsZUFBbEI7O0FBRUEsV0FBUyxRQUFULENBQWtCLEVBQWxCLEVBQXNCO0FBQ3BCO0FBQ0EsZUFBVyxHQUFHLEtBQWQsRUFBcUIsSUFBckIsQ0FBMEIsRUFBMUI7QUFDQSxhQUFTLEdBQUcsS0FBWixLQUFzQixRQUFPLEdBQUcsSUFBVixHQUFnQixhQUFoQixHQUErQixHQUFHLElBQWxDLEdBQXdDLElBQXhDLEdBQStDLEdBQUcsS0FBbEQsR0FBMEQsNkJBQTFELEdBQXdGLEdBQUcsU0FBM0YsR0FBcUcsV0FBM0g7QUFDRDs7QUFFRCxXQUFTLGVBQVQsQ0FBeUIsT0FBekIsRUFBa0MsR0FBbEMsRUFBdUM7QUFDckMsWUFBUSxHQUFSLENBQVksR0FBWixFQUFpQixPQUFqQjtBQUNBLFFBQUcsV0FBVyxHQUFYLEVBQWdCLE1BQWhCLEdBQXlCLENBQTVCLEVBQStCO0FBQzdCLGdCQUFVLGtCQUFrQixXQUFXLEdBQVgsRUFBZ0IsTUFBbEMsR0FBMkMsR0FBM0MsR0FBaUQsT0FBTyxHQUFQLENBQWpELEdBQStELCtCQUEvRCxHQUFpRyxPQUEzRztBQUNBLGlCQUFXLE1BQVgsQ0FBa0IsWUFBbEIsRUFDSTtBQUNJLGlCQUFTLE9BRGI7QUFFSSxlQUFPLE9BQU8sR0FBUCxDQUZYO0FBR0ksZ0JBQVEsSUFIWjtBQUlJLGVBQU87QUFKWCxPQURKLEVBTU8sVUFBUyxHQUFULEVBQWE7QUFDWixZQUFJLE9BQU8sSUFBWCxFQUFpQixRQUFRLEdBQVIsQ0FBWSxpQ0FBWjtBQUN4QixPQVJEO0FBU0Q7QUFDRjs7QUFFSCxTQUFPLG1CQUFRLE9BQVIsRUFBUDtBQUVDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhpcGNoYXR0ZXIgZnJvbSAnaGlwY2hhdHRlcic7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm90aWZ5SGlwY2hhdChwdWxsUmVxdWVzdHMpIHtcbiAgY29uc29sZS5sb2coJ3B1bGxSZXF1ZXN0czonLHB1bGxSZXF1ZXN0cyk7XG5cbiAgbGV0IGhpcGNoYXR0ZXIgPSBuZXcgSGlwY2hhdHRlcignWDdxUVUwWFBTak5uODZyajZlTGNaRVg0dFExcm02aG9qUDd0TEZ1cScpO1xuICBsZXQgY29sb3JzID0ge1xuICAgICcwJzogJ2dyZWVuJyxcbiAgICAnNSc6ICd5ZWxsb3cnLFxuICAgICcxMCc6ICdyZWQnXG4gIH07XG4gIGxldCBsZXZlbHMgPSB7XG4gICAgJzAnOiAnbmV3JyxcbiAgICAnNSc6ICdvdXRzdGFuZGluZycsXG4gICAgJzEwJzogJ3VuYXNzaWduZWQgb3Igc3RhbGUnXG4gIH1cbiAgbGV0IGdyb3VwZWRQUnMgPSB7XG4gICAgJzAnOiBbXSxcbiAgICAnNSc6IFtdLFxuICAgICcxMCc6IFtdXG4gIH1cbiAgbGV0IG1lc3NhZ2VzID0ge1xuICAgICcwJzogJycsXG4gICAgJzUnOiAnJyxcbiAgICAnMTAnOiAnJ1xuICB9XG5cbiAgcHVsbFJlcXVlc3RzID0gcHVsbFJlcXVlc3RzIHx8IFt7XG4gICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2NiZHIvY2JheC1hcHBseS1wbGF0Zm9ybS9wdWxsLzI3MScsXG4gICAgICB0aXRsZTogJ0FkZCByZWRpcmVjdCB0byBDQicsXG4gICAgICBpZDogMjcxLFxuICAgICAgYXNzaWduZWVzOiBbJ2RlcnJpY2t3aWxsaWFtcycsJ21tb2xkYXZhbiddLFxuICAgICAgbGV2ZWw6ICdub3JtYWwnXG4gICAgfV1cblxuICBmb3JFYWNoKHB1bGxSZXF1ZXN0cywgZ3JvdXBQUnMpO1xuICBmb3JFYWNoKG1lc3NhZ2VzLCBzZW5kTm90aWZjYXRpb24pO1xuXG4gIGZ1bmN0aW9uIGdyb3VwUFJzKHByKSB7XG4gICAgZGVidWdnZXJcbiAgICBncm91cGVkUFJzW3ByLmxldmVsXS5wdXNoKHByKTtcbiAgICBtZXNzYWdlc1twci5sZXZlbF0gKz0gJzxiPicgK3ByLnJlcG8gKyc6IDxhIGhyZWY9XCInKyBwci5saW5rICsnXCI+JyArIHByLnRpdGxlICsgJzwvYT48L2I+PC9icj48aT5Bc3NpZ25lZXM6ICcrcHIuYXNzaWduZWVzKyc8L2k+PGJyLz4nXG4gIH1cblxuICBmdW5jdGlvbiBzZW5kTm90aWZjYXRpb24obWVzc2FnZSwga2V5KSB7XG4gICAgY29uc29sZS5sb2coa2V5LCBtZXNzYWdlKTtcbiAgICBpZihncm91cGVkUFJzW2tleV0ubGVuZ3RoID4gMCkge1xuICAgICAgbWVzc2FnZSA9ICc8Yj5UaGVyZSBhcmUgJyArIGdyb3VwZWRQUnNba2V5XS5sZW5ndGggKyAnICcgKyBsZXZlbHNba2V5XSArICcgcHVsbCByZXF1ZXN0cy48L2I+PGJyLz48YnIvPicgKyBtZXNzYWdlXG4gICAgICBoaXBjaGF0dGVyLm5vdGlmeSgnQ0JBWCBTY3J1bScsXG4gICAgICAgICAge1xuICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgICBjb2xvcjogY29sb3JzW2tleV0sXG4gICAgICAgICAgICAgIG5vdGlmeTogdHJ1ZSxcbiAgICAgICAgICAgICAgdG9rZW46ICc3YjZGbENmaUZqZ1ZhTnBnTTNZTE9CTmVKM0Z4SWdSMlRxMUJDMUpwJ1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgIGlmIChlcnIgPT0gbnVsbCkgY29uc29sZS5sb2coJ1N1Y2Nlc3NmdWxseSBub3RpZmllZCB0aGUgcm9vbS4nKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG5yZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbn0iXX0=
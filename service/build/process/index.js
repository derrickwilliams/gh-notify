'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processPRs;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _retrieve = require('../retrieve');

var _retrieve2 = _interopRequireDefault(_retrieve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oneDay = 24 * 60 * 60 * 1000;

function processPRs() {
  return (0, _retrieve2.default)({ repo: 'cbax-' }).then(function (repos) {
    return _lodash2.default.filter(repos, function (r) {
      return r.pullRequests.length > 0;
    });
  }).then(function (repos) {
    return _lodash2.default.map(repos, mapPRs);
  }).then(function (PRs) {
    return _lodash2.default.flatten(PRs);
  });
  //.tap(console.log);
}

function mapPRs(repo) {
  return _lodash2.default.map(repo.pullRequests, function (PR) {

    PR.repo = repo.name;
    PR.owner = PR.owner.login;
    PR.link = PR.url;
    PR.timeOpen = (new Date() - new Date(PR.created)) / oneDay;
    PR.timeSinceLastModified = (new Date() - new Date(PR.updated)) / oneDay;

    PR.assignees = _lodash2.default.map(PR.assignees, function (assignee) {
      return assignee.login;
    });
    PR.level = getLevel(PR);

    _lodash2.default.unset(PR, 'id');
    _lodash2.default.unset(PR, 'number');
    _lodash2.default.unset(PR, 'url');

    return PR;
  });
}

function getLevel(PR) {
  var noComments = false;
  if (PR.assignees.length === 0 || PR.timeOpen > 3) {
    return 10; //red: no assignees or stale
  }
  if (PR.timeOpen > 2 || PR.timeOpen > 1 && noComments) {
    return 5; //yellow going stale (outstanding > 2 days or no comments from assignees yet && older than 16 hours)
  }
  return 0; //green
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQU93QixVOztBQVB4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxTQUFTLEtBQUssRUFBTCxHQUFVLEVBQVYsR0FBZSxJQUE1Qjs7QUFFZSxTQUFTLFVBQVQsR0FBc0I7QUFDbkMsU0FBTyx3QkFBZ0IsRUFBRSxNQUFNLE9BQVIsRUFBaEIsRUFDSixJQURJLENBQ0MsVUFBQyxLQUFEO0FBQUEsV0FBVyxpQkFBRSxNQUFGLENBQVMsS0FBVCxFQUFnQixVQUFDLENBQUQ7QUFBQSxhQUFPLEVBQUUsWUFBRixDQUFlLE1BQWYsR0FBd0IsQ0FBL0I7QUFBQSxLQUFoQixDQUFYO0FBQUEsR0FERCxFQUVKLElBRkksQ0FFQyxVQUFDLEtBQUQ7QUFBQSxXQUFXLGlCQUFFLEdBQUYsQ0FBTSxLQUFOLEVBQWEsTUFBYixDQUFYO0FBQUEsR0FGRCxFQUdKLElBSEksQ0FHQyxVQUFDLEdBQUQ7QUFBQSxXQUFTLGlCQUFFLE9BQUYsQ0FBVSxHQUFWLENBQVQ7QUFBQSxHQUhELENBQVA7O0FBS0Q7O0FBRUQsU0FBUyxNQUFULENBQWdCLElBQWhCLEVBQXNCO0FBQ3BCLFNBQU8saUJBQUUsR0FBRixDQUFNLEtBQUssWUFBWCxFQUF5QixVQUFDLEVBQUQsRUFBUTs7QUFFdEMsT0FBRyxJQUFILEdBQVUsS0FBSyxJQUFmO0FBQ0EsT0FBRyxLQUFILEdBQVcsR0FBRyxLQUFILENBQVMsS0FBcEI7QUFDQSxPQUFHLElBQUgsR0FBVSxHQUFHLEdBQWI7QUFDQSxPQUFHLFFBQUgsR0FBYyxDQUFDLElBQUksSUFBSixLQUFhLElBQUksSUFBSixDQUFTLEdBQUcsT0FBWixDQUFkLElBQXNDLE1BQXBEO0FBQ0EsT0FBRyxxQkFBSCxHQUEyQixDQUFDLElBQUksSUFBSixLQUFhLElBQUksSUFBSixDQUFTLEdBQUcsT0FBWixDQUFkLElBQXNDLE1BQWpFOztBQUVBLE9BQUcsU0FBSCxHQUFlLGlCQUFFLEdBQUYsQ0FBTSxHQUFHLFNBQVQsRUFBb0IsVUFBQyxRQUFEO0FBQUEsYUFBYyxTQUFTLEtBQXZCO0FBQUEsS0FBcEIsQ0FBZjtBQUNBLE9BQUcsS0FBSCxHQUFXLFNBQVMsRUFBVCxDQUFYOztBQUVBLHFCQUFFLEtBQUYsQ0FBUSxFQUFSLEVBQVksSUFBWjtBQUNBLHFCQUFFLEtBQUYsQ0FBUSxFQUFSLEVBQVksUUFBWjtBQUNBLHFCQUFFLEtBQUYsQ0FBUSxFQUFSLEVBQVksS0FBWjs7QUFFQSxXQUFPLEVBQVA7QUFDRCxHQWhCTSxDQUFQO0FBaUJEOztBQUVELFNBQVMsUUFBVCxDQUFrQixFQUFsQixFQUFzQjtBQUNwQixNQUFJLGFBQWEsS0FBakI7QUFDQSxNQUFHLEdBQUcsU0FBSCxDQUFhLE1BQWIsS0FBd0IsQ0FBeEIsSUFBNkIsR0FBRyxRQUFILEdBQWMsQ0FBOUMsRUFBaUQ7QUFDL0MsV0FBTyxFQUFQLEM7QUFDRDtBQUNELE1BQUcsR0FBRyxRQUFILEdBQWMsQ0FBZCxJQUFvQixHQUFHLFFBQUgsR0FBYyxDQUFkLElBQW1CLFVBQTFDLEVBQXVEO0FBQ3JELFdBQU8sQ0FBUCxDO0FBQ0Q7QUFDRCxTQUFPLENBQVAsQztBQUNEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgZ2V0UmVwb3NpdG9yaWVzIGZyb20gJy4uL3JldHJpZXZlJztcblxubGV0IG9uZURheSA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb2Nlc3NQUnMoKSB7XG4gIHJldHVybiBnZXRSZXBvc2l0b3JpZXMoeyByZXBvOiAnY2JheC0nIH0pXG4gICAgLnRoZW4oKHJlcG9zKSA9PiBfLmZpbHRlcihyZXBvcywgKHIpID0+IHIucHVsbFJlcXVlc3RzLmxlbmd0aCA+IDAgKSlcbiAgICAudGhlbigocmVwb3MpID0+IF8ubWFwKHJlcG9zLCBtYXBQUnMpKVxuICAgIC50aGVuKChQUnMpID0+IF8uZmxhdHRlbihQUnMpKVxuICAgIC8vLnRhcChjb25zb2xlLmxvZyk7XG59XG5cbmZ1bmN0aW9uIG1hcFBScyhyZXBvKSB7XG4gIHJldHVybiBfLm1hcChyZXBvLnB1bGxSZXF1ZXN0cywgKFBSKSA9PiB7XG5cbiAgICBQUi5yZXBvID0gcmVwby5uYW1lO1xuICAgIFBSLm93bmVyID0gUFIub3duZXIubG9naW47XG4gICAgUFIubGluayA9IFBSLnVybDtcbiAgICBQUi50aW1lT3BlbiA9IChuZXcgRGF0ZSgpIC0gbmV3IERhdGUoUFIuY3JlYXRlZCkpIC8gb25lRGF5O1xuICAgIFBSLnRpbWVTaW5jZUxhc3RNb2RpZmllZCA9IChuZXcgRGF0ZSgpIC0gbmV3IERhdGUoUFIudXBkYXRlZCkpIC8gb25lRGF5O1xuXG4gICAgUFIuYXNzaWduZWVzID0gXy5tYXAoUFIuYXNzaWduZWVzLCAoYXNzaWduZWUpID0+IGFzc2lnbmVlLmxvZ2luKTtcbiAgICBQUi5sZXZlbCA9IGdldExldmVsKFBSKTtcblxuICAgIF8udW5zZXQoUFIsICdpZCcpO1xuICAgIF8udW5zZXQoUFIsICdudW1iZXInKTtcbiAgICBfLnVuc2V0KFBSLCAndXJsJyk7XG5cbiAgICByZXR1cm4gUFI7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRMZXZlbChQUikge1xuICBsZXQgbm9Db21tZW50cyA9IGZhbHNlO1xuICBpZihQUi5hc3NpZ25lZXMubGVuZ3RoID09PSAwIHx8IFBSLnRpbWVPcGVuID4gMykge1xuICAgIHJldHVybiAxMDsgLy9yZWQ6IG5vIGFzc2lnbmVlcyBvciBzdGFsZVxuICB9XG4gIGlmKFBSLnRpbWVPcGVuID4gMiB8fCAoUFIudGltZU9wZW4gPiAxICYmIG5vQ29tbWVudHMpKSB7XG4gICAgcmV0dXJuIDU7IC8veWVsbG93IGdvaW5nIHN0YWxlIChvdXRzdGFuZGluZyA+IDIgZGF5cyBvciBubyBjb21tZW50cyBmcm9tIGFzc2lnbmVlcyB5ZXQgJiYgb2xkZXIgdGhhbiAxNiBob3VycylcbiAgfVxuICByZXR1cm4gMDsgLy9ncmVlblxufSJdfQ==
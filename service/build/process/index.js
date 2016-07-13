'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//get data here
var readFile = _bluebird2.default.promisifyAll(_fs2.default).readFileAsync;
var dataPromise = readFile('./service/build/process/mock-data.json');

var output = [];

dataPromise.then(function (fileContent) {
  return JSON.parse(fileContent).repos;
}).then(function (repos) {
  return _lodash2.default.filter(repos, function (r) {
    return r.pullRequests.length > 0;
  });
}).then(function (repos) {
  return _lodash2.default.map(repos, mapPRs);
}).then(function (PRs) {
  return _lodash2.default.flatten(PRs);
}).tap(console.log);

function mapPRs(repo) {
  return _lodash2.default.map(repo.pullRequests, function (PR) {

    PR.repo = repo.name;
    PR.link = PR.url;

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
  if (PR.assignees.length === 0) {
    return 10; //red: no assignees or stale
  }
  var yellow = 5; //yellow going stale (outstanding > 2 days or no comments from assignees yet && older than 16 hours)
  return 0; //green
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBLElBQUksV0FBVyxtQkFBUSxZQUFSLGVBQXlCLGFBQXhDO0FBQ0EsSUFBSSxjQUFjLFNBQVMsd0NBQVQsQ0FBbEI7O0FBRUEsSUFBSSxTQUFTLEVBQWI7O0FBRUEsWUFDRyxJQURILENBQ1EsVUFBQyxXQUFEO0FBQUEsU0FBaUIsS0FBSyxLQUFMLENBQVcsV0FBWCxFQUF3QixLQUF6QztBQUFBLENBRFIsRUFFRyxJQUZILENBRVEsVUFBQyxLQUFEO0FBQUEsU0FBVyxpQkFBRSxNQUFGLENBQVMsS0FBVCxFQUFnQixVQUFDLENBQUQ7QUFBQSxXQUFPLEVBQUUsWUFBRixDQUFlLE1BQWYsR0FBd0IsQ0FBL0I7QUFBQSxHQUFoQixDQUFYO0FBQUEsQ0FGUixFQUdHLElBSEgsQ0FHUSxVQUFDLEtBQUQ7QUFBQSxTQUFXLGlCQUFFLEdBQUYsQ0FBTSxLQUFOLEVBQWEsTUFBYixDQUFYO0FBQUEsQ0FIUixFQUlHLElBSkgsQ0FJUSxVQUFDLEdBQUQ7QUFBQSxTQUFTLGlCQUFFLE9BQUYsQ0FBVSxHQUFWLENBQVQ7QUFBQSxDQUpSLEVBS0csR0FMSCxDQUtPLFFBQVEsR0FMZjs7QUFPQSxTQUFTLE1BQVQsQ0FBZ0IsSUFBaEIsRUFBc0I7QUFDcEIsU0FBTyxpQkFBRSxHQUFGLENBQU0sS0FBSyxZQUFYLEVBQXlCLFVBQUMsRUFBRCxFQUFROztBQUV0QyxPQUFHLElBQUgsR0FBVSxLQUFLLElBQWY7QUFDQSxPQUFHLElBQUgsR0FBVSxHQUFHLEdBQWI7O0FBRUEsT0FBRyxTQUFILEdBQWUsaUJBQUUsR0FBRixDQUFNLEdBQUcsU0FBVCxFQUFvQixVQUFDLFFBQUQ7QUFBQSxhQUFjLFNBQVMsS0FBdkI7QUFBQSxLQUFwQixDQUFmO0FBQ0EsT0FBRyxLQUFILEdBQVcsU0FBUyxFQUFULENBQVg7O0FBRUEscUJBQUUsS0FBRixDQUFRLEVBQVIsRUFBWSxJQUFaO0FBQ0EscUJBQUUsS0FBRixDQUFRLEVBQVIsRUFBWSxRQUFaO0FBQ0EscUJBQUUsS0FBRixDQUFRLEVBQVIsRUFBWSxLQUFaOztBQUVBLFdBQU8sRUFBUDtBQUNELEdBYk0sQ0FBUDtBQWNEOztBQUVELFNBQVMsUUFBVCxDQUFrQixFQUFsQixFQUFzQjtBQUNwQixNQUFHLEdBQUcsU0FBSCxDQUFhLE1BQWIsS0FBd0IsQ0FBM0IsRUFBOEI7QUFDNUIsV0FBTyxFQUFQLENBQVc7QUFDWjtBQUNELE1BQUksU0FBUyxDQUFiLENBQWdCO0FBQ2hCLFNBQU8sQ0FBUCxDQUFVO0FBQ1giLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuLy9nZXQgZGF0YSBoZXJlXG5sZXQgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeUFsbChmcykucmVhZEZpbGVBc3luYztcbmxldCBkYXRhUHJvbWlzZSA9IHJlYWRGaWxlKCcuL3NlcnZpY2UvYnVpbGQvcHJvY2Vzcy9tb2NrLWRhdGEuanNvbicpO1xuXG5sZXQgb3V0cHV0ID0gW107XG5cbmRhdGFQcm9taXNlXG4gIC50aGVuKChmaWxlQ29udGVudCkgPT4gSlNPTi5wYXJzZShmaWxlQ29udGVudCkucmVwb3MpXG4gIC50aGVuKChyZXBvcykgPT4gXy5maWx0ZXIocmVwb3MsIChyKSA9PiByLnB1bGxSZXF1ZXN0cy5sZW5ndGggPiAwICkpXG4gIC50aGVuKChyZXBvcykgPT4gXy5tYXAocmVwb3MsIG1hcFBScykpXG4gIC50aGVuKChQUnMpID0+IF8uZmxhdHRlbihQUnMpKVxuICAudGFwKGNvbnNvbGUubG9nKTtcblxuZnVuY3Rpb24gbWFwUFJzKHJlcG8pIHtcbiAgcmV0dXJuIF8ubWFwKHJlcG8ucHVsbFJlcXVlc3RzLCAoUFIpID0+IHtcblxuICAgIFBSLnJlcG8gPSByZXBvLm5hbWU7XG4gICAgUFIubGluayA9IFBSLnVybDtcblxuICAgIFBSLmFzc2lnbmVlcyA9IF8ubWFwKFBSLmFzc2lnbmVlcywgKGFzc2lnbmVlKSA9PiBhc3NpZ25lZS5sb2dpbik7XG4gICAgUFIubGV2ZWwgPSBnZXRMZXZlbChQUik7XG5cbiAgICBfLnVuc2V0KFBSLCAnaWQnKTtcbiAgICBfLnVuc2V0KFBSLCAnbnVtYmVyJyk7XG4gICAgXy51bnNldChQUiwgJ3VybCcpO1xuXG4gICAgcmV0dXJuIFBSO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0TGV2ZWwoUFIpIHtcbiAgaWYoUFIuYXNzaWduZWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAxMDsgLy9yZWQ6IG5vIGFzc2lnbmVlcyBvciBzdGFsZVxuICB9XG4gIGxldCB5ZWxsb3cgPSA1OyAvL3llbGxvdyBnb2luZyBzdGFsZSAob3V0c3RhbmRpbmcgPiAyIGRheXMgb3Igbm8gY29tbWVudHMgZnJvbSBhc3NpZ25lZXMgeWV0ICYmIG9sZGVyIHRoYW4gMTYgaG91cnMpXG4gIHJldHVybiAwOyAvL2dyZWVuXG59Il19
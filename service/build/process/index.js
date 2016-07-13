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
var oneDay = 24 * 60 * 60 * 1000;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7O0FBR0EsSUFBSSxXQUFXLG1CQUFRLFlBQVIsZUFBeUIsYUFBeEM7QUFDQSxJQUFJLGNBQWMsU0FBUyx3Q0FBVCxDQUFsQjtBQUNBLElBQUksU0FBUyxLQUFLLEVBQUwsR0FBVSxFQUFWLEdBQWUsSUFBNUI7O0FBRUEsSUFBSSxTQUFTLEVBQWI7O0FBRUEsWUFDRyxJQURILENBQ1EsVUFBQyxXQUFEO0FBQUEsU0FBaUIsS0FBSyxLQUFMLENBQVcsV0FBWCxFQUF3QixLQUF6QztBQUFBLENBRFIsRUFFRyxJQUZILENBRVEsVUFBQyxLQUFEO0FBQUEsU0FBVyxpQkFBRSxNQUFGLENBQVMsS0FBVCxFQUFnQixVQUFDLENBQUQ7QUFBQSxXQUFPLEVBQUUsWUFBRixDQUFlLE1BQWYsR0FBd0IsQ0FBL0I7QUFBQSxHQUFoQixDQUFYO0FBQUEsQ0FGUixFQUdHLElBSEgsQ0FHUSxVQUFDLEtBQUQ7QUFBQSxTQUFXLGlCQUFFLEdBQUYsQ0FBTSxLQUFOLEVBQWEsTUFBYixDQUFYO0FBQUEsQ0FIUixFQUlHLElBSkgsQ0FJUSxVQUFDLEdBQUQ7QUFBQSxTQUFTLGlCQUFFLE9BQUYsQ0FBVSxHQUFWLENBQVQ7QUFBQSxDQUpSLEVBS0csR0FMSCxDQUtPLFFBQVEsR0FMZjs7QUFPQSxTQUFTLE1BQVQsQ0FBZ0IsSUFBaEIsRUFBc0I7QUFDcEIsU0FBTyxpQkFBRSxHQUFGLENBQU0sS0FBSyxZQUFYLEVBQXlCLFVBQUMsRUFBRCxFQUFROztBQUV0QyxPQUFHLElBQUgsR0FBVSxLQUFLLElBQWY7QUFDQSxPQUFHLEtBQUgsR0FBVyxHQUFHLEtBQUgsQ0FBUyxLQUFwQjtBQUNBLE9BQUcsSUFBSCxHQUFVLEdBQUcsR0FBYjtBQUNBLE9BQUcsUUFBSCxHQUFjLENBQUMsSUFBSSxJQUFKLEtBQWEsSUFBSSxJQUFKLENBQVMsR0FBRyxPQUFaLENBQWQsSUFBc0MsTUFBcEQ7QUFDQSxPQUFHLHFCQUFILEdBQTJCLENBQUMsSUFBSSxJQUFKLEtBQWEsSUFBSSxJQUFKLENBQVMsR0FBRyxPQUFaLENBQWQsSUFBc0MsTUFBakU7O0FBRUEsT0FBRyxTQUFILEdBQWUsaUJBQUUsR0FBRixDQUFNLEdBQUcsU0FBVCxFQUFvQixVQUFDLFFBQUQ7QUFBQSxhQUFjLFNBQVMsS0FBdkI7QUFBQSxLQUFwQixDQUFmO0FBQ0EsT0FBRyxLQUFILEdBQVcsU0FBUyxFQUFULENBQVg7O0FBRUEscUJBQUUsS0FBRixDQUFRLEVBQVIsRUFBWSxJQUFaO0FBQ0EscUJBQUUsS0FBRixDQUFRLEVBQVIsRUFBWSxRQUFaO0FBQ0EscUJBQUUsS0FBRixDQUFRLEVBQVIsRUFBWSxLQUFaOztBQUVBLFdBQU8sRUFBUDtBQUNELEdBaEJNLENBQVA7QUFpQkQ7O0FBRUQsU0FBUyxRQUFULENBQWtCLEVBQWxCLEVBQXNCO0FBQ3BCLE1BQUksYUFBYSxLQUFqQjtBQUNBLE1BQUcsR0FBRyxTQUFILENBQWEsTUFBYixLQUF3QixDQUF4QixJQUE2QixHQUFHLFFBQUgsR0FBYyxDQUE5QyxFQUFpRDtBQUMvQyxXQUFPLEVBQVAsQztBQUNEO0FBQ0QsTUFBRyxHQUFHLFFBQUgsR0FBYyxDQUFkLElBQW9CLEdBQUcsUUFBSCxHQUFjLENBQWQsSUFBbUIsVUFBMUMsRUFBdUQ7QUFDckQsV0FBTyxDQUFQLEM7QUFDRDtBQUNELFNBQU8sQ0FBUCxDO0FBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuLy9nZXQgZGF0YSBoZXJlXG5sZXQgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeUFsbChmcykucmVhZEZpbGVBc3luYztcbmxldCBkYXRhUHJvbWlzZSA9IHJlYWRGaWxlKCcuL3NlcnZpY2UvYnVpbGQvcHJvY2Vzcy9tb2NrLWRhdGEuanNvbicpO1xubGV0IG9uZURheSA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XG5cbmxldCBvdXRwdXQgPSBbXTtcblxuZGF0YVByb21pc2VcbiAgLnRoZW4oKGZpbGVDb250ZW50KSA9PiBKU09OLnBhcnNlKGZpbGVDb250ZW50KS5yZXBvcylcbiAgLnRoZW4oKHJlcG9zKSA9PiBfLmZpbHRlcihyZXBvcywgKHIpID0+IHIucHVsbFJlcXVlc3RzLmxlbmd0aCA+IDAgKSlcbiAgLnRoZW4oKHJlcG9zKSA9PiBfLm1hcChyZXBvcywgbWFwUFJzKSlcbiAgLnRoZW4oKFBScykgPT4gXy5mbGF0dGVuKFBScykpXG4gIC50YXAoY29uc29sZS5sb2cpO1xuXG5mdW5jdGlvbiBtYXBQUnMocmVwbykge1xuICByZXR1cm4gXy5tYXAocmVwby5wdWxsUmVxdWVzdHMsIChQUikgPT4ge1xuXG4gICAgUFIucmVwbyA9IHJlcG8ubmFtZTtcbiAgICBQUi5vd25lciA9IFBSLm93bmVyLmxvZ2luO1xuICAgIFBSLmxpbmsgPSBQUi51cmw7XG4gICAgUFIudGltZU9wZW4gPSAobmV3IERhdGUoKSAtIG5ldyBEYXRlKFBSLmNyZWF0ZWQpKSAvIG9uZURheTtcbiAgICBQUi50aW1lU2luY2VMYXN0TW9kaWZpZWQgPSAobmV3IERhdGUoKSAtIG5ldyBEYXRlKFBSLnVwZGF0ZWQpKSAvIG9uZURheTtcblxuICAgIFBSLmFzc2lnbmVlcyA9IF8ubWFwKFBSLmFzc2lnbmVlcywgKGFzc2lnbmVlKSA9PiBhc3NpZ25lZS5sb2dpbik7XG4gICAgUFIubGV2ZWwgPSBnZXRMZXZlbChQUik7XG5cbiAgICBfLnVuc2V0KFBSLCAnaWQnKTtcbiAgICBfLnVuc2V0KFBSLCAnbnVtYmVyJyk7XG4gICAgXy51bnNldChQUiwgJ3VybCcpO1xuXG4gICAgcmV0dXJuIFBSO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0TGV2ZWwoUFIpIHtcbiAgbGV0IG5vQ29tbWVudHMgPSBmYWxzZTtcbiAgaWYoUFIuYXNzaWduZWVzLmxlbmd0aCA9PT0gMCB8fCBQUi50aW1lT3BlbiA+IDMpIHtcbiAgICByZXR1cm4gMTA7IC8vcmVkOiBubyBhc3NpZ25lZXMgb3Igc3RhbGVcbiAgfVxuICBpZihQUi50aW1lT3BlbiA+IDIgfHwgKFBSLnRpbWVPcGVuID4gMSAmJiBub0NvbW1lbnRzKSkge1xuICAgIHJldHVybiA1OyAvL3llbGxvdyBnb2luZyBzdGFsZSAob3V0c3RhbmRpbmcgPiAyIGRheXMgb3Igbm8gY29tbWVudHMgZnJvbSBhc3NpZ25lZXMgeWV0ICYmIG9sZGVyIHRoYW4gMTYgaG91cnMpXG4gIH1cbiAgcmV0dXJuIDA7IC8vZ3JlZW5cbn0iXX0=
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
    return 10; //red
  }
  var yellow = void 0; //yellow
  return 0; //green
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7O0FBR0EsSUFBSSxXQUFXLG1CQUFRLFlBQVIsZUFBeUIsYUFBeEM7QUFDQSxJQUFJLGNBQWMsU0FBUyx3Q0FBVCxDQUFsQjs7QUFFQSxJQUFJLFNBQVMsRUFBYjs7QUFFQSxZQUNHLElBREgsQ0FDUSxVQUFDLFdBQUQ7QUFBQSxTQUFpQixLQUFLLEtBQUwsQ0FBVyxXQUFYLEVBQXdCLEtBQXpDO0FBQUEsQ0FEUixFQUVHLElBRkgsQ0FFUSxVQUFDLEtBQUQ7QUFBQSxTQUFXLGlCQUFFLE1BQUYsQ0FBUyxLQUFULEVBQWdCLFVBQUMsQ0FBRDtBQUFBLFdBQU8sRUFBRSxZQUFGLENBQWUsTUFBZixHQUF3QixDQUEvQjtBQUFBLEdBQWhCLENBQVg7QUFBQSxDQUZSLEVBR0csSUFISCxDQUdRLFVBQUMsS0FBRDtBQUFBLFNBQVcsaUJBQUUsR0FBRixDQUFNLEtBQU4sRUFBYSxNQUFiLENBQVg7QUFBQSxDQUhSLEVBSUcsSUFKSCxDQUlRLFVBQUMsR0FBRDtBQUFBLFNBQVMsaUJBQUUsT0FBRixDQUFVLEdBQVYsQ0FBVDtBQUFBLENBSlIsRUFLRyxHQUxILENBS08sUUFBUSxHQUxmOztBQU9BLFNBQVMsTUFBVCxDQUFnQixJQUFoQixFQUFzQjtBQUNwQixTQUFPLGlCQUFFLEdBQUYsQ0FBTSxLQUFLLFlBQVgsRUFBeUIsVUFBQyxFQUFELEVBQVE7QUFDdEMsT0FBRyxJQUFILEdBQVUsS0FBSyxJQUFmO0FBQ0EsT0FBRyxJQUFILEdBQVUsR0FBRyxHQUFiO0FBQ0EsT0FBRyxTQUFILEdBQWUsaUJBQUUsR0FBRixDQUFNLEdBQUcsU0FBVCxFQUFvQixVQUFDLFFBQUQ7QUFBQSxhQUFjLFNBQVMsS0FBdkI7QUFBQSxLQUFwQixDQUFmO0FBQ0EsT0FBRyxLQUFILEdBQVcsU0FBUyxFQUFULENBQVg7QUFDQSxxQkFBRSxLQUFGLENBQVEsRUFBUixFQUFZLElBQVo7QUFDQSxxQkFBRSxLQUFGLENBQVEsRUFBUixFQUFZLFFBQVo7QUFDQSxxQkFBRSxLQUFGLENBQVEsRUFBUixFQUFZLEtBQVo7QUFDQSxXQUFPLEVBQVA7QUFDRCxHQVRNLENBQVA7QUFVRDs7QUFFRCxTQUFTLFFBQVQsQ0FBa0IsRUFBbEIsRUFBc0I7QUFDcEIsTUFBRyxHQUFHLFNBQUgsQ0FBYSxNQUFiLEtBQXdCLENBQTNCLEVBQThCO0FBQzVCLFdBQU8sRUFBUCxDO0FBQ0Q7QUFDRCxNQUFJLGVBQUosQztBQUNBLFNBQU8sQ0FBUCxDO0FBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuLy9nZXQgZGF0YSBoZXJlXG5sZXQgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeUFsbChmcykucmVhZEZpbGVBc3luYztcbmxldCBkYXRhUHJvbWlzZSA9IHJlYWRGaWxlKCcuL3NlcnZpY2UvYnVpbGQvcHJvY2Vzcy9tb2NrLWRhdGEuanNvbicpO1xuXG5sZXQgb3V0cHV0ID0gW107XG5cbmRhdGFQcm9taXNlXG4gIC50aGVuKChmaWxlQ29udGVudCkgPT4gSlNPTi5wYXJzZShmaWxlQ29udGVudCkucmVwb3MpXG4gIC50aGVuKChyZXBvcykgPT4gXy5maWx0ZXIocmVwb3MsIChyKSA9PiByLnB1bGxSZXF1ZXN0cy5sZW5ndGggPiAwICkpXG4gIC50aGVuKChyZXBvcykgPT4gXy5tYXAocmVwb3MsIG1hcFBScykpXG4gIC50aGVuKChQUnMpID0+IF8uZmxhdHRlbihQUnMpKVxuICAudGFwKGNvbnNvbGUubG9nKTtcblxuZnVuY3Rpb24gbWFwUFJzKHJlcG8pIHtcbiAgcmV0dXJuIF8ubWFwKHJlcG8ucHVsbFJlcXVlc3RzLCAoUFIpID0+IHtcbiAgICBQUi5yZXBvID0gcmVwby5uYW1lO1xuICAgIFBSLmxpbmsgPSBQUi51cmw7XG4gICAgUFIuYXNzaWduZWVzID0gXy5tYXAoUFIuYXNzaWduZWVzLCAoYXNzaWduZWUpID0+IGFzc2lnbmVlLmxvZ2luKTtcbiAgICBQUi5sZXZlbCA9IGdldExldmVsKFBSKTtcbiAgICBfLnVuc2V0KFBSLCAnaWQnKTtcbiAgICBfLnVuc2V0KFBSLCAnbnVtYmVyJyk7XG4gICAgXy51bnNldChQUiwgJ3VybCcpO1xuICAgIHJldHVybiBQUjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldExldmVsKFBSKSB7XG4gIGlmKFBSLmFzc2lnbmVlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gMTA7IC8vcmVkXG4gIH1cbiAgbGV0IHllbGxvdzsgLy95ZWxsb3dcbiAgcmV0dXJuIDA7IC8vZ3JlZW5cbn0iXX0=
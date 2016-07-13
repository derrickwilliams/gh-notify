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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBLElBQUksV0FBVyxtQkFBUSxZQUFSLGVBQXlCLGFBQXhDO0FBQ0EsSUFBSSxjQUFjLFNBQVMsd0NBQVQsQ0FBbEI7QUFDQSxJQUFJLFNBQVMsS0FBSyxFQUFMLEdBQVUsRUFBVixHQUFlLElBQTVCOztBQUVBLElBQUksU0FBUyxFQUFiOztBQUVBLFlBQ0csSUFESCxDQUNRLFVBQUMsV0FBRDtBQUFBLFNBQWlCLEtBQUssS0FBTCxDQUFXLFdBQVgsRUFBd0IsS0FBekM7QUFBQSxDQURSLEVBRUcsSUFGSCxDQUVRLFVBQUMsS0FBRDtBQUFBLFNBQVcsaUJBQUUsTUFBRixDQUFTLEtBQVQsRUFBZ0IsVUFBQyxDQUFEO0FBQUEsV0FBTyxFQUFFLFlBQUYsQ0FBZSxNQUFmLEdBQXdCLENBQS9CO0FBQUEsR0FBaEIsQ0FBWDtBQUFBLENBRlIsRUFHRyxJQUhILENBR1EsVUFBQyxLQUFEO0FBQUEsU0FBVyxpQkFBRSxHQUFGLENBQU0sS0FBTixFQUFhLE1BQWIsQ0FBWDtBQUFBLENBSFIsRUFJRyxJQUpILENBSVEsVUFBQyxHQUFEO0FBQUEsU0FBUyxpQkFBRSxPQUFGLENBQVUsR0FBVixDQUFUO0FBQUEsQ0FKUixFQUtHLEdBTEgsQ0FLTyxRQUFRLEdBTGY7O0FBT0EsU0FBUyxNQUFULENBQWdCLElBQWhCLEVBQXNCO0FBQ3BCLFNBQU8saUJBQUUsR0FBRixDQUFNLEtBQUssWUFBWCxFQUF5QixVQUFDLEVBQUQsRUFBUTs7QUFFdEMsT0FBRyxJQUFILEdBQVUsS0FBSyxJQUFmO0FBQ0EsT0FBRyxLQUFILEdBQVcsR0FBRyxLQUFILENBQVMsS0FBcEI7QUFDQSxPQUFHLElBQUgsR0FBVSxHQUFHLEdBQWI7QUFDQSxPQUFHLFFBQUgsR0FBYyxDQUFDLElBQUksSUFBSixLQUFhLElBQUksSUFBSixDQUFTLEdBQUcsT0FBWixDQUFkLElBQXNDLE1BQXBEO0FBQ0EsT0FBRyxxQkFBSCxHQUEyQixDQUFDLElBQUksSUFBSixLQUFhLElBQUksSUFBSixDQUFTLEdBQUcsT0FBWixDQUFkLElBQXNDLE1BQWpFOztBQUVBLE9BQUcsU0FBSCxHQUFlLGlCQUFFLEdBQUYsQ0FBTSxHQUFHLFNBQVQsRUFBb0IsVUFBQyxRQUFEO0FBQUEsYUFBYyxTQUFTLEtBQXZCO0FBQUEsS0FBcEIsQ0FBZjtBQUNBLE9BQUcsS0FBSCxHQUFXLFNBQVMsRUFBVCxDQUFYOztBQUVBLHFCQUFFLEtBQUYsQ0FBUSxFQUFSLEVBQVksSUFBWjtBQUNBLHFCQUFFLEtBQUYsQ0FBUSxFQUFSLEVBQVksUUFBWjtBQUNBLHFCQUFFLEtBQUYsQ0FBUSxFQUFSLEVBQVksS0FBWjs7QUFFQSxXQUFPLEVBQVA7QUFDRCxHQWhCTSxDQUFQO0FBaUJEOztBQUVELFNBQVMsUUFBVCxDQUFrQixFQUFsQixFQUFzQjtBQUNwQixNQUFJLGFBQWEsS0FBakI7QUFDQSxNQUFHLEdBQUcsU0FBSCxDQUFhLE1BQWIsS0FBd0IsQ0FBeEIsSUFBNkIsR0FBRyxRQUFILEdBQWMsQ0FBOUMsRUFBaUQ7QUFDL0MsV0FBTyxFQUFQLENBQVc7QUFDWjtBQUNELE1BQUcsR0FBRyxRQUFILEdBQWMsQ0FBZCxJQUFvQixHQUFHLFFBQUgsR0FBYyxDQUFkLElBQW1CLFVBQTFDLEVBQXVEO0FBQ3JELFdBQU8sQ0FBUCxDQUFVO0FBQ1g7QUFDRCxTQUFPLENBQVAsQ0FBVTtBQUNYIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5cbi8vZ2V0IGRhdGEgaGVyZVxubGV0IHJlYWRGaWxlID0gUHJvbWlzZS5wcm9taXNpZnlBbGwoZnMpLnJlYWRGaWxlQXN5bmM7XG5sZXQgZGF0YVByb21pc2UgPSByZWFkRmlsZSgnLi9zZXJ2aWNlL2J1aWxkL3Byb2Nlc3MvbW9jay1kYXRhLmpzb24nKTtcbmxldCBvbmVEYXkgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xuXG5sZXQgb3V0cHV0ID0gW107XG5cbmRhdGFQcm9taXNlXG4gIC50aGVuKChmaWxlQ29udGVudCkgPT4gSlNPTi5wYXJzZShmaWxlQ29udGVudCkucmVwb3MpXG4gIC50aGVuKChyZXBvcykgPT4gXy5maWx0ZXIocmVwb3MsIChyKSA9PiByLnB1bGxSZXF1ZXN0cy5sZW5ndGggPiAwICkpXG4gIC50aGVuKChyZXBvcykgPT4gXy5tYXAocmVwb3MsIG1hcFBScykpXG4gIC50aGVuKChQUnMpID0+IF8uZmxhdHRlbihQUnMpKVxuICAudGFwKGNvbnNvbGUubG9nKTtcblxuZnVuY3Rpb24gbWFwUFJzKHJlcG8pIHtcbiAgcmV0dXJuIF8ubWFwKHJlcG8ucHVsbFJlcXVlc3RzLCAoUFIpID0+IHtcblxuICAgIFBSLnJlcG8gPSByZXBvLm5hbWU7XG4gICAgUFIub3duZXIgPSBQUi5vd25lci5sb2dpbjtcbiAgICBQUi5saW5rID0gUFIudXJsO1xuICAgIFBSLnRpbWVPcGVuID0gKG5ldyBEYXRlKCkgLSBuZXcgRGF0ZShQUi5jcmVhdGVkKSkgLyBvbmVEYXk7XG4gICAgUFIudGltZVNpbmNlTGFzdE1vZGlmaWVkID0gKG5ldyBEYXRlKCkgLSBuZXcgRGF0ZShQUi51cGRhdGVkKSkgLyBvbmVEYXk7XG5cbiAgICBQUi5hc3NpZ25lZXMgPSBfLm1hcChQUi5hc3NpZ25lZXMsIChhc3NpZ25lZSkgPT4gYXNzaWduZWUubG9naW4pO1xuICAgIFBSLmxldmVsID0gZ2V0TGV2ZWwoUFIpO1xuXG4gICAgXy51bnNldChQUiwgJ2lkJyk7XG4gICAgXy51bnNldChQUiwgJ251bWJlcicpO1xuICAgIF8udW5zZXQoUFIsICd1cmwnKTtcblxuICAgIHJldHVybiBQUjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldExldmVsKFBSKSB7XG4gIGxldCBub0NvbW1lbnRzID0gZmFsc2U7XG4gIGlmKFBSLmFzc2lnbmVlcy5sZW5ndGggPT09IDAgfHwgUFIudGltZU9wZW4gPiAzKSB7XG4gICAgcmV0dXJuIDEwOyAvL3JlZDogbm8gYXNzaWduZWVzIG9yIHN0YWxlXG4gIH1cbiAgaWYoUFIudGltZU9wZW4gPiAyIHx8IChQUi50aW1lT3BlbiA+IDEgJiYgbm9Db21tZW50cykpIHtcbiAgICByZXR1cm4gNTsgLy95ZWxsb3cgZ29pbmcgc3RhbGUgKG91dHN0YW5kaW5nID4gMiBkYXlzIG9yIG5vIGNvbW1lbnRzIGZyb20gYXNzaWduZWVzIHlldCAmJiBvbGRlciB0aGFuIDE2IGhvdXJzKVxuICB9XG4gIHJldHVybiAwOyAvL2dyZWVuXG59Il19
'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _retreive = require('../retreive');

var _retreive2 = _interopRequireDefault(_retreive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataPromise = (0, _retreive2.default)({ repo: 'cbax-' });

var oneDay = 24 * 60 * 60 * 1000;

dataPromise.then(function (repos) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksY0FBYyx3QkFBZ0IsRUFBRSxNQUFNLE9BQVIsRUFBaEIsQ0FBbEI7O0FBRUEsSUFBSSxTQUFTLEtBQUssRUFBTCxHQUFVLEVBQVYsR0FBZSxJQUE1Qjs7QUFFQSxZQUNHLElBREgsQ0FDUSxVQUFDLEtBQUQ7QUFBQSxTQUFXLGlCQUFFLE1BQUYsQ0FBUyxLQUFULEVBQWdCLFVBQUMsQ0FBRDtBQUFBLFdBQU8sRUFBRSxZQUFGLENBQWUsTUFBZixHQUF3QixDQUEvQjtBQUFBLEdBQWhCLENBQVg7QUFBQSxDQURSLEVBRUcsSUFGSCxDQUVRLFVBQUMsS0FBRDtBQUFBLFNBQVcsaUJBQUUsR0FBRixDQUFNLEtBQU4sRUFBYSxNQUFiLENBQVg7QUFBQSxDQUZSLEVBR0csSUFISCxDQUdRLFVBQUMsR0FBRDtBQUFBLFNBQVMsaUJBQUUsT0FBRixDQUFVLEdBQVYsQ0FBVDtBQUFBLENBSFIsRUFJRyxHQUpILENBSU8sUUFBUSxHQUpmOztBQU1BLFNBQVMsTUFBVCxDQUFnQixJQUFoQixFQUFzQjtBQUNwQixTQUFPLGlCQUFFLEdBQUYsQ0FBTSxLQUFLLFlBQVgsRUFBeUIsVUFBQyxFQUFELEVBQVE7O0FBRXRDLE9BQUcsSUFBSCxHQUFVLEtBQUssSUFBZjtBQUNBLE9BQUcsS0FBSCxHQUFXLEdBQUcsS0FBSCxDQUFTLEtBQXBCO0FBQ0EsT0FBRyxJQUFILEdBQVUsR0FBRyxHQUFiO0FBQ0EsT0FBRyxRQUFILEdBQWMsQ0FBQyxJQUFJLElBQUosS0FBYSxJQUFJLElBQUosQ0FBUyxHQUFHLE9BQVosQ0FBZCxJQUFzQyxNQUFwRDtBQUNBLE9BQUcscUJBQUgsR0FBMkIsQ0FBQyxJQUFJLElBQUosS0FBYSxJQUFJLElBQUosQ0FBUyxHQUFHLE9BQVosQ0FBZCxJQUFzQyxNQUFqRTs7QUFFQSxPQUFHLFNBQUgsR0FBZSxpQkFBRSxHQUFGLENBQU0sR0FBRyxTQUFULEVBQW9CLFVBQUMsUUFBRDtBQUFBLGFBQWMsU0FBUyxLQUF2QjtBQUFBLEtBQXBCLENBQWY7QUFDQSxPQUFHLEtBQUgsR0FBVyxTQUFTLEVBQVQsQ0FBWDs7QUFFQSxxQkFBRSxLQUFGLENBQVEsRUFBUixFQUFZLElBQVo7QUFDQSxxQkFBRSxLQUFGLENBQVEsRUFBUixFQUFZLFFBQVo7QUFDQSxxQkFBRSxLQUFGLENBQVEsRUFBUixFQUFZLEtBQVo7O0FBRUEsV0FBTyxFQUFQO0FBQ0QsR0FoQk0sQ0FBUDtBQWlCRDs7QUFFRCxTQUFTLFFBQVQsQ0FBa0IsRUFBbEIsRUFBc0I7QUFDcEIsTUFBSSxhQUFhLEtBQWpCO0FBQ0EsTUFBRyxHQUFHLFNBQUgsQ0FBYSxNQUFiLEtBQXdCLENBQXhCLElBQTZCLEdBQUcsUUFBSCxHQUFjLENBQTlDLEVBQWlEO0FBQy9DLFdBQU8sRUFBUCxDO0FBQ0Q7QUFDRCxNQUFHLEdBQUcsUUFBSCxHQUFjLENBQWQsSUFBb0IsR0FBRyxRQUFILEdBQWMsQ0FBZCxJQUFtQixVQUExQyxFQUF1RDtBQUNyRCxXQUFPLENBQVAsQztBQUNEO0FBQ0QsU0FBTyxDQUFQLEM7QUFDRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IGdldFJlcG9zaXRvcmllcyBmcm9tICcuLi9yZXRyZWl2ZSc7XG5cbmxldCBkYXRhUHJvbWlzZSA9IGdldFJlcG9zaXRvcmllcyh7IHJlcG86ICdjYmF4LScgfSlcblxubGV0IG9uZURheSA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XG5cbmRhdGFQcm9taXNlXG4gIC50aGVuKChyZXBvcykgPT4gXy5maWx0ZXIocmVwb3MsIChyKSA9PiByLnB1bGxSZXF1ZXN0cy5sZW5ndGggPiAwICkpXG4gIC50aGVuKChyZXBvcykgPT4gXy5tYXAocmVwb3MsIG1hcFBScykpXG4gIC50aGVuKChQUnMpID0+IF8uZmxhdHRlbihQUnMpKVxuICAudGFwKGNvbnNvbGUubG9nKTtcblxuZnVuY3Rpb24gbWFwUFJzKHJlcG8pIHtcbiAgcmV0dXJuIF8ubWFwKHJlcG8ucHVsbFJlcXVlc3RzLCAoUFIpID0+IHtcblxuICAgIFBSLnJlcG8gPSByZXBvLm5hbWU7XG4gICAgUFIub3duZXIgPSBQUi5vd25lci5sb2dpbjtcbiAgICBQUi5saW5rID0gUFIudXJsO1xuICAgIFBSLnRpbWVPcGVuID0gKG5ldyBEYXRlKCkgLSBuZXcgRGF0ZShQUi5jcmVhdGVkKSkgLyBvbmVEYXk7XG4gICAgUFIudGltZVNpbmNlTGFzdE1vZGlmaWVkID0gKG5ldyBEYXRlKCkgLSBuZXcgRGF0ZShQUi51cGRhdGVkKSkgLyBvbmVEYXk7XG5cbiAgICBQUi5hc3NpZ25lZXMgPSBfLm1hcChQUi5hc3NpZ25lZXMsIChhc3NpZ25lZSkgPT4gYXNzaWduZWUubG9naW4pO1xuICAgIFBSLmxldmVsID0gZ2V0TGV2ZWwoUFIpO1xuXG4gICAgXy51bnNldChQUiwgJ2lkJyk7XG4gICAgXy51bnNldChQUiwgJ251bWJlcicpO1xuICAgIF8udW5zZXQoUFIsICd1cmwnKTtcblxuICAgIHJldHVybiBQUjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldExldmVsKFBSKSB7XG4gIGxldCBub0NvbW1lbnRzID0gZmFsc2U7XG4gIGlmKFBSLmFzc2lnbmVlcy5sZW5ndGggPT09IDAgfHwgUFIudGltZU9wZW4gPiAzKSB7XG4gICAgcmV0dXJuIDEwOyAvL3JlZDogbm8gYXNzaWduZWVzIG9yIHN0YWxlXG4gIH1cbiAgaWYoUFIudGltZU9wZW4gPiAyIHx8IChQUi50aW1lT3BlbiA+IDEgJiYgbm9Db21tZW50cykpIHtcbiAgICByZXR1cm4gNTsgLy95ZWxsb3cgZ29pbmcgc3RhbGUgKG91dHN0YW5kaW5nID4gMiBkYXlzIG9yIG5vIGNvbW1lbnRzIGZyb20gYXNzaWduZWVzIHlldCAmJiBvbGRlciB0aGFuIDE2IGhvdXJzKVxuICB9XG4gIHJldHVybiAwOyAvL2dyZWVuXG59Il19
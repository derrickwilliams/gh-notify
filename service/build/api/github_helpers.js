'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchByName = searchByName;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _githubApi = require('github-api');

var _githubApi2 = _interopRequireDefault(_githubApi);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function searchByName(_ref) {
  var name = _ref.name;
  var _ref$client = _ref.client;
  var client = _ref$client === undefined ? defaultClient() : _ref$client;

  var srch = client.search({ q: name + ' in:name' });
  return prms(srch.forRepositories()).get('data').then(function (repos) {
    return (0, _lodash.filter)(repos, function (r) {
      return r.owner.login === 'cbdr';
    });
  });
}

function prms(lamePromise) {
  // make a better promise
  return _bluebird2.default.resolve(lamePromise);
}

function defaultClient() {
  var auth = { token: process.env.GH_NOTIFY_AUTH_TOKEN };
  return new _githubApi2.default(auth);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvZ2l0aHViX2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFJZ0IsWSxHQUFBLFk7O0FBSmhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVPLFNBQVMsWUFBVCxPQUF5RDtBQUFBLE1BQWpDLElBQWlDLFFBQWpDLElBQWlDO0FBQUEseUJBQTNCLE1BQTJCO0FBQUEsTUFBM0IsTUFBMkIsK0JBQWxCLGVBQWtCOztBQUM5RCxNQUFJLE9BQU8sT0FBTyxNQUFQLENBQWMsRUFBRSxHQUFNLElBQU4sYUFBRixFQUFkLENBQVg7QUFDQSxTQUFPLEtBQUssS0FBSyxlQUFMLEVBQUwsRUFDSixHQURJLENBQ0EsTUFEQSxFQUVKLElBRkksQ0FFQztBQUFBLFdBQVMsb0JBQU8sS0FBUCxFQUFjLFVBQUMsQ0FBRDtBQUFBLGFBQU8sRUFBRSxLQUFGLENBQVEsS0FBUixLQUFrQixNQUF6QjtBQUFBLEtBQWQsQ0FBVDtBQUFBLEdBRkQsQ0FBUDtBQUdEOztBQUVELFNBQVMsSUFBVCxDQUFjLFdBQWQsRUFBMkI7O0FBRXpCLFNBQU8sbUJBQVEsT0FBUixDQUFnQixXQUFoQixDQUFQO0FBQ0Q7O0FBRUQsU0FBUyxhQUFULEdBQXlCO0FBQ3ZCLE1BQU0sT0FBTyxFQUFFLE9BQU8sUUFBUSxHQUFSLENBQVksb0JBQXJCLEVBQWI7QUFDQSxTQUFPLHdCQUFXLElBQVgsQ0FBUDtBQUNEIiwiZmlsZSI6ImdpdGh1Yl9oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IEdpdGh1YiBmcm9tICdnaXRodWItYXBpJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hCeU5hbWUoeyBuYW1lLCBjbGllbnQgPSBkZWZhdWx0Q2xpZW50KCl9KSB7XG4gIGxldCBzcmNoID0gY2xpZW50LnNlYXJjaCh7IHE6IGAke25hbWV9IGluOm5hbWVgIH0pO1xuICByZXR1cm4gcHJtcyhzcmNoLmZvclJlcG9zaXRvcmllcygpKVxuICAgIC5nZXQoJ2RhdGEnKVxuICAgIC50aGVuKHJlcG9zID0+IGZpbHRlcihyZXBvcywgKHIpID0+IHIub3duZXIubG9naW4gPT09ICdjYmRyJykpO1xufVxuXG5mdW5jdGlvbiBwcm1zKGxhbWVQcm9taXNlKSB7XG4gIC8vIG1ha2UgYSBiZXR0ZXIgcHJvbWlzZVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGxhbWVQcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdENsaWVudCgpIHtcbiAgY29uc3QgYXV0aCA9IHsgdG9rZW46IHByb2Nlc3MuZW52LkdIX05PVElGWV9BVVRIX1RPS0VOIH07XG4gIHJldHVybiBuZXcgR2l0aHViKGF1dGgpO1xufSJdfQ==
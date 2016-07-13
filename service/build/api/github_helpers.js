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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvZ2l0aHViX2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFJZ0IsWSxHQUFBLFk7O0FBSmhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVPLFNBQVMsWUFBVCxPQUF5RDtBQUFBLE1BQWpDLElBQWlDLFFBQWpDLElBQWlDO0FBQUEseUJBQTNCLE1BQTJCO0FBQUEsTUFBM0IsTUFBMkIsK0JBQWxCLGVBQWtCOztBQUM5RCxNQUFJLE9BQU8sT0FBTyxNQUFQLENBQWMsRUFBRSxHQUFNLElBQU4sYUFBRixFQUFkLENBQVg7QUFDQSxTQUFPLEtBQUssS0FBSyxlQUFMLEVBQUwsRUFDSixHQURJLENBQ0EsTUFEQSxFQUVKLElBRkksQ0FFQztBQUFBLFdBQVMsb0JBQU8sS0FBUCxFQUFjLFVBQUMsQ0FBRDtBQUFBLGFBQU8sRUFBRSxLQUFGLENBQVEsS0FBUixLQUFrQixNQUF6QjtBQUFBLEtBQWQsQ0FBVDtBQUFBLEdBRkQsQ0FBUDtBQUdEOztBQUVELFNBQVMsSUFBVCxDQUFjLFdBQWQsRUFBMkI7QUFDekI7QUFDQSxTQUFPLG1CQUFRLE9BQVIsQ0FBZ0IsV0FBaEIsQ0FBUDtBQUNEOztBQUVELFNBQVMsYUFBVCxHQUF5QjtBQUN2QixNQUFNLE9BQU8sRUFBRSxPQUFPLFFBQVEsR0FBUixDQUFZLG9CQUFyQixFQUFiO0FBQ0EsU0FBTyx3QkFBVyxJQUFYLENBQVA7QUFDRCIsImZpbGUiOiJnaXRodWJfaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBHaXRodWIgZnJvbSAnZ2l0aHViLWFwaSc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoQnlOYW1lKHsgbmFtZSwgY2xpZW50ID0gZGVmYXVsdENsaWVudCgpfSkge1xuICBsZXQgc3JjaCA9IGNsaWVudC5zZWFyY2goeyBxOiBgJHtuYW1lfSBpbjpuYW1lYCB9KTtcbiAgcmV0dXJuIHBybXMoc3JjaC5mb3JSZXBvc2l0b3JpZXMoKSlcbiAgICAuZ2V0KCdkYXRhJylcbiAgICAudGhlbihyZXBvcyA9PiBmaWx0ZXIocmVwb3MsIChyKSA9PiByLm93bmVyLmxvZ2luID09PSAnY2JkcicpKTtcbn1cblxuZnVuY3Rpb24gcHJtcyhsYW1lUHJvbWlzZSkge1xuICAvLyBtYWtlIGEgYmV0dGVyIHByb21pc2VcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShsYW1lUHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRDbGllbnQoKSB7XG4gIGNvbnN0IGF1dGggPSB7IHRva2VuOiBwcm9jZXNzLmVudi5HSF9OT1RJRllfQVVUSF9UT0tFTiB9O1xuICByZXR1cm4gbmV3IEdpdGh1YihhdXRoKTtcbn0iXX0=
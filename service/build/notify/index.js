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

function notifyHipchat(params) {
  console.log('params:', params);

  var hipchatter = new _hipchatter2.default('X7qQU0XPSjNn86rj6eLcZEX4tQ1rm6hojP7tLFuq');
  var colors = {
    'normal': 'green',
    'urgent': 'red'
  };

  params = params || {
    pullRequests: [{
      link: 'https://github.com/cbdr/cbax-apply-platform/pull/271',
      title: 'Add redirect to CB',
      id: 271,
      assignees: ['derrickwilliams', 'mmoldavan'],
      level: 'normal'
    }]
  };

  (0, _lodash.forEach)(params.pullRequests, sendNotifcation);
  function sendNotifcation(request) {
    hipchatter.notify('CBAX Scrum', {
      message: '<b>PR:</b>: <a href="' + request.link + '">' + request.title + ' ' + request.id + '</a><br/><b>Assignees:</b> ' + request.assignees,
      color: colors[request.level],
      token: '7b6FlCfiFjgVaNpgM3YLOBNeJ3FxIgR2Tq1BC1Jp'
    }, function (err) {
      if (err == null) console.log('Successfully notified the room.');
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub3RpZnkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBSXdCLGE7O0FBSnhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVlLFNBQVMsYUFBVCxDQUF1QixNQUF2QixFQUErQjtBQUM1QyxVQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXNCLE1BQXRCOztBQUVBLE1BQUksYUFBYSx5QkFBZSwwQ0FBZixDQUFqQjtBQUNBLE1BQUksU0FBUztBQUNYLGNBQVUsT0FEQztBQUVYLGNBQVU7QUFGQyxHQUFiOztBQUtBLFdBQVMsVUFBVTtBQUNqQixrQkFBYyxDQUFDO0FBQ2IsWUFBTSxzREFETztBQUViLGFBQU8sb0JBRk07QUFHYixVQUFJLEdBSFM7QUFJYixpQkFBVyxDQUFDLGlCQUFELEVBQW1CLFdBQW5CLENBSkU7QUFLYixhQUFPO0FBTE0sS0FBRDtBQURHLEdBQW5COztBQVVBLHVCQUFRLE9BQU8sWUFBZixFQUE2QixlQUE3QjtBQUNBLFdBQVMsZUFBVCxDQUF5QixPQUF6QixFQUFrQztBQUNoQyxlQUFXLE1BQVgsQ0FBa0IsWUFBbEIsRUFDSTtBQUNJLGVBQVMsMEJBQXlCLFFBQVEsSUFBakMsR0FBdUMsSUFBdkMsR0FBOEMsUUFBUSxLQUF0RCxHQUE4RCxHQUE5RCxHQUFvRSxRQUFRLEVBQTVFLEdBQWlGLDZCQUFqRixHQUErRyxRQUFRLFNBRHBJO0FBRUksYUFBTyxPQUFPLFFBQVEsS0FBZixDQUZYO0FBR0ksYUFBTztBQUhYLEtBREosRUFLTyxVQUFTLEdBQVQsRUFBYTtBQUNaLFVBQUksT0FBTyxJQUFYLEVBQWlCLFFBQVEsR0FBUixDQUFZLGlDQUFaO0FBQ3hCLEtBUEQ7QUFRRDs7Ozs7Ozs7O0FBU0gsU0FBTyxtQkFBUSxPQUFSLEVBQVA7Ozs7Ozs7Ozs7QUFhQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIaXBjaGF0dGVyIGZyb20gJ2hpcGNoYXR0ZXInO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdGlmeUhpcGNoYXQocGFyYW1zKSB7XG4gIGNvbnNvbGUubG9nKCdwYXJhbXM6JyxwYXJhbXMpO1xuXG4gIGxldCBoaXBjaGF0dGVyID0gbmV3IEhpcGNoYXR0ZXIoJ1g3cVFVMFhQU2pObjg2cmo2ZUxjWkVYNHRRMXJtNmhvalA3dExGdXEnKTtcbiAgbGV0IGNvbG9ycyA9IHtcbiAgICAnbm9ybWFsJzogJ2dyZWVuJyxcbiAgICAndXJnZW50JzogJ3JlZCcgIFxuICB9O1xuXG4gIHBhcmFtcyA9IHBhcmFtcyB8fCB7XG4gICAgcHVsbFJlcXVlc3RzOiBbe1xuICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9jYmRyL2NiYXgtYXBwbHktcGxhdGZvcm0vcHVsbC8yNzEnLFxuICAgICAgdGl0bGU6ICdBZGQgcmVkaXJlY3QgdG8gQ0InLFxuICAgICAgaWQ6IDI3MSxcbiAgICAgIGFzc2lnbmVlczogWydkZXJyaWNrd2lsbGlhbXMnLCdtbW9sZGF2YW4nXSxcbiAgICAgIGxldmVsOiAnbm9ybWFsJ1xuICAgIH1dXG4gIH1cblxuICBmb3JFYWNoKHBhcmFtcy5wdWxsUmVxdWVzdHMsIHNlbmROb3RpZmNhdGlvbilcbiAgZnVuY3Rpb24gc2VuZE5vdGlmY2F0aW9uKHJlcXVlc3QpIHtcbiAgICBoaXBjaGF0dGVyLm5vdGlmeSgnQ0JBWCBTY3J1bScsIFxuICAgICAgICB7XG4gICAgICAgICAgICBtZXNzYWdlOiAnPGI+UFI6PC9iPjogPGEgaHJlZj1cIicrIHJlcXVlc3QubGluayArJ1wiPicgKyByZXF1ZXN0LnRpdGxlICsgJyAnICsgcmVxdWVzdC5pZCArICc8L2E+PGJyLz48Yj5Bc3NpZ25lZXM6PC9iPiAnK3JlcXVlc3QuYXNzaWduZWVzLFxuICAgICAgICAgICAgY29sb3I6IGNvbG9yc1tyZXF1ZXN0LmxldmVsXSxcbiAgICAgICAgICAgIHRva2VuOiAnN2I2RmxDZmlGamdWYU5wZ00zWUxPQk5lSjNGeElnUjJUcTFCQzFKcCdcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgIGlmIChlcnIgPT0gbnVsbCkgY29uc29sZS5sb2coJ1N1Y2Nlc3NmdWxseSBub3RpZmllZCB0aGUgcm9vbS4nKTtcbiAgICB9KTtcbiAgfVxuLypoaXBjaGF0dGVyLm5vdGlmeSgnQ0JBWCBTY3J1bScsIFxuICAgIHtcbiAgICAgICAgbWVzc2FnZTogJzxiPk91dHN0YW5kaW5nIFB1bGxyZXF1ZXN0PC9iPjogPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9jYmRyL2NiYXgtYXBwbHktcGxhdGZvcm0vcHVsbC8yNzFcIj5BZGQgcmVkaXJlY3QgdG8gQ0IgIzI3MTwvYT48YnIvPjxiPkFzc2lnbmVlczo8L2I+IGRlcnJpY2t3aWxsaWFtcycsXG4gICAgICAgIGNvbG9yOiAnZ3JlZW4nLFxuICAgICAgICB0b2tlbjogJzdiNkZsQ2ZpRmpnVmFOcGdNM1lMT0JOZUozRnhJZ1IyVHExQkMxSnAnXG4gICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgaWYgKGVyciA9PSBudWxsKSBjb25zb2xlLmxvZygnU3VjY2Vzc2Z1bGx5IG5vdGlmaWVkIHRoZSByb29tLicpO1xufSk7Ki9cbnJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgLypyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcXVlc3Qoe1xuICAgIHVybDogJ2h0dHBzOi8vYXBpLmhpcGNoYXQuY29tL3YyL3Jvb20vQ0JBWCBTY3J1bS9ub3RpZmNhdGlvbicsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ2NvbnRlbnQtdHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfSxcbiAgICBib2R5OiB7XG4gICAgICBmcm9tOiAnQWRtaXJhbCBQdWdkYWxmJyxcblxuICAgIH1cblxuICB9KSkqL1xuXG59Il19
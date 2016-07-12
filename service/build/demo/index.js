'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('../api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use('/github', _api.github);

app.listen(12121, function () {
  return console.log('listening', 12121);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZW1vL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUVBLElBQU0sTUFBTSx3QkFBWjs7QUFFQSxJQUFJLEdBQUosQ0FBUSxTQUFSOztBQUVBLElBQUksTUFBSixDQUFXLEtBQVgsRUFBa0I7QUFBQSxTQUFNLFFBQVEsR0FBUixDQUFZLFdBQVosRUFBeUIsS0FBekIsQ0FBTjtBQUFBLENBQWxCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcydcbmltcG9ydCB7IGdpdGh1YiB9IGZyb20gJy4uL2FwaSdcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG5hcHAudXNlKCcvZ2l0aHViJywgZ2l0aHViKVxuXG5hcHAubGlzdGVuKDEyMTIxLCAoKSA9PiBjb25zb2xlLmxvZygnbGlzdGVuaW5nJywgMTIxMjEpKTsiXX0=
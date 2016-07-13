'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _retreive = require('../build/retreive');

var _retreive2 = _interopRequireDefault(_retreive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/github/repos', function (req, res) {
  (0, _retreive2.default)(req.query).tap(function (repos) {
    return _fs2.default.writeFileSync((0, _path.join)(__dirname, 'full_response.json'), JSON.stringify(repos, null, 2));
  }).then(function (repos) {
    return res.json({ repos: repos });
  }).catch(function (err) {
    return res.status(500).json({ error: err.toString() });
  });
});

app.listen(12121, function () {
  return console.log('listening', 12121);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxNQUFNLHdCQUFaOztBQUVBLElBQUksR0FBSixDQUFRLGVBQVIsRUFBeUIsVUFBQyxHQUFELEVBQU0sR0FBTixFQUFjO0FBQ3JDLDBCQUFnQixJQUFJLEtBQXBCLEVBQ0csR0FESCxDQUNPO0FBQUEsV0FBUyxhQUFHLGFBQUgsQ0FBaUIsZ0JBQUssU0FBTCxFQUFnQixvQkFBaEIsQ0FBakIsRUFBd0QsS0FBSyxTQUFMLENBQWUsS0FBZixFQUFzQixJQUF0QixFQUE0QixDQUE1QixDQUF4RCxDQUFUO0FBQUEsR0FEUCxFQUVHLElBRkgsQ0FFUTtBQUFBLFdBQVMsSUFBSSxJQUFKLENBQVMsRUFBRSxZQUFGLEVBQVQsQ0FBVDtBQUFBLEdBRlIsRUFHRyxLQUhILENBR1M7QUFBQSxXQUFPLElBQUksTUFBSixDQUFXLEdBQVgsRUFBZ0IsSUFBaEIsQ0FBcUIsRUFBRSxPQUFPLElBQUksUUFBSixFQUFULEVBQXJCLENBQVA7QUFBQSxHQUhUO0FBSUQsQ0FMRDs7QUFPQSxJQUFJLE1BQUosQ0FBVyxLQUFYLEVBQWtCO0FBQUEsU0FBTSxRQUFRLEdBQVIsQ0FBWSxXQUFaLEVBQXlCLEtBQXpCLENBQU47QUFBQSxDQUFsQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBnZXRSZXBvc2l0b3JpZXMgZnJvbSAnLi4vYnVpbGQvcmV0cmVpdmUnO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbmFwcC5nZXQoJy9naXRodWIvcmVwb3MnLCAocmVxLCByZXMpID0+IHtcbiAgZ2V0UmVwb3NpdG9yaWVzKHJlcS5xdWVyeSlcbiAgICAudGFwKHJlcG9zID0+IGZzLndyaXRlRmlsZVN5bmMoam9pbihfX2Rpcm5hbWUsICdmdWxsX3Jlc3BvbnNlLmpzb24nKSwgSlNPTi5zdHJpbmdpZnkocmVwb3MsIG51bGwsIDIpKSlcbiAgICAudGhlbihyZXBvcyA9PiByZXMuanNvbih7IHJlcG9zIH0pKVxuICAgIC5jYXRjaChlcnIgPT4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogZXJyLnRvU3RyaW5nKCkgfSkpXG59KVxuXG5hcHAubGlzdGVuKDEyMTIxLCAoKSA9PiBjb25zb2xlLmxvZygnbGlzdGVuaW5nJywgMTIxMjEpKTtcbiJdfQ==
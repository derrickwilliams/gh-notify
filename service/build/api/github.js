'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _github_helpers = require('./github_helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/search/repos', function (req, res) {
  var repoQuery = req.query.repo;

  if ((0, _lodash.isEmpty)(repoQuery)) return res.status(400).json({ error: 'Missing query' });

  (0, _github_helpers.searchByName)({ name: repoQuery }).then(function (results) {
    return res.status(200).json({ results: results });
  }).catch(function (err) {
    return res.status(500).json({ error: err.toString() });
  });
});

exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvZ2l0aHViLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNLE1BQU0sd0JBQVo7O0FBRUEsSUFBSSxHQUFKLENBQVEsZUFBUixFQUF5QixVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQWM7QUFBQSxNQUNoQixTQURnQixHQUNBLEdBREEsQ0FDL0IsS0FEK0IsQ0FDdEIsSUFEc0I7O0FBRXJDLE1BQUkscUJBQU0sU0FBTixDQUFKLEVBQXNCLE9BQU8sSUFBSSxNQUFKLENBQVcsR0FBWCxFQUFnQixJQUFoQixDQUFxQixFQUFFLE9BQU8sZUFBVCxFQUFyQixDQUFQOztBQUV0QixvQ0FBYSxFQUFFLE1BQU0sU0FBUixFQUFiLEVBQ0csSUFESCxDQUNRO0FBQUEsV0FBVyxJQUFJLE1BQUosQ0FBVyxHQUFYLEVBQWdCLElBQWhCLENBQXFCLEVBQUUsZ0JBQUYsRUFBckIsQ0FBWDtBQUFBLEdBRFIsRUFFRyxLQUZILENBRVM7QUFBQSxXQUFPLElBQUksTUFBSixDQUFXLEdBQVgsRUFBZ0IsSUFBaEIsQ0FBcUIsRUFBRSxPQUFPLElBQUksUUFBSixFQUFULEVBQXJCLENBQVA7QUFBQSxHQUZUO0FBR0QsQ0FQRDs7a0JBU2UsRyIsImZpbGUiOiJnaXRodWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IHsgaXNFbXB0eSBhcyBlbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBzZWFyY2hCeU5hbWUgfSBmcm9tICcuL2dpdGh1Yl9oZWxwZXJzJztcblxuY29uc3QgYXBwID0gZXhwcmVzcygpXG5cbmFwcC5nZXQoJy9zZWFyY2gvcmVwb3MnLCAocmVxLCByZXMpID0+IHtcbiAgbGV0IHsgcXVlcnk6IHsgcmVwbzogcmVwb1F1ZXJ5IH0gfSA9IHJlcVxuICBpZiAoZW1wdHkocmVwb1F1ZXJ5KSkgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdNaXNzaW5nIHF1ZXJ5JyB9KVxuXG4gIHNlYXJjaEJ5TmFtZSh7IG5hbWU6IHJlcG9RdWVyeSB9KVxuICAgIC50aGVuKHJlc3VsdHMgPT4gcmVzLnN0YXR1cygyMDApLmpzb24oeyByZXN1bHRzIH0pKVxuICAgIC5jYXRjaChlcnIgPT4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogZXJyLnRvU3RyaW5nKCkgfSkpXG59KVxuXG5leHBvcnQgZGVmYXVsdCBhcHA7XG5cbiJdfQ==
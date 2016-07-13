/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackMissingModule() { throw new Error("Cannot find module \"/Users/mmoldavan/Desktop/Development/Node/gh-notify/src/ui/index.js\""); }());
	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var join = __webpack_require__(2).join;

	var ENTRY = join(__dirname, './src/ui/index.js');

	var OUTPUT_DIRECTORY = join(__dirname, 'build/ui');
	var OUTPUT_FILENAME = 'main.js';

	if (process.env.PICKER_BUILD_ENV === 'production') {
	  OUTPUT_FILENAME = 'main.min.js';
	}

	module.exports = {
	  entry: ENTRY,
	  output: {
	    path: OUTPUT_DIRECTORY,
	    filename: OUTPUT_FILENAME
	  },
	  module: {
	    noParse: [/aws-sdk/],
	    loaders: [{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }, { test: /\.css$/, loader: 'style!css' }, { test: /\.styl$/, loader: 'style!css!stylus-loader' }]
	  },

	  externals: {
	    lodash: '_',
	    angular: 'angular'
	  },
	  target: 'electron'

	};
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ }
/******/ ]);
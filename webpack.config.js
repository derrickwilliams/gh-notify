var join = require('path').join;

var ENTRY = join(__dirname, './src/ui/index.js');

var OUTPUT_DIRECTORY = join(__dirname, 'build/ui');
var OUTPUT_FILENAME = 'main.js'


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
    noParse:[/aws-sdk/],
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.styl$/, loader: 'style!css!stylus-loader'}
    ]
  },

  externals: {
    lodash: '_',
    angular: 'angular'
  },
  target: 'electron'

};

var path = require('path');
var config = {
  entry: path.resolve(__dirname, 'build/jsx/Login.jsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }]
  }
};

module.exports = config;
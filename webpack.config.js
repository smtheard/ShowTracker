var path = require('path');
var config = {
  entry: {
    login: './build/jsx/Login.jsx',
    register: './build/jsx/Register.jsx',
    app: './build/jsx/App.jsx'
  },
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
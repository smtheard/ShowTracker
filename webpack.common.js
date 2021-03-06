const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: "./npm_deps_webpack_entry.js",
    plugins: [
        new CleanWebpackPlugin(['static/js/bundle.js', 'static/js/bundle.js.gz'])
    ],
    output: {
        path: __dirname + "/static/js",
        filename: "bundle.js"
    }
};

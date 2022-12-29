/**
 * Configuration file for development
 */

const path = require('path');
const port = 1338;
const openBrowser = false;

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        filename: "dist/bundle.js",
        path: path.resolve(__dirname, 'build'),
        publicPath: "/",
    },
    devServer: {
        port: port,
        open: openBrowser,
        host: 'localhost',
        //historyApiFallback: {
        //    index: 'index.html',
        //},

        static: 'public',
    }
};

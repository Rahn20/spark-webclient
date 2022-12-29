/**
 * Configuration for the production code
*/

const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    plugins: [],
    output: {
        filename: 'dist/bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: "/",
    }
};

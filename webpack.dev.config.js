/**
 * Configuration file for development
 */

const path = require('path');
//const webpack = require('webpack');

const port = 1338;
const openBrowser = false;


const rules = [
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    },
    {
        test: /\.(png|svg|jpg|ico|gif)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ]
    }
];


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        filename: "dist/bundle.js",
        path: path.resolve(__dirname, 'build'),
        publicPath: "/",
    },
    module: {
        rules: rules
    },

    devServer: {
        port: port,
        open: openBrowser,
        host: 'localhost',
        historyApiFallback: {
            index: 'index.html',
        },
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true,
        compress: true,
    },
};

/**
 * Configuration file for development
 */


const path = require("path");
const dotenv = require("dotenv-webpack");

const port = 1338;
const openBrowser = false;

const rules = [
    {
        test: /\.css$/,
        use: [
            "style-loader",
            "css-loader"
        ]
    },
    {
        test: /\.(png|svg|jpg|ico|gif)$/,
        use: [
            {
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                },
            },
        ]
    },
];


module.exports = {
    mode: "development",
    entry: {
        filename: "./src/index.js",
    },
    devtool: "source-map",
    output: {
        filename: "dist/bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
    },
    module: {
        rules: rules
    },

    plugins: [ new dotenv() ],

    devServer: {

        headers: {
            "Content-Security-Policy": "default-src 'self' http://localhost:1337 http://localhost; connect-src 'self' http://localhost:1337 http://localhost;  font-src *; style-src *; img-src * data: content:; script-src-elem 'self' https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.3/js/bootstrap.min.js",
        },
        port: port,
        open: openBrowser,
        host: "localhost",
        historyApiFallback: {
            index: "index.html",
        },
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true,
        compress: false,
    },

    watchOptions: {
        //poll: 1000,
    }
};

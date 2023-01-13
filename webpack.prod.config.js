/**
 * Configuration for the production code
*/

const path = require('path');


const rules = [
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    },
    {
        test: /\.(png|svg|jpg|gif)$/,
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
    mode: 'production',
    entry: './src/index.js',
    plugins: [],
    output: {
        filename: 'dist/bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: "/",
    },
    module: {
        rules: rules
    }
};

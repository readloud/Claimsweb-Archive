const webpack = require('webpack');
const path = require('./src/');
var config = {
    entry: './App.js',

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 8080
    },
    resolveLoader: {
        modules: [path.join(__dirname, 'node_modules')]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
}

module.exports = config

'use strict'
const path = require('path');
const webpack = require('webpack');

function resolve(...paths) {
    return path.resolve(__dirname, ...paths);
}

const plugins = [
];

module.exports = {
    mode: process.env.NODE_ENV,

    plugins,

    resolve: {
        alias: {
            '@': resolve('src'),
            '@wp-console': resolve('src/wp-console'),
        }
    },

    optimization: {
        splitChunks: {
            maxInitialRequests: Infinity,
            maxAsyncRequests: Infinity,
            minSize: 0
        }
    },

    entry: {
        'wp-console': './src/wp-console/main.js',
    },

    output: {
        filename: '[name].js',
        path: resolve('assets/js'),
        chunkFilename: 'chunks/[chunkhash].js',
    },

    module: {
        rules: [
        ]
    }
}

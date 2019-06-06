'use strict'
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(...paths) {
    return path.resolve(__dirname, ...paths);
}

function isProduction() {
    return process.env.NODE_ENV === 'production';
}

const plugins = [
    new webpack.ProvidePlugin({
        $: 'jQuery'
    }),

    new MiniCssExtractPlugin({
      filename: '../css/[name].css'
    }),
];

module.exports = {
    mode: process.env.NODE_ENV,

    externals: {
        jQuery: 'jQuery'
    },

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
        path: resolve('assets/js')
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
}

'use strict';
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

function resolve( ...paths ) {
    return path.resolve( __dirname, ...paths );
}

const plugins = [
    new MiniCssExtractPlugin( {
        filename: '../css/[name].css',
    } ),

    new DependencyExtractionWebpackPlugin(),
];

module.exports = {
    mode: process.env.NODE_ENV,

    plugins,

    resolve: {
        alias: {
            '@': resolve( 'src' ),
            '@wp-console': resolve( 'src/wp-console' ),
        },
        extensions: [ '*', '.js', '.jsx' ],
    },

    optimization: {
        splitChunks: {
            maxInitialRequests: Infinity,
            maxAsyncRequests: Infinity,
            minSize: 0,
        },
    },

    entry: {
        'wp-console': './src/wp-console/main.js',
    },

    output: {
        filename: '[name].js',
        path: resolve( 'assets/js' ),
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            formatter: require( 'eslint-friendly-formatter' ),
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
};

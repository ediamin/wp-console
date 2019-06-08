'use strict';
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const StyleLintPlugin = require( 'stylelint-webpack-plugin' );

function resolve( ...paths ) {
    return path.resolve( __dirname, ...paths );
}

const plugins = [
    new MiniCssExtractPlugin( {
        filename: '../css/[name].css',
    } ),

    new DependencyExtractionWebpackPlugin(),

    new StyleLintPlugin( {
        configFile: path.resolve( './.stylelintrc.json' ),
        files: [
            'src/wp-console/scss/**/*.scss',
        ],
    } ),
];

module.exports = {
    mode: process.env.NODE_ENV,

    plugins,

    resolve: {
        alias: {
            '@': resolve( 'src' ),
            '@wp-console': resolve( 'src/wp-console' ),
            bootstrap: resolve( 'node_modules/bootstrap/scss' ),
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

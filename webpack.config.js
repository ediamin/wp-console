const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

function resolve( ...paths ) {
    return path.resolve( __dirname, ...paths );
}

const plugins = [
    new MiniCssExtractPlugin( {
        filename: '../css/[name].css',
    } ),

    ...defaultConfig.plugins,
];

module.exports = {
    ...defaultConfig,

    plugins,

    resolve: {
        alias: {
            ...defaultConfig.resolve.alias,
            '.@': resolve( 'src' ),
        },
    },

    module: {
        ...defaultConfig.module,

        rules: [
            ...defaultConfig.module.rules,

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

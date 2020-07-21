const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const LiveReloadPlugin = require( 'webpack-livereload-plugin' );
const plugins = [];

function resolve( ...paths ) {
    return path.resolve( __dirname, ...paths );
}

defaultConfig.plugins.forEach( ( item ) => {
    if ( item instanceof MiniCssExtractPlugin ) {
        item.options.filename = '../css/[name].css';
    }

    if ( item instanceof LiveReloadPlugin ) {
        return;
    }

    plugins.push( item );
} );

module.exports = {
    ...defaultConfig,

    plugins,

    output: {
        filename: '[name].js',
        path: resolve( 'assets', 'js' ),
        chunkFilename: 'chunks/[chunkhash].js',
        jsonpFunction: 'wpConsoleWebpack'
    },

    resolve: {
        alias: {
            ...defaultConfig.resolve.alias,
            '.@': resolve( 'src' ),
        },
    },
};

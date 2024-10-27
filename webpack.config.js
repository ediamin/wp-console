const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

function resolve( ...paths ) {
    return path.resolve( __dirname, ...paths );
}

const plugins = defaultConfig.plugins.map( ( plugin ) => {
    if ( plugin.constructor.name.toLowerCase() === 'minicssextractplugin' ) {
        plugin.options.filename = '../css/[name].css';
        plugin.options.chunkFilename = '../css/[name].css';
        plugin.options.esModule = true;
    }

    return plugin;
} );

module.exports = {
    ...defaultConfig,

    plugins,

    devtool: 'source-map',

    entry: {
        'wp-console': resolve( 'src/wp-console.js' ),
    },

    output: {
        filename: '[name].js',
        path: resolve( 'assets', 'js' ),
        chunkFilename: 'chunks/[chunkhash].js',
        chunkLoadingGlobal: 'wpConsoleWebpack',
    },
};

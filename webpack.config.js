const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

function resolve( ...paths ) {
    return path.resolve( __dirname, ...paths );
}

const plugins = defaultConfig.plugins
    .filter(
        ( plugin ) =>
            plugin.constructor.name !== 'DependencyExtractionWebpackPlugin'
    )
    .map( ( plugin ) => {
        if (
            plugin.constructor.name.toLowerCase() === 'minicssextractplugin'
        ) {
            plugin.options.filename = '../css/[name].css';
            plugin.options.chunkFilename = '../css/[name].css';
            plugin.options.esModule = true;
        }

        return plugin;
    } );

// Re-add DependencyExtractionWebpackPlugin with overrides to bundle
// react/jsx-runtime instead of externalizing it. This ensures compatibility
// with WordPress < 6.6, which does not register the react-jsx-runtime script.
//
// Returning `false` (not `undefined`) from requestToExternal is critical:
// the plugin only falls through to its defaults when the return value is
// strictly `undefined`, so `false` stops the cascade and keeps the module
// bundled rather than externalized.
plugins.push(
    new DependencyExtractionWebpackPlugin( {
        requestToExternal( request ) {
            if ( request === 'react/jsx-runtime' ) {
                return false;
            }
        },
    } )
);

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

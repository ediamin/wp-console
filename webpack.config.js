const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const defaultPlugins = defaultConfig.plugins.filter(plugin => {
    const pluginName = plugin.constructor.name.toLowerCase();
    return pluginName !== 'minicssextractplugin' && pluginName !== 'livereloadplugin';
});

module.exports = {
    ...defaultConfig,

    entry: {
        ...getWebpackEntryPoints(),
        'wp-console': path.resolve(process.cwd(), 'src', 'wp-console.js'),
    },

    output: {
        filename: '[name].js',
        path: path.resolve(process.cwd(), 'assets', 'js'),
        chunkFilename: 'chunks/[chunkhash].js',
        chunkLoadingGlobal: 'wpConsoleWebpack',
    },

    plugins: [
        ...defaultPlugins,
        new MiniCssExtractPlugin({
            filename: '../css/[name].css',
            chunkFilename: '../css/[name].css',
        }),
        // Add any other custom plugins here
    ],

    resolve: {
        ...defaultConfig.resolve,
        alias: {
            ...defaultConfig.resolve.alias,
            '@': path.resolve(process.cwd(), 'src'),
        },
    },

    optimization: {
        ...defaultConfig.optimization,
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    test: /node_modules/,
                    priority: 20,
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true,
                },
            },
        },
    },
};

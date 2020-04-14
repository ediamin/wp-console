const defaultConfig = require( '@wordpress/scripts/config/.eslintrc' );

module.exports = {
    ...defaultConfig,
    rules: {
        ...defaultConfig.rules,
        '@wordpress/dependency-group': 'error',
    },
    globals: {
        wpConsole: true,
        ace: true,
    },
};

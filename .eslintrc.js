const defaultConfig = require( '@wordpress/scripts/config/.eslintrc' );
const prettierConfig = require( './.prettierrc.js' );

module.exports = {
    ...defaultConfig,
    rules: {
        ...defaultConfig.rules,
        '@wordpress/dependency-group': 'error',
        'prettier/prettier': [ 'error', prettierConfig ],
    },
    globals: {
        wpConsole: true,
        ace: true,
    },
};

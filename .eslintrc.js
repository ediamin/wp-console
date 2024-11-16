const defaultConfig = require( '@wordpress/scripts/config/.eslintrc' );
const prettierConfig = require( './.prettierrc.js' );

module.exports = {
    ...defaultConfig,
    rules: {
        'prettier/prettier': [ 'error', prettierConfig ],
        'no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true,
            },
        ],
        '@wordpress/i18n-text-domain': [
            'error',
            {
                allowedTextDomain: [ 'wp-console' ],
            },
        ],
    },
    globals: {
        wpConsole: true,
        wpConsoleAce: true,
    },
    overrides: [
        {
            files: [ 'tests/**/*.js' ],
            extends: [
                'plugin:jest-dom/recommended',
                'plugin:testing-library/react',
                'plugin:jest/recommended',
            ],
            globals: {
                page: true,
                navigator: true,
                browser: true,
            },
        },
    ],
};

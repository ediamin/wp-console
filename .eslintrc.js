const defaultConfig = require( '@wordpress/scripts/config/.eslintrc.js' );

module.exports = {
    ...defaultConfig,
    rules: {
        '@wordpress/dependency-group': 'error',
        'indent': [ 'error', 4 ],
        'react/jsx-indent': [ 'error', 4 ],
        'react/jsx-indent-props': [ 'error', 4 ],
    }
};

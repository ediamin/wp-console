const baseConfig = require( '@wordpress/scripts/config/jest-e2e.config' );

module.exports = {
    ...baseConfig,
    testTimeout: 100000,
};

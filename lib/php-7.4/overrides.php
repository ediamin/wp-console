<?php

if ( defined( 'WP_CLI' ) && constant( 'WP_CLI' ) ) {
    return;
}

require_once __DIR__ . '/overrides/symfony/console/Color.php';
require_once __DIR__ . '/../overrides.php';

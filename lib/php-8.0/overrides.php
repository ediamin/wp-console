<?php

if ( defined( 'WP_CLI' ) && constant( 'WP_CLI' ) ) {
    return;
}

require_once __DIR__ . '/Core/Console/VarDumper/Dumper/WPConsoleDumper.php';
require_once __DIR__ . '/overrides/symfony/console/Color.php';
require_once __DIR__ . '/overrides/psy/psysh/src/VarDumper/Dumper.php';
require_once __DIR__ . '/overrides/psy/psysh/src/Output/ShellOutput.php';
require_once __DIR__ . '/overrides/psy/psysh/src/Shell.php';
require_once __DIR__ . '/../overrides.php';

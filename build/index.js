/* eslint-disable no-console */
const fs = require( 'fs' );
const path = require( 'path' );
const minimist = require( 'minimist' );
const shell = require( 'shelljs' );

function resolve( ...paths ) {
    return path.resolve( __dirname, ...paths );
}

const DEST = resolve( 'wp-console' );
const packageInfo = JSON.parse( fs.readFileSync( 'package.json' ) );
const args = minimist( process.argv.slice( 2 ) );

let version = packageInfo.version;

const semverRegex = /^((([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$/;

if ( args.version && args.version.match( semverRegex ) ) {
    const currentVersion = version;
    version = args.version;

    console.log( 'Updating plugin version number' );
    [
        `sed -i '' '3s/"version": "${ currentVersion }"/"version": "${ version }"/' package.json`,
        `sed -i '' '3s/"version": "${ currentVersion }"/"version": "${ version }"/' package-lock.json`,
        `sed -i '' 's/* Version: ${ currentVersion }/* Version: ${ version }/g' wp-console.php`,
        `sed -i "" "s/= '${ currentVersion }'/= '${ version }'/g" includes/WPConsole.php`,
        `find includes -iname '*.php' -exec sed -i "" "s/WP_CONSOLE_SINCE/${ version }/g" {} \\\;`,
    ].forEach( ( command ) => {
        shell.exec( command );
    } );
}

const zip = `wp-console-${ version }.zip`;

shell.rm( '-rf', DEST );
shell.rm( '-f', resolve( 'wp-console-*.zip' ) );
shell.mkdir( '-p', DEST );

const include = [
    'assets',
    'includes',
    'languages',
    'vendor',
    'README.md',
    'composer.json',
    'index.php',
    'license.txt',
    'readme.txt',
    'wp-console.php',
];

console.log( 'Copying files...' );
include.forEach( ( item ) => {
    shell.cp( '-r', resolve( '../', item ), resolve( DEST, item ) );
} );

// Remove unnecessary directories and files.
[
    'vendor/jakub-onderka/php-console-color/.gitignore',
    'vendor/jakub-onderka/php-console-color/.travis.yml',
    'vendor/jakub-onderka/php-console-color/build.xml',
    'vendor/jakub-onderka/php-console-color/example.php',
    'vendor/jakub-onderka/php-console-color/phpunit.xml',
    'vendor/jakub-onderka/php-console-color/tests',
    'vendor/jakub-onderka/php-console-highlighter/.gitignore',
    'vendor/jakub-onderka/php-console-highlighter/.travis.yml',
    'vendor/jakub-onderka/php-console-highlighter/build.xml',
    'vendor/jakub-onderka/php-console-highlighter/examples',
    'vendor/jakub-onderka/php-console-highlighter/phpunit.xml',
    'vendor/jakub-onderka/php-console-highlighter/tests',
    'vendor/nikic/php-parser/.gitignore',
    'vendor/nikic/php-parser/.travis.yml',
    'vendor/nikic/php-parser/CHANGELOG.md',
    'vendor/nikic/php-parser/UPGRADE-1.0.md',
    'vendor/nikic/php-parser/UPGRADE-2.0.md',
    'vendor/nikic/php-parser/UPGRADE-3.0.md',
    'vendor/nikic/php-parser/doc',
    'vendor/nikic/php-parser/phpunit.xml.dist',
    'vendor/nikic/php-parser/test',
    'vendor/nikic/php-parser/test_old',
    'vendor/psr/log/.gitignore',
    'vendor/psr/log/Psr/Log/Test',
    'vendor/psy/psysh/.editorconfig',
    'vendor/psy/psysh/.github',
    'vendor/psy/psysh/.gitignore',
    'vendor/psy/psysh/.phan',
    'vendor/psy/psysh/.php_cs',
    'vendor/psy/psysh/.styleci.yml',
    'vendor/psy/psysh/.travis.yml',
    'vendor/psy/psysh/phpunit.xml.dist',
    'vendor/psy/psysh/test',
    'vendor/symfony/console/.gitignore',
    'vendor/symfony/console/Tester',
    'vendor/symfony/console/Tests',
    'vendor/symfony/console/phpunit.xml.dist',
    'vendor/symfony/debug/.gitignore',
    'vendor/symfony/debug/CHANGELOG.md',
    'vendor/symfony/debug/Tests',
    'vendor/symfony/debug/phpunit.xml.dist',
    'vendor/symfony/var-dumper/.gitignore',
    'vendor/symfony/var-dumper/CHANGELOG.md',
    'vendor/symfony/var-dumper/Test',
    'vendor/symfony/var-dumper/Tests',
    'vendor/symfony/var-dumper/phpunit.xml.dist',
].forEach( ( deletePath ) => {
    shell.rm( '-rf', resolve( DEST, deletePath ) );
} );

console.log( 'Making zip...' );
shell.exec( `cd ${ resolve() } && zip ${ zip } wp-console -rq` );

shell.rm( '-rf', resolve( DEST ) );
console.log( 'Done.' );

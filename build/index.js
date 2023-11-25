/* eslint-disable no-console */
const fs = require( 'fs' );
const path = require( 'path' );
const minimist = require( 'minimist' );
const shell = require( 'shelljs' );
const semvar = require( 'semver' );

function resolve( ...paths ) {
    return path.resolve( __dirname, ...paths );
}

const DEST = resolve( 'wp-console' );
const packageInfo = JSON.parse( fs.readFileSync( 'package.json' ) );
const args = minimist( process.argv.slice( 2 ) );

let version = packageInfo.version;

if ( args.version && semvar.valid( args.version ) ) {
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
    'compat',
    'includes',
    'languages',
    'lib',
    'README.md',
    'index.php',
    'license.txt',
    'readme.txt',
    'wp-console.php',
];

console.log( 'Copying files...' );
include.forEach( ( item ) => {
    shell.cp( '-r', resolve( '../', item ), resolve( DEST, item ) );
} );

console.log( 'Making zip...' );
shell.exec( `cd ${ resolve() } && zip ${ zip } wp-console -rq` );

shell.rm( '-rf', resolve( DEST ) );
console.log( 'Done.' );

import { activatePlugin, deactivatePlugin } from '@wordpress/e2e-test-utils';
import semver from 'semver';

describe( 'WP Console plugin e2e tests.', () => {
    async function clearEditor() {
        await page.evaluate( () => {
            const editor = wpConsoleAce.edit( 'wp-console-code-editor' );
            editor.setValue( '' );
            editor.focus();
            editor.gotoLine( 2 );
        } );
    }

    async function getPHPVersion() {
        const phpVersion = await page.evaluate( () => wpConsole.php_version );

        if ( semver.satisfies( phpVersion, '8.2' ) ) {
            return '8.2';
        }

        return '5.6';
    }

    test( 'Activate the plugin without any error.', async () => {
        await activatePlugin( 'wp-console' );
        expect( await page.$( '#wp-console' ) ).toBeTruthy();
    } );

    test( 'Click the Console menu item in admin bar to open the console.', async () => {
        await page.click( '#wp-admin-bar-wp-console > div' );
        expect(
            await page.waitForSelector( '#wp-console.active .ace_content' )
        ).toBeTruthy();
    } );

    test( 'Type PHP code and execute.', async () => {
        const code = `echo 'foo';`;
        await page.keyboard.type( code );
        await page.click( '#wp-console-console-run-button' );
        await page.waitForSelector( '#wp-console-editor-output' );
        const content = await page.evaluate(
            () =>
                document.getElementById( 'wp-console-editor-output' )
                    .children[ 1 ].textContent
        );

        expect( content ).toContain( 'foo' );
    } );

    test( 'Autocompletion for WordPress functions.', async () => {
        await clearEditor();
        await page.keyboard.press( 'ArrowDown' );
        const code = `wp_insert_p`;
        await page.keyboard.type( code );
        await page.waitForTimeout( 100 );
        const content = await page.evaluate(
            () =>
                document.querySelector(
                    '.ace_autocomplete .ace_line.ace_selected'
                ).textContent
        );

        expect( content ).toContain( 'wp_insert_post WP Function' );
    } );

    test( 'Copy Output button.', async () => {
        // Permission to read the text from clipboard is required.
        const context = browser.defaultBrowserContext();
        context.overridePermissions( 'http://localhost:8889', [
            'clipboard-read',
        ] );

        await clearEditor();
        const code = `get_admin_url();`;
        await page.keyboard.type( code );
        await page.click( '#wp-console-console-run-button' );
        await page.waitForSelector( '#wp-console-editor-output' );
        await page.click( '#wp-console-copy-output-button' );

        const copiedText = await page.evaluate( () =>
            navigator.clipboard.readText()
        );

        expect( copiedText ).toEqual( '"http://localhost:8889/wp-admin/"\n' );
    } );

    test( 'Catch errors in the code and show it as an error notice.', async () => {
        await clearEditor();
        const code = `$a = 1;\necho $a + $b;`;
        await page.keyboard.type( code );
        await page.click( '#wp-console-console-run-button' );
        await page.waitForSelector(
            '#wp-console-app-notice > .components-notice.is-error.is-dismissible'
        );

        const content = await page.evaluate(
            () =>
                document.querySelector(
                    '#wp-console-app-notice .components-notice__content'
                ).textContent
        );

        const phpVersion = await getPHPVersion();

        const expectedContent = {
            5.6: "PHP Notice:  Undefined variable: b in /var/www/html/wp-content/plugins/wp-console/includes/Core/Console/RestController.php(139) : eval()'d code on line 3",
            8.2: "PHP Warning:  Undefined variable $b in /var/www/html/wp-content/plugins/wp-console/includes/Core/Console/RestController.php(139) : eval()'d code on line 3",
        };

        expect( content ).toContain( expectedContent[ phpVersion ] );
    } );

    test( 'Dectivate the plugin without any error.', async () => {
        await deactivatePlugin( 'wp-console' );
        expect( await page.$( '#wp-console' ) ).toBeFalsy();
    } );
} );

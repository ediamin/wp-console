import { activatePlugin, deactivatePlugin } from '@wordpress/e2e-test-utils';

describe( 'WP Console plugin e2e tests.', () => {
    async function clearEditor() {
        await page.evaluate( () => {
            const editor = ace.edit( 'wp-console-code-editor' );
            editor.setValue( '' );
            editor.focus();
            editor.gotoLine( 2 );
        } );
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

        expect( content ).toContain( 'foo⏎' );
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

        expect( content ).toContain( 'wp_insert_postWP Function' );
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

        expect( copiedText ).toEqual( 'http://localhost:8889/wp-admin/' );
    } );

    test( 'Dectivate the plugin without any error.', async () => {
        await deactivatePlugin( 'wp-console' );
        expect( await page.$( '#wp-console' ) ).toBeFalsy();
    } );
} );
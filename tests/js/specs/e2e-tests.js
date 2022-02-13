import { activatePlugin, deactivatePlugin } from '@wordpress/e2e-test-utils';

describe( 'WP Console plugin e2e tests.', () => {
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

    test( 'Type PHP code and execute', async () => {
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

    test( 'Autocompletion for WordPress functions', async () => {
        await page.evaluate( () => {
            const editor = ace.edit( 'wp-console-code-editor' );
            editor.focus();
            editor.setValue( '' );
            editor.focus();
        } );

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

    test( 'Dectivate the plugin without any error.', async () => {
        await deactivatePlugin( 'wp-console' );
        expect( await page.$( '#wp-console' ) ).toBeFalsy();
    } );
} );

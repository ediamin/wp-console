=== WP Console - WordPress PHP Console powered by PsySH ===
Contributors: ediamin
Tags: console, repl, browser, psysh, shell, dump
Requires at least: 5.3.12
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 2.5.0
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

An in-browser PHP console for WordPress powered by PsySH

== Description ==
WP Console brings the renowned PsySH directly to your browser. PsySH serves as a runtime developer console, an interactive debugger, and a PHP REPL (Read-Eval-Print Loop).

To utilize WP Console, simply write your code within the code editor, then press Cmd-Enter (mac) or Ctrl-Enter (win/linux) to instantly view the output in your browser.

Moreover, you have the option to employ PsySH alongside wp-cli by executing the command `wp shell`. Notably, wp-cli comes with inherent compatibility for psysh. All that is required is the activation of WP Console to leverage this feature.

== Features ==
- Powerful code editor powered by Ace Editor.
- Real-time autocompletion for PHP core and WordPress functions, complete with placeholders.
- Introducing `_dump` as a more versatile alternative to `var_dump`, leveraging the capabilities of Symfony VarDumper.
- Instant access to debug.log contents, with the added convenience of clearing them directly from your browser.
- Enhanced shell experience courtesy of psySH, facilitating advanced interaction through `wp shell`.
- Customizable code snippet functionality, compatible with VS Code supported code snippets. Explore examples like these [WooCommerce snippets](https://github.com/claudiosanches/vscode-woocommerce/blob/master/snippets/functions.json).

Please note that certain PsySH commands, such as `ls`, `doc`, `show`, and magic variables like `$_`, `$__class`, are not currently supported in the browser console.

👉 WP Console uses Gutenberg packages and components to ensure a seamless and user-friendly UI/UX.

== Getting Started ==
To begin using the plugin, follow these steps:

1. Activate the plugin within your WordPress setup.
2. Look for a quick link labeled "Console" in the WP Admin Bar on the right-hand side (see the second screenshot below).
3. Click on the "Console" link to access the WP Console panel.

== Security Concern ==
WP Console explicitly verifies the presence of the `manage_options` permission to render the user interface and execute various functions. However, it's important to note that this plugin is not intended for use on a production server.

== Screenshots ==

1. Basic input output
2. How to open the browser console
3. _dump command
4. Vertical splitted window
5. Live Autocompletion
6. Autocompletion with placeholder
7. Display errors
8. wp shell command
9. Get debug.log contents
10. Clear debug.log
11. Add/Edit custom snippets
12. Custom snippets in action

== Changelog ==

2.4.1 - November 13, 2023
* Fix deprecation notice in PHP 8.2 related to strtolower argument type.
* Add an admin submenu under the tools menu to open the console window.
* Update WordPress compatibility to the latest version 6.4.2.

2.4.0 - August 09, 2023
* Add support for PHP 8.0+.
* Update Ace Editor version to 1.23.4.

2.3.1 - July 31, 2022
* Update script version of ace.

2.3.0 - July 27, 2022
* Add code execution time in console output panel.
* Use ace.js with custom namespace to avoid conflict with other ace.js source.
* Fix snippet manager module style.
* Use verticle split as default in console panel.
* Fix error handling for PHP v5.6.
* Fix some UI issues in different WordPress versions.
* Add wp-env and e2e testing with Jest using wp-scripts for developing the plugin.

2.2.0 - November 22, 2020
* Add custom code snippet support. You can use VS Code supported PHP code snippets now.
* Add Copy Output button.
* Enqueue scripts only for manage_options capability owners.
* Improve handling uncaught fatal errors.
* Add Twenty Twenty theme compatibility.
* Set default values for user Console settings in REST API.
* Fix horizontal output scolling issue for vertically split console.
* Fix close button get disappear in WooCommerce admin pages.
* Fix error line no in console editor.

2.1.0 - April 14, 2020
* Lazy load React components to improve performance.
* Use a single store source for all components.
* Reset console responses after close app window.
* Fix navigation button icon css for WP v5.4.
* Resize editor screen after toggle split mode.

2.0.0 - December 11, 2019
* Revamp UI/UX.
* Add Ace editor as code editor plugin. Remove CodeMirror.
* Live autocompletion with placeholders.
* Option to vertically split editor and output window.
* Add ability to clear debug.log.
* Restrict plugin UI and REST APIs for users who have manage_options capability.

1.5.0 - November 07, 2019
* Tweak - Change `dump` function name to `_dump` to resolve conflict with wp-erp.

1.4.0 - November 02, 2019
* New - Save code editor history in localStorage.
* Tweak - Use wp-scripts for assets build process.

1.3.0 - October 26, 2019
* New - Fetch debug.log contents.
* Tweak - Support PHP version 5.6.

1.2.0 - July 27, 2019
* New - Add autocompletion data(WP functions, PHP booleans, constants, functions, keywords).
* New - Add codemirror closebrackets, matchbrackets addon scripts.
* New - Show error stacktrace.

1.1.0 - June 25, 2019
* New - Use output buffer handler.
* New - Add build process.
* Tweak - Remove unnecessary code.

1.0.0 - June 21, 2019
Initial release.

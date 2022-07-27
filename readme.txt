=== WP Console - WordPress PHP Console powered by PsySH ===
Contributors: ediamin
Tags: console, repl, browser, psysh, shell, dump
Requires at least: 5.3.12
Tested up to: 6.0.1
Requires PHP: 5.6
Stable tag: trunk
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

An in-browser PHP console for WordPress powered by PsySH

== Description ==
WP Console brings the famous PsySH on your browser. PsySH is a runtime developer console, interactive debugger and REPL for PHP.

Write your code in code editor, press Cmd-Enter(mac) or Ctrl-Enter(win/linux) and get your output in your browser.

You can also use PsySH with wp-cli with the command `wp shell`. wp-cli has built-in support for psysh already. You need to just activate WP Console to use this.

=== Features ==
- Powerful code editor powered by Ace Editor.
- PHP core and WordPress functions live autocompletion with placeholders.
- `_dump` as the alternative to `var_dump` which uses Symfony VarDumper.
- Get debug.log contents and clear them right from your browser.
- Advanced shell powered by psySH for `wp shell`.
- Custom code snippet. Supports VS Code supported code snippets. For example you can use [this WooCommerce snippets](https://github.com/claudiosanches/vscode-woocommerce/blob/master/snippets/functions.json).

Please note that, currently PsySH commands like `ls`, `doc`, `show` etc and Magic variables like `$_`, `$__class` etc are not supported in browser console.

👉 WP Console uses Gutenberg packages and components for its UI/UX. Checkout the GitHub repo here [ediamin/wp-console](https://github.com/ediamin/wp-console).

== Security Concern ==
WP Console explicitly checks for `manage_options` permission to display the UI and perform other actions. Yet, this plugin should not be used in production server.

== Screenshots ==

1. Basic input output
2. _dump command
3. Vertical splitted window
4. Live Autocompletion
5. Autocompletion with placeholder
6. Display errors
7. wp shell command
8. Get debug.log contents
9. Clear debug.log
10. Add/Edit custom snippets
11. Custom snippets in action

== Changelog ==

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

=== WP Console - WordPress PHP Console powered by PsySH ===
Contributors: ediamin
Tags: console, repl, browser, psysh, shell, dump
Requires at least: 5.0
Tested up to: 5.3
Requires PHP: 5.6
Stable tag: trunk
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

WordPress PHP Console powered by PsySH

== Description ==
WP Console brings the famous PsySH on your browser. PsySH is a runtime developer console, interactive debugger and REPL for PHP.

Write your code in code editor, press `Shift+Enter` and get your output in your browser.

You can also use PsySH with wp-cli with the command `wp shell`. wp-cli has built-in support for psysh already. You need to just active WP Console to use this.

WP Console requires WordPress v5.0 or later.

Please note that, currently PsySH commands like `ls`, `doc`, `show` etc and Magic variables like `$_`, `$__class` etc are not supported in browser console.

👉 GitHub Repo: [wp-console](https://github.com/ediamin/wp-console)

== Screenshots ==

1. Basic input/output
2. dump command
3. Error in code
4. wp shell command
5. Browser console UI

== Changelog ==

1.5.0 - November 07, 2019
* Tweak - Change `dump` function name to `_dump` to resolve conflict with wp-erp

1.4.0 - November 02, 2019
* New - Save code editor history in localStorage
* Tweak - Use wp-scripts for assets build process

1.3.0 - October 26, 2019
* New - Fetch debug.log contents
* Tweak - Support PHP version 5.6

1.2.0 - July 27, 2019
* New - Add autocompletion data(WP functions, PHP booleans, constants, functions, keywords)
* New - Add codemirror closebrackets, matchbrackets addon scripts
* New - Show error stacktrace

1.1.0 - June 25, 2019
* New - Use output buffer handler
* New - Add build process
* Tweak - Remove unnecessary code

1.0.0 - June 21, 2019
Initial release

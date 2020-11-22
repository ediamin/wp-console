# WP Console - WordPress PHP Console powered by PsySH

### Description
WP Console brings the famous PsySH on your browser. PsySH is a runtime developer console, interactive debugger and REPL for PHP.

Write your code in code editor, press Cmd-Enter(mac) or Ctrl-Enter(win/linux) and get your output in your browser.

You can also use PsySH with wp-cli with the command `wp shell`. wp-cli has built-in support for psysh already. You need to just activate WP Console to use this.

WP Console requires WordPress v5.0 or later.

[Download the plugin from wordpress.org](https://wordpress.org/plugins/wp-console/)

### Features
- Powerful code editor powered by Ace Editor.
- PHP core and WordPress functions live autocompletion with placeholders.
- `_dump` as the alternative to `var_dump` which uses Symfony VarDumper.
- Get debug.log contents and clear them right from your browser.
- Advanced shell powered by psySH for `wp shell`.
- Custom code snippet. Supports VS Code supported code snippets. For example you can use [this WooCommerce snippets](https://github.com/claudiosanches/vscode-woocommerce/blob/master/snippets/functions.json).

Please note that, currently PsySH commands like `ls`, `doc`, `show` etc and Magic variables like `$_`, `$__class` etc are not supported in browser console.

👉 WP Console uses Gutenberg packages and components for its UI/UX.

### Security Concern
WP Console explicitly checks for `manage_options` permission to display the UI and perform other actions. Yet, this plugin should not be used in production server.

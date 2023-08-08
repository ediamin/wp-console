# How to build ace.js with custom namespace
- Clone the main repo https://github.com/ajaxorg/ace.
- Set the namespace to `wpConsoleAce` in [Makefile.dryice.js](https://github.com/ajaxorg/ace/blob/v1.8.1/Makefile.dryice.js#L313).
- Disable the sanityCheck in [Makefile.dryice.js](https://github.com/ajaxorg/ace/blob/v1.8.1/Makefile.dryice.js#L448-L449).
- Set the namespace in [lib/ace/worker/worker.js](https://github.com/ajaxorg/ace/blob/v1.8.1/lib/ace/worker/worker.js#L19).
- Compile the scripts by running `node ./Makefile.dryice.js normal`.
- Copy and paste the selected files from `build/src-min-noconflict` directory.

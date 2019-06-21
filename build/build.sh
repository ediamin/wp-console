#!/bin/bash

dest=build/wp-console

rm -rf $dest
mkdir $dest
cp -r assets $dest
cp -r includes $dest
cp -r languages $dest
cp -r vendor $dest
cp README.md $dest
cp composer.json $dest
cp index.php $dest
cp license.txt $dest
cp readme.txt $dest
cp wp-console.php $dest

rm -rf $dest/vendor/psy/psysh/test/

cd build
zip wp-console.zip wp-console -r

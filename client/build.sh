ng build --prod;
grep -rl 'princeben' ./dist | xargs sed -i 's/princeben/allYours/g';

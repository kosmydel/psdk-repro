# Repro for Platform SDK initialization

1. Run `yarn`.
2. Run `yarn` in `example`.
3. Run `yarn android -d` in `example` and select the Meta Quest device.

You can also open the project in Android Studio and run or debug the app from there: `open -a "Android Studio" example/android`. If you do so, you might need to start the Metro bundler from the terminal by running `yarn start` in the `example` directory.

If you need to reset the project run:
```bash
rm -rf node_modules
rm -rf example/node_modules
rm -rf example/android
```

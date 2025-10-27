import 'tsx/cjs';

module.exports = () => ({
  "expo": {
    "name": "expo-quest-notifications",
    "slug": "expo-quest-notifications",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "expo.modules.psdkrepro.example"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.jakubswm.questlocation",
      "versionCode": 2,
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
        [
          "expo-build-properties",
          {
            "android": {
              "compileSdkVersion": 34,
              "targetSdkVersion": 34,
            }
          }
        ],
        ["./plugins/withPlugin.ts"],
      ]
  }
})

import 'dotenv/config';

export default {
  expo: {
    name: "PageKeeper",
    slug: "pagekeeper",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#FAF5F0"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.uzairv.pagekeeper"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FAF5F0"
      },
      package: "com.uzairv.pagekeeper"
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro"
    },
    plugins: [
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme: `com.googleusercontent.apps.${process.env.GOOGLE_IOS_CLIENT_ID?.split('-')[0] || '73677177649'}-5qu89osb8npke3d74vc17k8bohbm7rt4`
        }
      ],
      "expo-web-browser"
    ],
    extra: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
      },
      google: {
        webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
        iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
      },
    },
  },
};

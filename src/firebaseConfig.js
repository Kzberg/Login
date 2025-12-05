// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
    getAuth,
    getReactNativePersistence,
    initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
let ReactNativeAsyncStorage;
try {
  ReactNativeAsyncStorage =
    require("@react-native-async-storage/async-storage").default;
} catch (e) {
  ReactNativeAsyncStorage = undefined;
}

const firebaseConfig = {
  apiKey: "AIzaSyC0PL3BykWFIW08mJd5Lp-Z83N36Ge8cKQ",
  authDomain: "login-59a59.firebaseapp.com",
  projectId: "login-59a59",
  storageBucket: "login-59a59.firebasestorage.app",
  messagingSenderId: "900738677978",
  appId: "1:900738677978:android:0065c2d36498475b11b9e3",
};

const app = initializeApp(firebaseConfig);

export let auth;
if (ReactNativeAsyncStorage) {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
    console.info(
      "Firebase Auth: initialized with ReactNative AsyncStorage persistence"
    );
  } catch (e) {
    console.warn("initializeAuth failed, falling back to getAuth:", e);
    auth = getAuth(app);
  }
} else {
  auth = getAuth(app);
}
export const db = getFirestore(app);

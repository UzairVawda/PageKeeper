import { initializeApp } from 'firebase/app';
// @ts-ignore - getReactNativePersistence exists but TypeScript types are incomplete
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const { firebase } = Constants.expoConfig?.extra || {};

const firebaseConfig = {
  apiKey: firebase?.apiKey,
  authDomain: firebase?.authDomain,
  projectId: firebase?.projectId,
  storageBucket: firebase?.storageBucket,
  messagingSenderId: firebase?.messagingSenderId,
  appId: firebase?.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
export const db = getFirestore(app);

export default app;

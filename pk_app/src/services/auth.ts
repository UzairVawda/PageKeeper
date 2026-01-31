import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithCredential,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { auth, db } from './firebase';

export { auth };
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Constants from 'expo-constants';

// Configure Google Sign-In
const { google } = Constants.expoConfig?.extra || {};
GoogleSignin.configure({
  webClientId: google?.webClientId,
  iosClientId: google?.iosClientId,
});

// Check if username is unique
export const isUsernameAvailable = async (username: string): Promise<boolean> => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username.toLowerCase()));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

// Check if email is already registered
export const isEmailAvailable = async (email: string): Promise<boolean> => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email.toLowerCase()));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

// Generate a unique friend code
const generateFriendCode = (username: string): string => {
  const prefix = username.slice(0, 5).toUpperCase();
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}${suffix}`;
};

// Create user profile in Firestore (3 separate collections)
const createUserProfile = async (user: User, username: string) => {
  const now = new Date();
  const friendCode = generateFriendCode(username);

  // 1. Create users document (core identity)
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    odId: user.uid,
    email: user.email?.toLowerCase() || '',
    username: username.toLowerCase(),
    fullName: user.displayName || '',
    phoneNumber: '',
    profilePictureUrl: user.photoURL || '',
    friendCode,
    friends: [],
    createdAt: now,
    lastActive: now,
    accountStatus: 'active',
  });

  // 2. Create userSettings document
  const settingsRef = doc(db, 'userSettings', user.uid);
  await setDoc(settingsRef, {
    odId: user.uid,
    dailyGoals: {
      weekday: 20,
      weekend: 30,
    },
    streakSettings: {
      sickDaysPerMonth: 2,
      sickDaysUsedThisMonth: 0,
      lastSickDayUsed: null,
      monthReset: null,
    },
    notificationSettings: {
      enabled: true,
      weekdayReminders: {
        enabled: true,
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        time: '19:00',
      },
      weekendReminders: {
        enabled: true,
        days: ['Saturday', 'Sunday'],
        time: '10:00',
      },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      streakMilestones: true,
      friendActivity: true,
      quietHoursStart: '22:00',
      quietHoursEnd: '08:00',
    },
    privacySettings: {
      showCurrentBook: true,
      showStreak: true,
      showDailyProgress: true,
      showCompletedBooks: true,
      showAchievements: true,
    },
    deviceTokens: [],
    updatedAt: now,
  });

  // 3. Create userStats document
  const statsRef = doc(db, 'userStats', user.uid);
  await setDoc(statsRef, {
    userId: user.uid,
    currentStreak: 0,
    longestStreak: 0,
    totalBooksCompleted: 0,
    totalPagesRead: 0,
    lastReadDate: null,
    updatedAt: now,
  });
};

// Sign up with email and password
export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  // Create the user
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // Generate a temporary username from email
  const emailUsername = email.split('@')[0] || 'user';
  let username = emailUsername.replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 15);

  // Check if username is taken, if so add random suffix
  const available = await isUsernameAvailable(username);
  if (!available) {
    username = `${username}_${Math.random().toString(36).slice(2, 6)}`;
  }

  // Create user profile in Firestore
  await createUserProfile(userCredential.user, username);

  return userCredential.user;
};

// Sign in with email and password
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  // Update last active
  const userRef = doc(db, 'users', userCredential.user.uid);
  await setDoc(userRef, { lastActive: new Date() }, { merge: true });

  return userCredential.user;
};

// Sign out
export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    // Ignore if Google Sign-In wasn't used
  }
};

// Sign in/up with Google
export const signInWithGoogle = async (): Promise<{ user: User; isNewUser: boolean }> => {
  try {
    // Check if play services are available (Android)
    await GoogleSignin.hasPlayServices();

    // Sign in with Google
    const signInResult = await GoogleSignin.signIn();

    // Get the ID token
    const idToken = signInResult.data?.idToken;
    if (!idToken) {
      throw new Error('No ID token received from Google Sign-In');
    }

    // Create Firebase credential with the Google ID token
    const googleCredential = GoogleAuthProvider.credential(idToken);

    // Sign in with Firebase
    const userCredential = await signInWithCredential(auth, googleCredential);

    // Check if this is a new user
    const userRef = doc(db, 'users', userCredential.user.uid);
    const userDoc = await getDoc(userRef);
    const isNewUser = !userDoc.exists();

    if (isNewUser) {
      // Generate a username from email
      const emailUsername = userCredential.user.email?.split('@')[0] || 'user';
      let username = emailUsername.replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 15);

      // Check if username is taken, if so add random suffix
      let isAvailable = await isUsernameAvailable(username);
      if (!isAvailable) {
        username = `${username}_${Math.random().toString(36).slice(2, 6)}`;
      }

      await createUserProfile(userCredential.user, username);
    } else {
      // Update last active
      await setDoc(userRef, { lastActive: new Date() }, { merge: true });
    }

    return { user: userCredential.user, isNewUser };
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('Sign-in was cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error('Sign-in is already in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Google Play services not available');
    }
    throw error;
  }
};

// Get current user profile (core identity only)
export const getUserProfile = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data();
  }

  return null;
};

// Get user settings
export const getUserSettings = async (userId: string) => {
  const settingsRef = doc(db, 'userSettings', userId);
  const settingsDoc = await getDoc(settingsRef);

  if (settingsDoc.exists()) {
    return settingsDoc.data();
  }

  return null;
};

// Get user stats
export const getUserStats = async (userId: string) => {
  const statsRef = doc(db, 'userStats', userId);
  const statsDoc = await getDoc(statsRef);

  if (statsDoc.exists()) {
    return statsDoc.data();
  }

  return null;
};

// Get full user data (all 3 collections) - use sparingly
export const getFullUserData = async (userId: string) => {
  const [profile, settings, stats] = await Promise.all([
    getUserProfile(userId),
    getUserSettings(userId),
    getUserStats(userId),
  ]);

  if (!profile) return null;

  return {
    profile,
    settings,
    stats,
  };
};

// Validation helpers
export const validateUsername = (username: string): { valid: boolean; error?: string } => {
  if (username.length < 3) {
    return { valid: false, error: 'Username must be at least 3 characters' };
  }
  if (username.length > 20) {
    return { valid: false, error: 'Username must be 20 characters or less' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, error: 'Only letters, numbers, and underscores allowed' };
  }
  return { valid: true };
};

export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  return { valid: true };
};

export const validatePassword = (password: string): {
  valid: boolean;
  error?: string;
  strength: 'weak' | 'medium' | 'strong';
  checks: {
    minLength: boolean;
    hasLetter: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
} => {
  const checks = {
    minLength: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>=]/.test(password),
  };

  const passedChecks = Object.values(checks).filter(Boolean).length;

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (passedChecks >= 4) {
    strength = 'strong';
  } else if (passedChecks >= 3) {
    strength = 'medium';
  }

  // All 4 requirements must be met
  if (!checks.minLength) {
    return { valid: false, error: 'Password must be at least 8 characters', strength, checks };
  }
  if (!checks.hasLetter) {
    return { valid: false, error: 'Password must contain a letter', strength, checks };
  }
  if (!checks.hasNumber) {
    return { valid: false, error: 'Password must contain a number', strength, checks };
  }
  if (!checks.hasSpecial) {
    return { valid: false, error: 'Password must contain a special character', strength, checks };
  }

  return { valid: true, strength, checks };
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): { valid: boolean; error?: string } => {
  if (password !== confirmPassword) {
    return { valid: false, error: 'Passwords do not match' };
  }
  return { valid: true };
};

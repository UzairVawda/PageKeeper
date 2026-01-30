import './src/styles/global.css';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { SplashScreen, SignUpScreen } from '@/screens';

type Screen = 'splash' | 'signup' | 'login' | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  const handleLogin = () => {
    // TODO: Navigate to login screen
    Alert.alert('Login', 'Login screen coming soon');
  };

  const handleSignUp = () => {
    setCurrentScreen('signup');
  };

  const handleNavigateToLogin = () => {
    // TODO: Navigate to login screen
    Alert.alert('Login', 'Login screen coming soon');
  };

  const handleSignUpSuccess = () => {
    Alert.alert('Success', 'Account created successfully!');
    // TODO: Navigate to onboarding or home
  };

  const handleBackToSplash = () => {
    setCurrentScreen('splash');
  };

  switch (currentScreen) {
    case 'signup':
      return (
        <SignUpScreen
          onNavigateToLogin={handleNavigateToLogin}
          onSignUpSuccess={handleSignUpSuccess}
        />
      );
    case 'splash':
    default:
      return (
        <SplashScreen
          onLogin={handleLogin}
          onSignUp={handleSignUp}
        />
      );
  }
}

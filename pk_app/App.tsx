import './src/styles/global.css';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { SplashScreen, SignUpScreen, LoginScreen } from '@/screens';

type Screen = 'splash' | 'signup' | 'login' | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  const handleNavigateToLogin = () => {
    setCurrentScreen('login');
  };

  const handleNavigateToSignUp = () => {
    setCurrentScreen('signup');
  };

  const handleLoginSuccess = () => {
    Alert.alert('Success', 'Logged in successfully!');
    // TODO: Navigate to home
  };

  const handleSignUpSuccess = () => {
    Alert.alert('Success', 'Account created successfully!');
    // TODO: Navigate to onboarding or home
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password screen
    Alert.alert('Reset Password', 'Password reset functionality coming soon!');
  };

  switch (currentScreen) {
    case 'signup':
      return (
        <SignUpScreen
          onNavigateToLogin={handleNavigateToLogin}
          onSignUpSuccess={handleSignUpSuccess}
        />
      );
    case 'login':
      return (
        <LoginScreen
          onNavigateToSignUp={handleNavigateToSignUp}
          onLoginSuccess={handleLoginSuccess}
          onForgotPassword={handleForgotPassword}
        />
      );
    case 'splash':
    default:
      return (
        <SplashScreen
          onLogin={handleNavigateToLogin}
          onSignUp={handleNavigateToSignUp}
        />
      );
  }
}

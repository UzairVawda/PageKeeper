import './src/styles/global.css';
import React from 'react';
import { Alert } from 'react-native';
import { SplashScreen } from '@/screens';

export default function App() {
  const handleLogin = () => {
    Alert.alert('Login', 'Navigate to Login screen');
  };

  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Navigate to Sign Up screen');
  };

  return <SplashScreen onLogin={handleLogin} onSignUp={handleSignUp} />;
}

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { FormInput } from '@/components';
import { colors } from '@/theme';
import { signInWithEmail, signInWithGoogle } from '@/services/auth';

interface LoginScreenProps {
  onNavigateToSignUp?: () => void;
  onLoginSuccess?: () => void;
  onForgotPassword?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateToSignUp,
  onLoginSuccess,
  onForgotPassword,
}) => {
  // Form state
  const [identifier, setIdentifier] = useState(''); // username or email
  const [password, setPassword] = useState('');

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Check if form has values (both fields filled)
  const isFormFilled = identifier.length > 0 && password.length > 0;

  // Detect if identifier is email or username
  const isEmail = useMemo(() => {
    return identifier.includes('@');
  }, [identifier]);

  // Handle login
  const handleLogin = async () => {
    if (!isFormFilled) return;

    setIsLoading(true);
    try {
      // If it's not an email format, we need to look up the email by username
      let loginEmail = identifier;

      if (!isEmail) {
        // For now, we'll try to login with email
        // TODO: Implement username lookup to get email
        // For MVP, show error asking for email
        Alert.alert(
          'Username Login',
          'Please use your email address to log in. Username login coming soon!'
        );
        setIsLoading(false);
        return;
      }

      await signInWithEmail(loginEmail, password);
      onLoginSuccess?.();
    } catch (error: any) {
      let errorMessage = error.message || 'An error occurred';

      // Make Firebase errors more user-friendly
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }

      Alert.alert('Login Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const { isNewUser } = await signInWithGoogle();
      if (isNewUser) {
        Alert.alert('Welcome!', 'Your account has been created successfully.');
      }
      onLoginSuccess?.();
    } catch (error: any) {
      if (error.message !== 'Sign-in was cancelled') {
        Alert.alert('Google Sign-In Failed', error.message || 'An error occurred');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword();
    } else {
      // Default behavior - show alert
      Alert.alert(
        'Reset Password',
        'Password reset functionality coming soon!'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor: colors.background }}
    >
      <StatusBar style="dark" />

      <View className="flex-1 px-6 pt-16 pb-6 justify-center">
        {/* Header */}
        <View className="items-center mb-8">
          <Text
            className="text-3xl font-bold mb-2"
            style={{ color: colors.brown[800], fontFamily: 'Georgia' }}
          >
            Log In
          </Text>
          <Text
            className="text-base text-center"
            style={{ color: colors.brown[500] }}
          >
            Welcome back
          </Text>
        </View>

        {/* Form */}
        <View className="mb-2">
          {/* Username or Email */}
          <FormInput
            label="Username or Email"
            placeholder="you@example.com"
            value={identifier}
            onChangeText={setIdentifier}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            showValidationColors={false}
            testID="identifier-input"
          />

          {/* Password */}
          <FormInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            isPassword
            autoCapitalize="none"
            showValidationColors={false}
            testID="password-input"
          />

          {/* Forgot Password */}
          <TouchableOpacity
            className="self-end mb-4"
            onPress={handleForgotPassword}
            activeOpacity={0.7}
            testID="forgot-password-link"
            accessibilityLabel="Forgot Password"
          >
            <Text
              className="text-sm font-medium"
              style={{ color: colors.brown[600] }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          className="py-4 rounded-xl mb-4"
          style={{
            backgroundColor: isFormFilled ? colors.brown[600] : colors.brown[300],
            shadowColor: colors.brown[900],
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isFormFilled ? 0.3 : 0,
            shadowRadius: 6,
            elevation: isFormFilled ? 5 : 0,
          }}
          onPress={handleLogin}
          disabled={!isFormFilled || isLoading}
          activeOpacity={0.8}
          testID={isFormFilled ? "login-button-enabled" : "login-button-disabled"}
          accessibilityLabel="Log In"
        >
          {isLoading ? (
            <ActivityIndicator color={colors.white} testID="login-loading" />
          ) : (
            <Text
              className="text-center text-lg font-semibold"
              style={{ color: colors.white }}
            >
              Log In
            </Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-4">
          <View className="flex-1 h-px" style={{ backgroundColor: colors.brown[200] }} />
          <Text className="mx-4 text-sm" style={{ color: colors.brown[400] }}>
            OR
          </Text>
          <View className="flex-1 h-px" style={{ backgroundColor: colors.brown[200] }} />
        </View>

        {/* Google Login */}
        <TouchableOpacity
          className="flex-row items-center justify-center py-4 rounded-xl border-2"
          style={{
            borderColor: colors.brown[200],
            backgroundColor: colors.white,
          }}
          onPress={handleGoogleLogin}
          activeOpacity={0.7}
          disabled={isGoogleLoading}
          testID="google-login-button"
          accessibilityLabel="Continue with Google"
        >
          {isGoogleLoading ? (
            <ActivityIndicator color={colors.brown[600]} testID="google-loading" />
          ) : (
            <>
              <Ionicons name="logo-google" size={20} color="#DB4437" />
              <Text
                className="text-base font-semibold ml-2"
                style={{ color: colors.brown[700] }}
              >
                Continue with Google
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="flex-row justify-center mt-6">
          <Text style={{ color: colors.brown[500] }}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={onNavigateToSignUp} testID="navigate-to-signup">
            <Text className="font-semibold" style={{ color: colors.brown[600] }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

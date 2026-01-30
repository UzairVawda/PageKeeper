import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  LayoutAnimation,
  UIManager,
} from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { FormInput, PasswordStrength } from '@/components';
import { colors } from '@/theme';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  signUpWithEmail,
  signInWithGoogle,
} from '@/services/auth';

interface SignUpScreenProps {
  onNavigateToLogin?: () => void;
  onSignUpSuccess?: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onNavigateToLogin,
  onSignUpSuccess,
}) => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation state - computed synchronously to avoid race conditions
  const emailValidation = useMemo(() => {
    if (email.length === 0) {
      return { valid: false };
    }
    return validateEmail(email);
  }, [email]);

  const passwordValidation = useMemo(() => {
    if (password.length === 0) {
      return {
        valid: false,
        strength: 'weak' as const,
        checks: { minLength: false, hasLetter: false, hasNumber: false, hasSpecial: false },
      };
    }
    return validatePassword(password);
  }, [password]);

  const confirmValidation = useMemo(() => {
    if (confirmPassword.length === 0) {
      return { valid: false };
    }
    return validateConfirmPassword(password, confirmPassword);
  }, [password, confirmPassword]);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Focus state for password field
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Handle password focus change with animation
  const handlePasswordFocusChange = (focused: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsPasswordFocused(focused);
  };

  // Check if form is valid
  const isFormValid =
    emailValidation.valid &&
    passwordValidation.valid &&
    confirmValidation.valid;

  // Handle sign up
  const handleSignUp = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    try {
      await signUpWithEmail(email, password);
      onSignUpSuccess?.();
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-In loading state
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Handle Google sign up
  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    try {
      const { user, isNewUser } = await signInWithGoogle();
      if (isNewUser) {
        Alert.alert('Welcome!', 'Your account has been created successfully.');
      }
      onSignUpSuccess?.();
    } catch (error: any) {
      if (error.message !== 'Sign-in was cancelled') {
        Alert.alert('Google Sign-In Failed', error.message || 'An error occurred');
      }
    } finally {
      setIsGoogleLoading(false);
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
        <View className="items-center mb-6">
          <Text
            className="text-3xl font-bold mb-2"
            style={{ color: colors.brown[800], fontFamily: 'Georgia' }}
          >
            Create Account
          </Text>
          <Text
            className="text-base text-center"
            style={{ color: colors.brown[500] }}
          >
            Start your reading journey today
          </Text>
        </View>

        {/* Form */}
        <View className="mb-4">
          {/* Email */}
          <FormInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={email.length > 0 ? emailValidation.error : undefined}
            isValid={emailValidation.valid}
            showValidation={email.length > 0}
          />

          {/* Password */}
          <FormInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            isPassword
            autoCapitalize="none"
            isValid={passwordValidation.valid}
            showValidation={password.length > 0}
            onFocusChange={handlePasswordFocusChange}
          />
          <PasswordStrength
            strength={passwordValidation.strength}
            checks={passwordValidation.checks}
            show={isPasswordFocused}
          />

          {/* Confirm Password */}
          <FormInput
            label="Confirm Password"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            isPassword
            autoCapitalize="none"
            error={confirmPassword.length > 0 ? confirmValidation.error : undefined}
            isValid={confirmValidation.valid}
            showValidation={confirmPassword.length > 0}
          />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          className="py-4 rounded-xl mb-4"
          style={{
            backgroundColor: isFormValid ? colors.brown[600] : colors.brown[300],
            shadowColor: colors.brown[900],
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isFormValid ? 0.3 : 0,
            shadowRadius: 6,
            elevation: isFormValid ? 5 : 0,
          }}
          onPress={handleSignUp}
          disabled={!isFormValid || isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text
              className="text-center text-lg font-semibold"
              style={{ color: colors.white }}
            >
              Sign Up
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

        {/* Google Sign Up */}
        <TouchableOpacity
          className="flex-row items-center justify-center py-4 rounded-xl border-2"
          style={{
            borderColor: colors.brown[200],
            backgroundColor: colors.white,
          }}
          onPress={handleGoogleSignUp}
          activeOpacity={0.7}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <ActivityIndicator color={colors.brown[600]} />
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

        {/* Login Link */}
        <View className="flex-row justify-center mt-6">
          <Text style={{ color: colors.brown[500] }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text className="font-semibold" style={{ color: colors.brown[600] }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

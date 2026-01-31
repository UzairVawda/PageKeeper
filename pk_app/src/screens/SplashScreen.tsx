import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { BookAnimation } from '@/components';
import { colors } from '@/theme';

interface SplashScreenProps {
  onLogin?: () => void;
  onSignUp?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onLogin, onSignUp }) => {
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const taglineOpacity = useSharedValue(0);
  const taglineTranslateY = useSharedValue(20);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(30);

  useEffect(() => {
    // Staggered animations
    titleOpacity.value = withDelay(1200, withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }));
    titleTranslateY.value = withDelay(1200, withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }));

    taglineOpacity.value = withDelay(1500, withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }));
    taglineTranslateY.value = withDelay(1500, withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }));

    buttonsOpacity.value = withDelay(1800, withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }));
    buttonsTranslateY.value = withDelay(1800, withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }));
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineTranslateY.value }],
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <StatusBar style="dark" />

      <View className="flex-1 justify-center items-center px-8">
        {/* Book Animation */}
        <View className="mb-12">
          <BookAnimation />
        </View>

        {/* App Name */}
        <Animated.View style={titleStyle} className="mb-3">
          <Text
            className="text-5xl font-bold tracking-tight"
            style={{ color: colors.brown[800], fontFamily: 'Georgia' }}
          >
            PageKeeper
          </Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View style={taglineStyle} className="mb-16">
          <Text
            className="text-lg text-center"
            style={{ color: colors.brown[500], fontFamily: 'Georgia', fontStyle: 'italic' }}
          >
            Build your reading habit, one page at a time
          </Text>
        </Animated.View>

        {/* Buttons */}
        <Animated.View style={buttonsStyle} className="w-full flex-row justify-center gap-4">
          <TouchableOpacity
            onPress={onLogin}
            className="flex-1 py-4 rounded-xl border-2"
            style={{ borderColor: colors.brown[600], maxWidth: 160 }}
            activeOpacity={0.7}
          >
            <Text className="text-center text-lg font-semibold" style={{ color: colors.brown[600] }}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onSignUp}
            className="flex-1 py-4 rounded-xl"
            style={{
              backgroundColor: colors.brown[600],
              maxWidth: 160,
              shadowColor: colors.brown[900],
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 5,
            }}
            activeOpacity={0.8}
          >
            <Text className="text-center text-lg font-semibold" style={{ color: colors.white }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Bottom accent */}
      <View className="h-2" style={{ backgroundColor: colors.amber[600], opacity: 0.3 }} />
    </View>
  );
};

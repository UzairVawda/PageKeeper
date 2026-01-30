import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { colors } from '@/theme';

interface BookAnimationProps {
  onAnimationComplete?: () => void;
}

export const BookAnimation: React.FC<BookAnimationProps> = ({ onAnimationComplete }) => {
  const coverRotation = useSharedValue(0);
  const pageFlutter1 = useSharedValue(0);
  const pageFlutter2 = useSharedValue(0);
  const pageFlutter3 = useSharedValue(0);
  const bookScale = useSharedValue(0.8);
  const bookOpacity = useSharedValue(0);

  useEffect(() => {
    // Fade in and scale up
    bookOpacity.value = withTiming(1, { duration: 400 });
    bookScale.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.5)) });

    // Open the cover
    coverRotation.value = withDelay(
      400,
      withTiming(-160, { duration: 800, easing: Easing.out(Easing.cubic) })
    );

    // Flutter pages
    pageFlutter1.value = withDelay(
      900,
      withSequence(
        withTiming(-8, { duration: 200 }),
        withTiming(-5, { duration: 300 })
      )
    );
    pageFlutter2.value = withDelay(
      1000,
      withSequence(
        withTiming(-12, { duration: 200 }),
        withTiming(-8, { duration: 300 })
      )
    );
    pageFlutter3.value = withDelay(
      1100,
      withSequence(
        withTiming(-16, { duration: 200 }),
        withTiming(-12, { duration: 300 })
      )
    );

    if (onAnimationComplete) {
      setTimeout(onAnimationComplete, 1500);
    }
  }, []);

  const bookContainerStyle = useAnimatedStyle(() => ({
    opacity: bookOpacity.value,
    transform: [{ scale: bookScale.value }],
  }));

  const frontCoverStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${coverRotation.value}deg` },
    ],
  }));

  const page1Style = useAnimatedStyle(() => ({
    transform: [{ perspective: 800 }, { rotateY: `${pageFlutter1.value}deg` }],
  }));

  const page2Style = useAnimatedStyle(() => ({
    transform: [{ perspective: 800 }, { rotateY: `${pageFlutter2.value}deg` }],
  }));

  const page3Style = useAnimatedStyle(() => ({
    transform: [{ perspective: 800 }, { rotateY: `${pageFlutter3.value}deg` }],
  }));

  const PageLines = ({ opacity = 0.15 }: { opacity?: number }) => (
    <View className="p-3 pt-6">
      {[...Array(8)].map((_, i) => (
        <View
          key={i}
          className="h-1 mb-2 rounded-full"
          style={{
            opacity,
            backgroundColor: colors.brown[300],
            width: `${60 + Math.random() * 35}%`,
          }}
        />
      ))}
    </View>
  );

  return (
    <Animated.View style={bookContainerStyle} className="items-center justify-center">
      {/* Offset to center the opened book (cover extends left when open) */}
      <View className="relative w-40 h-52" style={{ marginLeft: 120 }}>
        {/* Back cover & spine */}
        <View
          className="absolute w-40 h-52 rounded-r-sm"
          style={{
            backgroundColor: colors.brown[700],
            shadowColor: colors.brown[900],
            shadowOffset: { width: 2, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <View
            className="absolute left-0 w-3 h-full rounded-l-sm"
            style={{ backgroundColor: colors.brown[800] }}
          />
          <View className="absolute right-4 top-4 bottom-4 w-px" style={{ backgroundColor: colors.amber[600], opacity: 0.3 }} />
        </View>

        {/* Pages */}
        <View className="absolute left-3 w-36 h-50 top-1">
          <Animated.View
            style={[page3Style, {
              position: 'absolute',
              left: 0,
              width: 140,
              height: 200,
              backgroundColor: colors.cream[100],
              borderTopRightRadius: 2,
              borderBottomRightRadius: 2,
              transformOrigin: 'left',
            }]}
          >
            <PageLines opacity={0.2} />
          </Animated.View>

          <Animated.View
            style={[page2Style, {
              position: 'absolute',
              left: 0,
              width: 140,
              height: 200,
              backgroundColor: colors.cream[50],
              borderTopRightRadius: 2,
              borderBottomRightRadius: 2,
              transformOrigin: 'left',
            }]}
          >
            <PageLines opacity={0.15} />
          </Animated.View>

          <Animated.View
            style={[page1Style, {
              position: 'absolute',
              left: 0,
              width: 140,
              height: 200,
              backgroundColor: '#FFFEFA',
              borderTopRightRadius: 2,
              borderBottomRightRadius: 2,
              transformOrigin: 'left',
              shadowColor: colors.brown[900],
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }]}
          >
            <PageLines opacity={0.1} />
          </Animated.View>
        </View>

        {/* Front cover */}
        <Animated.View
          style={[frontCoverStyle, {
            position: 'absolute',
            left: 3,
            width: 140,
            height: 204,
            top: -1,
            backgroundColor: colors.brown[600],
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            transformOrigin: 'left',
            shadowColor: colors.brown[900],
            shadowOffset: { width: 3, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            elevation: 8,
          }]}
        >
          <View className="flex-1 p-4 justify-center items-center">
            <View
              className="absolute inset-3 border-2 rounded-sm"
              style={{ borderColor: colors.amber[500], opacity: 0.4 }}
            />
            <View className="items-center">
              <View
                className="w-12 h-14 rounded-sm mb-2"
                style={{ backgroundColor: colors.amber[600], opacity: 0.6 }}
              />
              <View
                className="w-16 h-1 rounded-full"
                style={{ backgroundColor: colors.amber[500], opacity: 0.5 }}
              />
              <View
                className="w-10 h-1 rounded-full mt-1"
                style={{ backgroundColor: colors.amber[500], opacity: 0.3 }}
              />
            </View>
          </View>
          <View
            className="absolute left-0 w-1 h-full"
            style={{ backgroundColor: colors.brown[800] }}
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

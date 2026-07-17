import { useEffect, useRef } from 'react';
import { AccessibilityInfo, Animated, Easing, View } from 'react-native';
import { styles } from './Card.styles';

export const CardSkeleton = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let cancelled = false;

    AccessibilityInfo.isReduceMotionEnabled?.().then((reduced) => {
      if (cancelled || reduced) return;

      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.4,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });

    return () => {
      cancelled = true;
    };
  }, [opacity]);

  return (
    <Animated.View style={{ opacity }} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <View style={[styles.skeletonBlock, { height: 120 }]} />
      <View style={[styles.skeletonBlock, { height: 16, width: '65%', marginTop: 16 }]} />
      <View style={[styles.skeletonBlock, { height: 12, width: '100%', marginTop: 8 }]} />
      <View style={[styles.skeletonBlock, { height: 12, width: '80%', marginTop: 6 }]} />
    </Animated.View>
  );
};

import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AccessibilityInfo, Animated, Easing, Pressable, Text, View } from 'react-native';
import type { SwitchProps } from './Switch.types';
import { colors, styles, THUMB_TRAVEL } from './Switch.styles';

export const Switch = ({
  checked,
  onChange,
  disabled = false,
  isLoading = false,
  label,
  description,
  error,
  testID,
}: SwitchProps) => {
  const [focused, setFocused] = useState(false);
  const progress = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const reduceMotion = useRef(false);
  const isDisabled = disabled || isLoading;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then((v) => {
      reduceMotion.current = v;
    });
  }, []);

  useEffect(() => {
    const toValue = checked ? 1 : 0;
    if (reduceMotion.current) {
      progress.setValue(toValue);
      return;
    }
    Animated.timing(progress, {
      toValue,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [checked, progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, THUMB_TRAVEL],
  });

  const trackColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.trackOff, colors.trackOn],
  });

  return (
    <View style={styles.row}>
      <Pressable
        testID={testID}
        onPress={() => !isDisabled && onChange(!checked)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={isDisabled}
        accessibilityRole="switch"
        accessibilityState={{ checked, disabled: isDisabled }}
        accessibilityLabel={label}
        style={styles.touchArea}
      >
        <Animated.View
          style={[
            styles.track,
            { backgroundColor: error ? colors.trackError : trackColor },
            focused && !isDisabled && styles.trackFocused,
            isDisabled && styles.trackDisabled,
          ]}
        >
          <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]}>
            {isLoading ? <ActivityIndicator size="small" color={colors.spinner} /> : null}
          </Animated.View>
        </Animated.View>
      </Pressable>

      {(label || description || error) ? (
        <View style={styles.textCol}>
          {label ? (
            <Text
              style={[
                styles.label,
                { color: isDisabled ? colors.labelDisabled : colors.labelDefault },
              ]}
            >
              {label}
            </Text>
          ) : null}
          {description || error ? (
            <Text
              style={[
                styles.description,
                { color: error ? colors.descriptionError : colors.descriptionDefault },
              ]}
              accessibilityLiveRegion={error ? 'assertive' : 'polite'}
            >
              {error || description}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

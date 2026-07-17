import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Pressable, Text, View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import type { SegmentedControlProps } from './SegmentedControl.types';
import { styles } from './SegmentedControl.styles';

interface SegmentLayout {
  x: number;
  width: number;
}

export const SegmentedControl = ({
  options,
  value,
  onChange,
  disabled = false,
  fullWidth = false,
  testID,
}: SegmentedControlProps) => {
  const layouts = useRef<Record<string, SegmentLayout>>({});
  const indicatorX = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then(setReduceMotion);
  }, []);

  const animateToValue = (targetValue: string) => {
    const layout = layouts.current[targetValue];
    if (!layout) return;

    if (!ready) {
      indicatorX.setValue(layout.x);
      indicatorWidth.setValue(layout.width);
      setReady(true);
      return;
    }

    Animated.parallel([
      Animated.timing(indicatorX, {
        toValue: layout.x,
        duration: reduceMotion ? 0 : 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(indicatorWidth, {
        toValue: layout.width,
        duration: reduceMotion ? 0 : 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    animateToValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleSegmentLayout = (optionValue: string) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    layouts.current[optionValue] = { x, width };
    if (optionValue === value) animateToValue(optionValue);
  };

  return (
    <View
      testID={testID}
      accessibilityRole="radiogroup"
      style={[styles.container, disabled && styles.containerDisabled]}
    >
      {ready ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicator,
            { left: indicatorX, width: indicatorWidth },
          ]}
        />
      ) : null}

      {options.map((option) => {
        const isActive = option.value === value;
        const isDisabled = disabled || option.disabled;

        return (
          <Pressable
            key={option.value}
            onLayout={handleSegmentLayout(option.value)}
            onPress={() => !isDisabled && onChange(option.value)}
            disabled={isDisabled}
            accessibilityRole="radio"
            accessibilityState={{ checked: isActive, disabled: isDisabled }}
            accessibilityLabel={option.label}
            style={({ pressed }) => [
              styles.segment,
              fullWidth && styles.segmentFullWidth,
              pressed && !isDisabled && styles.segmentPressed,
            ]}
          >
            <Text
              style={[
                styles.label,
                isActive
                  ? styles.labelActive
                  : isDisabled
                    ? styles.labelDisabled
                    : styles.labelDefault,
              ]}
              numberOfLines={1}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

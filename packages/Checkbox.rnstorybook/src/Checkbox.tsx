import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Pressable, Text, View } from 'react-native';
import type { CheckboxProps } from './Checkbox.types';
import { colors, styles } from './Checkbox.styles';

export const Checkbox = ({
  checked,
  onChange,
  indeterminate = false,
  disabled = false,
  label,
  description,
  error,
  required = false,
  testID,
}: CheckboxProps) => {
  const [focused, setFocused] = useState(false);
  const scale = useRef(new Animated.Value(checked || indeterminate ? 1 : 0)).current;
  const reduceMotion = useRef(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then((v) => {
      reduceMotion.current = v;
    });
  }, []);

  useEffect(() => {
    const toValue = checked || indeterminate ? 1 : 0;
    if (reduceMotion.current) {
      scale.setValue(toValue);
      return;
    }
    Animated.timing(scale, {
      toValue,
      duration: 160,
      easing: Easing.out(Easing.back(1.5)),
      useNativeDriver: true,
    }).start();
  }, [checked, indeterminate, scale]);

  const isMarked = checked || indeterminate;
  const boxBorderColor = error
    ? colors.borderError
    : isMarked
      ? colors.checkedBorder
      : colors.border;

  return (
    <View style={styles.row}>
      <Pressable
        testID={testID}
        onPress={() => !disabled && onChange(!checked)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        hitSlop={8}
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: indeterminate ? 'mixed' : checked,
          disabled,
        }}
        accessibilityLabel={label}
        style={styles.touchArea}
      >
        <View
          style={[
            styles.box,
            { borderColor: boxBorderColor, backgroundColor: isMarked ? colors.checkedBg : colors.boxBg },
            focused && !disabled && styles.boxFocused,
            disabled && styles.boxDisabled,
          ]}
        >
          <Animated.View style={{ transform: [{ scale }], opacity: scale }}>
            <Text style={{ color: colors.checkGlyph, fontSize: 12, fontWeight: '800', lineHeight: 14 }}>
              {indeterminate ? '−' : '✓'}
            </Text>
          </Animated.View>
        </View>
      </Pressable>

      {(label || description || error) ? (
        <View style={styles.textCol}>
          {label ? (
            <Text
              style={[
                styles.label,
                { color: disabled ? colors.labelDisabled : colors.labelDefault },
              ]}
            >
              {label}
              {required ? <Text style={styles.required}> *</Text> : null}
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

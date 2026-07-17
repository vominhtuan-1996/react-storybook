import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Pressable, Text, View } from 'react-native';
import type { RadioGroupProps, RadioOption } from './RadioGroup.types';
import { colors, styles } from './RadioGroup.styles';

interface RadioItemProps {
  option: RadioOption;
  checked: boolean;
  groupDisabled: boolean;
  invalid: boolean;
  onSelect: () => void;
}

function RadioItem({ option, checked, groupDisabled, invalid, onSelect }: RadioItemProps) {
  const [focused, setFocused] = useState(false);
  const scale = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const reduceMotion = useRef(false);
  const isDisabled = groupDisabled || option.disabled;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then((v) => {
      reduceMotion.current = v;
    });
  }, []);

  useEffect(() => {
    const toValue = checked ? 1 : 0;
    if (reduceMotion.current) {
      scale.setValue(toValue);
      return;
    }
    Animated.timing(scale, {
      toValue,
      duration: 150,
      easing: Easing.out(Easing.back(1.5)),
      useNativeDriver: true,
    }).start();
  }, [checked, scale]);

  const borderColor = invalid
    ? colors.borderError
    : checked
      ? colors.borderChecked
      : colors.border;

  return (
    <View style={styles.row}>
      <Pressable
        onPress={onSelect}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={isDisabled}
        accessibilityRole="radio"
        accessibilityState={{ checked, disabled: isDisabled }}
        accessibilityLabel={option.label}
        style={styles.touchArea}
      >
        <View
          style={[
            styles.outerCircle,
            { borderColor },
            focused && !isDisabled && styles.outerCircleFocused,
            isDisabled && styles.outerCircleDisabled,
          ]}
        >
          <Animated.View style={[styles.innerDot, { transform: [{ scale }] }]} />
        </View>
      </Pressable>

      {(option.label || option.description) ? (
        <View style={styles.textCol}>
          <Text
            style={[
              styles.label,
              { color: isDisabled ? colors.labelDisabled : colors.labelDefault },
            ]}
          >
            {option.label}
          </Text>
          {option.description ? (
            <Text style={[styles.description, { color: colors.descriptionDefault }]}>
              {option.description}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

export const RadioGroup = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  errorText,
  testID,
}: RadioGroupProps) => {
  return (
    <View style={styles.group} testID={testID} accessibilityRole="radiogroup">
      {label ? <Text style={styles.groupLabel}>{label}</Text> : null}

      {options.map((option) => (
        <RadioItem
          key={option.value}
          option={option}
          checked={value === option.value}
          groupDisabled={disabled}
          invalid={!!errorText}
          onSelect={() => onChange(option.value)}
        />
      ))}

      {errorText ? (
        <Text style={styles.errorText} accessibilityLiveRegion="assertive">
          {errorText}
        </Text>
      ) : null}
    </View>
  );
};

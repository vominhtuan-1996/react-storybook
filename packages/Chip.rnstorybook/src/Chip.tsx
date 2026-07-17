import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ChipProps } from './Chip.types';
import { bgFor, borderColorFor, styles, textColorFor } from './Chip.styles';

export const Chip = ({
  children,
  variant = 'filled',
  selected = false,
  disabled = false,
  icon,
  onPress,
  onRemove,
  removeLabel = 'Remove',
  testID,
}: ChipProps) => {
  const [labelPressed, setLabelPressed] = useState(false);
  const [removePressed, setRemovePressed] = useState(false);

  const textColor = textColorFor(variant, selected);
  const pillStyle = [
    styles.pill,
    onRemove && styles.pillWithRemove,
    variant === 'outlined' && styles.bordered,
    {
      backgroundColor: bgFor(variant, selected, labelPressed),
      borderColor: borderColorFor(variant, selected),
    },
    disabled && styles.disabled,
  ];

  const label = (
    <>
      {selected ? (
        <Text style={{ color: textColor, fontSize: 13, fontWeight: '700' }}>✓</Text>
      ) : icon ? (
        icon
      ) : null}
      <Text style={[styles.label, { color: textColor }]} numberOfLines={1}>
        {children}
      </Text>
    </>
  );

  return (
    <View style={pillStyle} testID={testID}>
      {onPress ? (
        <Pressable
          onPress={onPress}
          onPressIn={() => setLabelPressed(true)}
          onPressOut={() => setLabelPressed(false)}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityState={{ selected, disabled }}
          accessibilityLabel={children}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
        >
          {label}
        </Pressable>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {label}
        </View>
      )}

      {onRemove ? (
        <Pressable
          onPress={onRemove}
          onPressIn={() => setRemovePressed(true)}
          onPressOut={() => setRemovePressed(false)}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={removeLabel}
          hitSlop={8}
          style={[
            styles.removeButton,
            removePressed && !disabled && { backgroundColor: 'rgba(255,255,255,0.1)' },
          ]}
        >
          <Text style={{ color: textColor, fontSize: 12 }}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

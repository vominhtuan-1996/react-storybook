import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { SnackbarProps } from './Snackbar.types';
import { borderColorForVariant, colors, styles } from './Snackbar.styles';

const variantGlyph: Record<string, string> = {
  success: '✓',
  error: '!',
};

export const Snackbar = ({
  id,
  message,
  variant = 'default',
  actionLabel,
  onAction,
  onDismiss,
  testID,
}: SnackbarProps) => {
  const [actionPressed, setActionPressed] = useState(false);
  const [dismissPressed, setDismissPressed] = useState(false);
  const glyph = variantGlyph[variant];
  const glyphColor = variant === 'error' ? colors.error : colors.success;

  return (
    <View
      testID={testID}
      accessible
      accessibilityRole={variant === 'error' ? 'alert' : 'text'}
      accessibilityLiveRegion="polite"
      style={[styles.card, { borderColor: borderColorForVariant(variant) }]}
    >
      {glyph ? (
        <Text style={[styles.icon, { color: glyphColor, fontWeight: '700' }]}>
          {glyph}
        </Text>
      ) : null}

      <Text style={styles.message}>{message}</Text>

      {actionLabel && onAction ? (
        <Pressable
          onPress={() => {
            onAction();
            onDismiss(id);
          }}
          onPressIn={() => setActionPressed(true)}
          onPressOut={() => setActionPressed(false)}
          accessibilityRole="button"
          hitSlop={8}
        >
          <Text
            style={[styles.actionText, actionPressed && styles.actionTextPressed]}
          >
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}

      <Pressable
        onPress={() => onDismiss(id)}
        onPressIn={() => setDismissPressed(true)}
        onPressOut={() => setDismissPressed(false)}
        accessibilityRole="button"
        accessibilityLabel="Dismiss notification"
        style={[styles.dismissButton, dismissPressed && styles.dismissButtonPressed]}
      >
        <Text style={{ color: colors.dismiss, fontSize: 14, lineHeight: 14 }}>
          ✕
        </Text>
      </Pressable>
    </View>
  );
};

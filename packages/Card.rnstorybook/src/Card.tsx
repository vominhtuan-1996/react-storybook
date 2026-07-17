import { useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import type { CardProps } from './Card.types';
import { containerBgFor, styles } from './Card.styles';
import { CardSkeleton } from './CardSkeleton';

export const Card = ({
  variant = 'elevated',
  selected = false,
  loading = false,
  disabled = false,
  onPress,
  media,
  title,
  subtitle,
  footer,
  children,
  testID,
  accessibilityLabel,
}: CardProps) => {
  const [focused, setFocused] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const isInteractive = !!onPress && !disabled;

  const animateTo = (toValue: number) => {
    Animated.timing(scale, {
      toValue,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const content = loading ? (
    <CardSkeleton />
  ) : (
    <>
      {media ? <View style={styles.media}>{media}</View> : null}
      {title ? (
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      ) : null}
      {subtitle ? (
        <Text style={styles.subtitle} numberOfLines={2}>
          {subtitle}
        </Text>
      ) : null}
      {children}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </>
  );

  const containerStyle = [
    styles.container,
    { backgroundColor: containerBgFor(variant) },
    variant === 'elevated' && styles.containerElevated,
    variant === 'flat' && styles.containerFlat,
    focused && !disabled && styles.containerFocused,
    selected && styles.containerSelected,
    disabled && styles.containerDisabled,
  ];

  if (!isInteractive) {
    return (
      <View
        style={containerStyle}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
      >
        {content}
      </View>
    );
  }

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={() => animateTo(0.99)}
        onPressOut={() => animateTo(1)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityState={{ disabled, selected }}
        style={containerStyle}
      >
        {content}
      </Pressable>
    </Animated.View>
  );
};

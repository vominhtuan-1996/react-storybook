import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Pressable, Text, View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import type { ExpandProps } from './Expand.types';
import { colors, styles } from './Expand.styles';

export const Expand = ({
  title,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onToggle,
  disabled = false,
  testID,
}: ExpandProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const [pressed, setPressed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);

  const heightAnim = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current;
  const chevronAnim = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then(setReduceMotion);
  }, []);

  useEffect(() => {
    if (measuredHeight === null) return;
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: open ? 1 : 0,
        duration: reduceMotion ? 0 : 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(chevronAnim, {
        toValue: open ? 1 : 0,
        duration: reduceMotion ? 0 : 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, measuredHeight, reduceMotion]);

  const toggle = () => {
    if (disabled) return;
    const next = !open;
    if (!isControlled) setInternalOpen(next);
    onToggle?.(next);
  };

  const handleContentLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (measuredHeight === null) {
      setMeasuredHeight(h);
      heightAnim.setValue(open ? 1 : 0);
    } else if (h !== measuredHeight) {
      setMeasuredHeight(h);
    }
  };

  const animatedHeight =
    measuredHeight === null
      ? undefined
      : heightAnim.interpolate({ inputRange: [0, 1], outputRange: [0, measuredHeight] });

  const rotate = chevronAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });

  return (
    <View testID={testID} style={[styles.container, disabled && styles.containerDisabled]}>
      <Pressable
        onPress={toggle}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ expanded: open, disabled }}
        style={[styles.header, pressed && !disabled && styles.headerPressed]}
      >
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Text style={{ fontSize: 12, color: colors.chevron }}>▾</Text>
        </Animated.View>
      </Pressable>

      <Animated.View style={[styles.content, { height: animatedHeight }]}>
        <View
          onLayout={handleContentLayout}
          style={[styles.contentInner, measuredHeight === null && { position: 'absolute', opacity: 0 }]}
        >
          {typeof children === 'string' ? <Text style={styles.contentText}>{children}</Text> : children}
        </View>
      </Animated.View>
    </View>
  );
};

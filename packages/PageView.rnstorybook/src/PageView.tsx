import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  PanResponder,
  Pressable,
  Text,
  View,
} from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import type { PageViewProps } from './PageView.types';
import { colors, styles } from './PageView.styles';

const SWIPE_VELOCITY_THRESHOLD = 0.35;
const SWIPE_DISTANCE_RATIO_THRESHOLD = 0.3;
const RUBBER_BAND_DIVISOR = 3;
const SETTLE_DURATION = 320;
const CROSSFADE_DURATION = 280;

export const PageView = ({
  pages,
  activeIndex: controlledIndex,
  onChange,
  transition = 'slide',
  showDots = true,
  showArrows = true,
  disabled = false,
  testID,
}: PageViewProps) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const index = controlledIndex ?? internalIndex;
  const count = pages.length;

  const [width, setWidth] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const fadeValues = useRef(pages.map((_, i) => new Animated.Value(i === 0 ? 1 : 0))).current;

  const indexRef = useRef(index);
  const widthRef = useRef(width);
  const countRef = useRef(count);
  const disabledRef = useRef(disabled);
  indexRef.current = index;
  widthRef.current = width;
  countRef.current = count;
  disabledRef.current = disabled;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then(setReduceMotion);
  }, []);

  const goTo = (nextIndex: number) => {
    const clamped = Math.max(0, Math.min(countRef.current - 1, nextIndex));
    if (clamped === indexRef.current) return;
    onChange?.(clamped);
    if (controlledIndex === undefined) setInternalIndex(clamped);
  };

  useEffect(() => {
    if (transition !== 'slide' || width === 0) return;
    Animated.timing(translateX, {
      toValue: -index * width,
      duration: reduceMotion ? 0 : SETTLE_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [index, width, transition, reduceMotion, translateX]);

  useEffect(() => {
    if (transition === 'slide') return;
    Animated.parallel(
      fadeValues.map((value, i) =>
        Animated.timing(value, {
          toValue: i === index ? 1 : 0,
          duration: reduceMotion ? 0 : CROSSFADE_DURATION,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ),
    ).start();
  }, [index, transition, reduceMotion, fadeValues]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () =>
          transition === 'slide' && !disabledRef.current && countRef.current > 1,
        onMoveShouldSetPanResponder: (_evt, gestureState) =>
          transition === 'slide' &&
          !disabledRef.current &&
          countRef.current > 1 &&
          Math.abs(gestureState.dx) > 4,
        onPanResponderMove: (_evt, gestureState) => {
          let dx = gestureState.dx;
          const atStart = indexRef.current === 0 && dx > 0;
          const atEnd = indexRef.current === countRef.current - 1 && dx < 0;
          if (atStart || atEnd) dx /= RUBBER_BAND_DIVISOR;
          translateX.setValue(-indexRef.current * widthRef.current + dx);
        },
        onPanResponderRelease: (_evt, gestureState) => {
          const w = widthRef.current || 1;
          const distanceRatio = Math.abs(gestureState.dx) / w;
          const shouldAdvance =
            Math.abs(gestureState.vx) > SWIPE_VELOCITY_THRESHOLD ||
            distanceRatio > SWIPE_DISTANCE_RATIO_THRESHOLD;

          if (shouldAdvance && gestureState.dx < 0 && indexRef.current < countRef.current - 1) {
            goTo(indexRef.current + 1);
          } else if (shouldAdvance && gestureState.dx > 0 && indexRef.current > 0) {
            goTo(indexRef.current - 1);
          } else {
            Animated.timing(translateX, {
              toValue: -indexRef.current * w,
              duration: reduceMotion ? 0 : SETTLE_DURATION,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transition, reduceMotion],
  );

  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setWidth(w);
    translateX.setValue(-index * w);
  };

  return (
    <View testID={testID}>
      <View
        style={styles.track}
        onLayout={handleLayout}
        accessibilityRole="adjustable"
        accessibilityLabel={`Page ${index + 1} of ${count}`}
      >
        {transition === 'slide' ? (
          <Animated.View
            style={[styles.slideRow, { transform: [{ translateX }] }]}
            {...panResponder.panHandlers}
          >
            {pages.map((page, i) => (
              <View key={i} style={{ width }}>
                {page}
              </View>
            ))}
          </Animated.View>
        ) : (
          <View>
            {pages.map((page, i) => {
              const opacity = fadeValues[i];
              const scale =
                transition === 'scale'
                  ? opacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.94, 1],
                    })
                  : 1;
              return (
                <Animated.View
                  key={i}
                  style={
                    i === index
                      ? { opacity, transform: [{ scale }] }
                      : [styles.fadeLayer, { opacity, transform: [{ scale }] }]
                  }
                  pointerEvents={i === index ? 'auto' : 'none'}
                >
                  {page}
                </Animated.View>
              );
            })}
          </View>
        )}

        {showArrows && count > 1 ? (
          <>
            <Pressable
              onPress={() => goTo(index - 1)}
              disabled={disabled || index === 0}
              accessibilityRole="button"
              accessibilityLabel="Previous page"
              style={[
                styles.arrow,
                styles.arrowLeft,
                (disabled || index === 0) && styles.arrowDisabled,
              ]}
            >
              <Text style={{ color: colors.arrowIcon, fontSize: 16 }}>‹</Text>
            </Pressable>
            <Pressable
              onPress={() => goTo(index + 1)}
              disabled={disabled || index === count - 1}
              accessibilityRole="button"
              accessibilityLabel="Next page"
              style={[
                styles.arrow,
                styles.arrowRight,
                (disabled || index === count - 1) && styles.arrowDisabled,
              ]}
            >
              <Text style={{ color: colors.arrowIcon, fontSize: 16 }}>›</Text>
            </Pressable>
          </>
        ) : null}
      </View>

      {showDots && count > 1 ? (
        <View style={styles.dotsRow} accessibilityRole="tablist">
          {pages.map((_, i) => (
            <Pressable
              key={i}
              onPress={() => goTo(i)}
              disabled={disabled}
              accessibilityRole="tab"
              accessibilityState={{ selected: i === index }}
              accessibilityLabel={`Go to page ${i + 1}`}
              style={styles.dotHitArea}
            >
              <View
                style={[
                  styles.dot,
                  i === index ? styles.dotActive : styles.dotInactiveSize,
                ]}
              />
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
};

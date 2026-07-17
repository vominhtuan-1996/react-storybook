import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Pressable, ScrollView, Text, View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import type { TabNavigationProps } from './TabNavigation.types';
import { styles } from './TabNavigation.styles';

interface TabLayout {
  x: number;
  width: number;
}

export const TabNavigation = ({ tabs, value, onChange, testID }: TabNavigationProps) => {
  const layouts = useRef<Record<string, TabLayout>>({});
  const indicatorX = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

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

  const handleTabLayout = (tabValue: string) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    layouts.current[tabValue] = { x, width };
    if (tabValue === value) animateToValue(tabValue);
  };

  return (
    <View testID={testID} style={styles.container}>
      <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false}>
        {tabs.map((tab) => {
          const isActive = tab.value === value;
          return (
            <Pressable
              key={tab.value}
              onLayout={handleTabLayout(tab.value)}
              onPress={() => !tab.disabled && onChange(tab.value)}
              disabled={tab.disabled}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive, disabled: tab.disabled }}
              accessibilityLabel={tab.label}
              style={styles.tab}
            >
              <Text
                style={[
                  styles.label,
                  tab.disabled ? styles.labelDisabled : isActive ? styles.labelActive : styles.labelDefault,
                ]}
              >
                {tab.label}
              </Text>
              {tab.badge != null && (
                <View style={[styles.badge, isActive ? styles.badgeActive : styles.badgeDefault]}>
                  <Text style={[styles.badgeText, isActive ? styles.badgeTextActive : styles.badgeTextDefault]}>
                    {tab.badge}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}

        {ready && (
          <Animated.View
            pointerEvents="none"
            style={[styles.indicator, { left: indicatorX, width: indicatorWidth }]}
          />
        )}
      </ScrollView>
    </View>
  );
};

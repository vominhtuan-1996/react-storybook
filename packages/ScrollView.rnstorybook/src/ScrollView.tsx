import { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView as RNScrollView,
  Text,
  View,
} from 'react-native';
import type { ScrollViewProps } from './ScrollView.types';
import { colors, styles } from './ScrollView.styles';

const SCROLL_END_SLOP = 1;

export const ScrollView = ({
  children,
  height = 240,
  showScrollToTop = true,
  scrollToTopThreshold = 200,
  testID,
}: ScrollViewProps) => {
  const scrollRef = useRef<RNScrollView>(null);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    const overflowing = contentSize.height > layoutMeasurement.height + SCROLL_END_SLOP;
    setIsOverflowing(overflowing);
    setAtTop(contentOffset.y <= SCROLL_END_SLOP);
    setAtBottom(
      contentOffset.y + layoutMeasurement.height >= contentSize.height - SCROLL_END_SLOP,
    );

    const shouldShow = showScrollToTop && contentOffset.y > scrollToTopThreshold;
    if (shouldShow !== showButton) {
      setShowButton(shouldShow);
      Animated.timing(buttonOpacity, {
        toValue: shouldShow ? 1 : 0,
        duration: 150,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const showTopShadow = isOverflowing && !atTop;
  const showBottomShadow = isOverflowing && !atBottom;

  return (
    <View style={styles.root} testID={testID}>
      {showTopShadow ? (
        <View
          pointerEvents="none"
          style={[styles.shadow, { top: 0, backgroundColor: colors.shadow }]}
        />
      ) : null}
      {showBottomShadow ? (
        <View
          pointerEvents="none"
          style={[styles.shadow, { bottom: 0, backgroundColor: colors.shadow }]}
        />
      ) : null}

      <RNScrollView
        ref={scrollRef}
        style={[styles.scroll, { height }]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {children}
      </RNScrollView>

      {showButton ? (
        <Animated.View
          style={[styles.scrollToTopButton, { opacity: buttonOpacity }]}
          pointerEvents={showButton ? 'auto' : 'none'}
        >
          <Pressable
            onPress={scrollToTop}
            accessibilityRole="button"
            accessibilityLabel="Scroll to top"
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ color: colors.buttonIcon, fontSize: 16 }}>↑</Text>
          </Pressable>
        </Animated.View>
      ) : null}
    </View>
  );
};

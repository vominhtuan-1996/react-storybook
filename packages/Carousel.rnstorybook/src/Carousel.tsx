import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import type { CarouselProps } from './Carousel.types';
import { styles } from './Carousel.styles';

export const Carousel = ({
  slides,
  autoPlay = true,
  intervalMs = 4000,
  loop = true,
  showDots = true,
  testID,
}: CarouselProps) => {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const scrollRef = useRef<ScrollView>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then(setReduceMotion);
  }, []);

  const isPlaying = autoPlay && !manuallyPaused && !reduceMotion && count > 1;

  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => {
        const next = loop ? (i + 1) % count : Math.min(count - 1, i + 1);
        scrollRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [isPlaying, intervalMs, count, loop, width]);

  if (count === 0) return null;

  const goTo = (next: number) => {
    const clamped = loop ? ((next % count) + count) % count : Math.max(0, Math.min(count - 1, next));
    setIndex(clamped);
    scrollRef.current?.scrollTo({ x: clamped * width, animated: true });
  };

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(Math.max(0, Math.min(count - 1, newIndex)));
  };

  return (
    <View testID={testID} style={styles.container} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumEnd}
        accessibilityRole="none"
        accessibilityLabel={`Slide ${index + 1} of ${count}`}
      >
        {slides.map((slide, i) => (
          <View key={i} style={[styles.slide, { width }]}>
            {slide}
          </View>
        ))}
      </ScrollView>

      {autoPlay && count > 1 && (
        <Pressable
          onPress={() => setManuallyPaused((p) => !p)}
          accessibilityRole="button"
          accessibilityLabel={manuallyPaused ? 'Play carousel' : 'Pause carousel'}
          accessibilityState={{ selected: manuallyPaused }}
          style={styles.playPauseButton}
          hitSlop={8}
        >
          <Text style={{ color: '#fff', fontSize: 12 }}>{manuallyPaused ? '▶' : '❚❚'}</Text>
        </Pressable>
      )}

      {showDots && count > 1 && (
        <View style={styles.dotsRow} accessibilityRole="tablist">
          {slides.map((_, i) => (
            <Pressable
              key={i}
              onPress={() => goTo(i)}
              accessibilityRole="tab"
              accessibilityState={{ selected: i === index }}
              accessibilityLabel={`Go to slide ${i + 1}`}
              style={styles.dotTouch}
              hitSlop={8}
            >
              <View style={[styles.dot, i === index && styles.dotActive]} />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

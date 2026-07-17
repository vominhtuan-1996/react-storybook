import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing } from 'react-native';
import type { EasingFunction } from 'react-native';
import type { AnimationEasing, AnimationPhase, AnimationProps, AnimationVariant } from './Animation.types';

const easingPresets: Record<string, EasingFunction> = {
  linear: Easing.linear,
  ease: Easing.bezier(0.25, 0.1, 0.25, 1),
  'ease-in': Easing.bezier(0.42, 0, 1, 1),
  'ease-out': Easing.bezier(0, 0, 0.58, 1),
  'ease-in-out': Easing.bezier(0.42, 0, 0.58, 1),
  back: Easing.bezier(0.34, 1.56, 0.64, 1),
  anticipate: Easing.bezier(0.36, 0, 0.66, -0.56),
};

function resolveEasing(easing: AnimationEasing): EasingFunction {
  if (Array.isArray(easing)) {
    const [x1, y1, x2, y2] = easing;
    return Easing.bezier(x1, y1, x2, y2);
  }
  return easingPresets[easing];
}

const hiddenTransform: Record<AnimationVariant, { translateX?: number; translateY?: number; scale?: number }> = {
  fade: {},
  'slide-up': { translateY: 16 },
  'slide-down': { translateY: -16 },
  'slide-left': { translateX: 16 },
  'slide-right': { translateX: -16 },
  scale: { scale: 0.92 },
  bounce: { scale: 0.85 },
};

export const Animation = ({
  show,
  children,
  variant = 'fade',
  duration = 250,
  easing = 'ease-out',
  exitDuration,
  unmountOnExit = true,
  onEntered,
  onExited,
  testID,
}: AnimationProps) => {
  const [phase, setPhase] = useState<AnimationPhase>(show ? 'entered' : 'exited');
  const [reduceMotion, setReduceMotion] = useState(false);
  const progress = useRef(new Animated.Value(show ? 1 : 0)).current;
  const effectiveExitDuration = exitDuration ?? Math.round(duration * 0.7);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then(setReduceMotion);
  }, []);

  useEffect(() => {
    const activeDuration = show ? duration : effectiveExitDuration;

    if (reduceMotion) {
      progress.setValue(show ? 1 : 0);
      setPhase(show ? 'entered' : 'exited');
      if (show) onEntered?.();
      else onExited?.();
      return;
    }

    setPhase(show ? 'entering' : 'exiting');

    const animation = Animated.timing(progress, {
      toValue: show ? 1 : 0,
      duration: activeDuration,
      easing: resolveEasing(easing),
      useNativeDriver: true,
    });

    animation.start(({ finished }) => {
      if (!finished) return;
      if (show) {
        setPhase('entered');
        onEntered?.();
      } else {
        setPhase('exited');
        onExited?.();
      }
    });

    return () => animation.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, reduceMotion]);

  if (phase === 'exited' && unmountOnExit) return null;

  const hidden = hiddenTransform[variant];
  const transforms = [];
  if (hidden.translateX != null) {
    transforms.push({
      translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [hidden.translateX, 0] }),
    });
  }
  if (hidden.translateY != null) {
    transforms.push({
      translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [hidden.translateY, 0] }),
    });
  }
  if (hidden.scale != null) {
    transforms.push({
      scale: progress.interpolate({ inputRange: [0, 1], outputRange: [hidden.scale, 1] }),
    });
  }

  return (
    <Animated.View
      testID={testID}
      style={{ opacity: progress, transform: transforms.length > 0 ? transforms : undefined }}
    >
      {children}
    </Animated.View>
  );
};

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  Platform,
} from 'react-native';
import type { View } from 'react-native';

const GAP_ABOVE_KEYBOARD = 12;
const SHOW_EVENT = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
const HIDE_EVENT = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

/**
 * Animates `translateY` so the field wrapped in `viewRef` lifts above the
 * on-screen keyboard while `active` (focused), and returns to its original
 * position on keyboard dismiss or blur. Mirrors the web TextField's
 * visualViewport-based behavior using RN's Keyboard API + measureInWindow.
 */
export function useKeyboardAvoidance(
  viewRef: RefObject<View>,
  active: boolean,
): Animated.Value {
  const translateY = useRef(new Animated.Value(0)).current;
  const reduceMotion = useRef(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then((enabled) => {
      reduceMotion.current = enabled;
    });
  }, []);

  useEffect(() => {
    if (!active) {
      translateY.setValue(0);
      return;
    }

    const animateTo = (toValue: number) => {
      if (reduceMotion.current) {
        translateY.setValue(toValue);
        return;
      }
      Animated.timing(translateY, {
        toValue,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    };

    const handleShow = (event: { endCoordinates: { height: number } }) => {
      const node = viewRef.current;
      if (!node) return;

      node.measureInWindow((_x, y, _width, height) => {
        const screenHeight = Dimensions.get('window').height;
        const keyboardTop = screenHeight - event.endCoordinates.height;
        const overlap = y + height - keyboardTop;
        animateTo(overlap > 0 ? -(overlap + GAP_ABOVE_KEYBOARD) : 0);
      });
    };

    const handleHide = () => animateTo(0);

    const showSub = Keyboard.addListener(SHOW_EVENT, handleShow);
    const hideSub = Keyboard.addListener(HIDE_EVENT, handleHide);

    return () => {
      showSub.remove();
      hideSub.remove();
      translateY.setValue(0);
    };
  }, [active, translateY, viewRef]);

  return translateY;
}

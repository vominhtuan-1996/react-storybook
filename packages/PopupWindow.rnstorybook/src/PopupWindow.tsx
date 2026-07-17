import { useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  Modal,
  Pressable,
  View,
} from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import type { PopupPlacement, PopupWindowProps } from './PopupWindow.types';
import { styles } from './PopupWindow.styles';

const GAP = 8;
const SCREEN_MARGIN = 8;

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Position {
  top: number;
  left: number;
}

function computePosition(
  anchor: Rect,
  panelWidth: number,
  panelHeight: number,
  placement: PopupPlacement,
): Position {
  const { width: vw, height: vh } = Dimensions.get('window');
  const wantsTop = placement.startsWith('top');
  const wantsEnd = placement.endsWith('end');

  const fitsBelow = anchor.y + anchor.height + GAP + panelHeight <= vh - SCREEN_MARGIN;
  const fitsAbove = anchor.y - GAP - panelHeight >= SCREEN_MARGIN;

  const useTop = wantsTop ? fitsAbove || !fitsBelow : !fitsBelow && fitsAbove;

  const top = useTop
    ? anchor.y - panelHeight - GAP
    : anchor.y + anchor.height + GAP;

  let left = wantsEnd ? anchor.x + anchor.width - panelWidth : anchor.x;
  left = Math.min(Math.max(left, SCREEN_MARGIN), vw - panelWidth - SCREEN_MARGIN);

  const clampedTop = Math.min(Math.max(top, SCREEN_MARGIN), vh - panelHeight - SCREEN_MARGIN);

  return { top: clampedTop, left };
}

export const PopupWindow = ({
  visible,
  onClose,
  anchorRef,
  placement = 'bottom-start',
  disabled = false,
  children,
  testID,
}: PopupWindowProps) => {
  const [anchorRect, setAnchorRect] = useState<Rect | null>(null);
  const [panelSize, setPanelSize] = useState<{ width: number; height: number } | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const reduceMotion = useRef(false);

  const isOpen = visible && !disabled;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then((v) => {
      reduceMotion.current = v;
    });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setAnchorRect(null);
      setPanelSize(null);
      opacity.setValue(0);
      return;
    }
    anchorRef.current?.measureInWindow((x, y, width, height) => {
      setAnchorRect({ x, y, width, height });
    });
  }, [isOpen, anchorRef, opacity]);

  useEffect(() => {
    if (!isOpen || !anchorRect || !panelSize) return;
    if (reduceMotion.current) {
      opacity.setValue(1);
      return;
    }
    Animated.timing(opacity, {
      toValue: 1,
      duration: 150,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isOpen, anchorRect, panelSize, opacity]);

  useEffect(() => {
    if (!isOpen) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [isOpen, onClose]);

  const handlePanelLayout = (e: LayoutChangeEvent) => {
    if (panelSize) return;
    const { width, height } = e.nativeEvent.layout;
    setPanelSize({ width, height });
  };

  if (!isOpen) return null;

  const position =
    anchorRect && panelSize
      ? computePosition(anchorRect, panelSize.width, panelSize.height, placement)
      : null;

  return (
    <Modal visible={isOpen} transparent animationType="none" onRequestClose={onClose} testID={testID}>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="none">
        <Animated.View
          onLayout={handlePanelLayout}
          onStartShouldSetResponder={() => true}
          style={[
            styles.panel,
            position
              ? { top: position.top, left: position.left, opacity }
              : { top: -9999, left: -9999, opacity: 0 },
          ]}
          accessibilityViewIsModal
          accessibilityRole="menu"
        >
          <View>{children}</View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

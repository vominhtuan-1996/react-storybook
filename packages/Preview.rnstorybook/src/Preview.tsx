import { useEffect, useState } from 'react';
import { AccessibilityInfo, Image, Modal, Pressable, Text, View } from 'react-native';
import type { PreviewProps } from './Preview.types';
import { colors, styles } from './Preview.styles';

type LoadStatus = 'loading' | 'success' | 'error';

const ImageGlyph = () => <Text style={{ fontSize: 24, color: colors.emptyIcon }}>▧</Text>;
const AlertGlyph = () => <Text style={{ fontSize: 20, color: colors.errorIcon }}>!</Text>;
const RetryGlyph = () => <Text style={{ fontSize: 13, color: colors.retryText }}>↻</Text>;
const ZoomGlyph = () => <Text style={{ fontSize: 15, color: '#E2E8F0' }}>⤢</Text>;
const CloseGlyph = () => <Text style={{ fontSize: 18, color: '#E2E8F0' }}>✕</Text>;

export const Preview = ({
  source,
  accessibilityLabel,
  aspectRatio = 4 / 3,
  zoomable = true,
  testID,
}: PreviewProps) => {
  const [status, setStatus] = useState<LoadStatus>(source ? 'loading' : 'error');
  const [attempt, setAttempt] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then(setReduceMotion);
  }, []);

  useEffect(() => {
    setStatus(source ? 'loading' : 'error');
  }, [source, attempt]);

  const isEmpty = !source;

  const openZoom = () => {
    if (zoomable && status === 'success') setZoomed(true);
  };

  return (
    <View testID={testID} style={[styles.container, { aspectRatio }]}>
      {!isEmpty && (
        <Image
          source={source}
          accessibilityLabel={accessibilityLabel}
          onLoad={() => setStatus('success')}
          onError={() => setStatus('error')}
          style={[styles.image, status !== 'success' && { opacity: 0 }]}
          key={attempt}
        />
      )}

      {status === 'loading' && !isEmpty && (
        <View style={styles.skeleton} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" />
      )}

      {status === 'error' && !isEmpty && (
        <View style={[styles.overlay, styles.centerContent]}>
          <AlertGlyph />
          <Text style={styles.errorText}>Failed to load image</Text>
          <Pressable
            onPress={() => setAttempt((a) => a + 1)}
            accessibilityRole="button"
            accessibilityLabel="Retry loading image"
            style={styles.retryButton}
            hitSlop={8}
          >
            <RetryGlyph />
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      )}

      {isEmpty && (
        <View style={[styles.overlay, styles.centerContent]}>
          <ImageGlyph />
          <Text style={styles.emptyText}>No image</Text>
        </View>
      )}

      {zoomable && status === 'success' && (
        <Pressable
          onPress={openZoom}
          accessibilityRole="button"
          accessibilityLabel="Zoom image"
          style={styles.zoomButton}
          hitSlop={8}
        >
          <ZoomGlyph />
        </Pressable>
      )}

      {zoomed && source && (
        <Modal
          visible={zoomed}
          transparent
          animationType={reduceMotion ? 'none' : 'fade'}
          statusBarTranslucent
          onRequestClose={() => setZoomed(false)}
        >
          <View style={styles.scrim}>
            <Pressable
              style={{ ...styles.overlay, position: 'absolute' }}
              onPress={() => setZoomed(false)}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            />
            <Image
              source={source}
              accessibilityLabel={accessibilityLabel}
              resizeMode="contain"
              style={styles.zoomImage}
            />
            <Pressable
              onPress={() => setZoomed(false)}
              accessibilityRole="button"
              accessibilityLabel="Close zoomed image"
              style={styles.closeButton}
              hitSlop={8}
            >
              <CloseGlyph />
            </Pressable>
          </View>
        </Modal>
      )}
    </View>
  );
};

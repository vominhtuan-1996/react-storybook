import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import type { DialogProps, DialogVariant } from './Dialog.types';
import { colors, styles, variantColors } from './Dialog.styles';

const CloseGlyph = () => (
  <Text style={{ fontSize: 18, color: colors.closeIcon, lineHeight: 18 }}>
    ✕
  </Text>
);

const variantGlyph: Record<DialogVariant, string> = {
  confirmation: '?',
  success: '✓',
  error: '✕',
  warning: '!',
};

const variantLabel: Record<DialogVariant, string> = {
  confirmation: 'Confirmation',
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
};

export const Dialog = ({
  visible,
  onClose,
  title,
  description,
  variant = 'confirmation',
  children,
  footer,
  testID,
}: DialogProps) => {
  const [closePressed, setClosePressed] = useState(false);
  const [closeFocused, setCloseFocused] = useState(false);
  const { icon, badge } = variantColors(variant);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
      testID={testID}
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdropPressable}
          onPress={onClose}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        />

        <View
          style={styles.panel}
          accessibilityViewIsModal
          accessibilityRole="none"
        >
          <View style={styles.header}>
            <View style={styles.titleGroup}>
              <View
                style={[styles.variantBadge, { backgroundColor: badge }]}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              >
                <Text style={{ fontSize: 16, fontWeight: '700', color: icon }}>
                  {variantGlyph[variant]}
                </Text>
              </View>
              <Text
                style={styles.title}
                accessibilityRole="header"
                numberOfLines={2}
              >
                {title}
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              onPressIn={() => setClosePressed(true)}
              onPressOut={() => setClosePressed(false)}
              onFocus={() => setCloseFocused(true)}
              onBlur={() => setCloseFocused(false)}
              accessibilityRole="button"
              accessibilityLabel="Close dialog"
              style={[
                styles.closeButton,
                closePressed && styles.closeButtonPressed,
                closeFocused && styles.closeButtonFocused,
              ]}
            >
              <CloseGlyph />
            </Pressable>
          </View>

          {description ? (
            <Text
              style={styles.description}
              accessibilityLabel={`${variantLabel[variant]}: ${description}`}
            >
              {description}
            </Text>
          ) : null}

          {children ? <View style={styles.content}>{children}</View> : null}

          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </View>
      </View>
    </Modal>
  );
};

import { StyleSheet } from 'react-native';
import type { DialogVariant } from './Dialog.types';

export const colors = {
  backdrop: 'rgba(2, 6, 23, 0.6)',
  panelBg: '#0F172A',
  border: '#1E293B',
  title: '#FFFFFF',
  description: '#94A3B8',
  content: '#CBD5E1',
  closeIcon: '#94A3B8',
  closePressed: '#1E293B',
  focusRing: '#34D399',
  confirmation: { icon: '#818CF8', badge: 'rgba(99, 102, 241, 0.15)' },
  success: { icon: '#34D399', badge: 'rgba(16, 185, 129, 0.15)' },
  error: { icon: '#F87171', badge: 'rgba(239, 68, 68, 0.15)' },
  warning: { icon: '#FBBF24', badge: 'rgba(245, 158, 11, 0.15)' },
};

export function variantColors(variant: DialogVariant) {
  return colors[variant];
}

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: colors.backdrop,
  },
  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  panel: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panelBg,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
  },
  titleGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  variantBadge: {
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    marginTop: 4,
    fontSize: 18,
    fontWeight: '600',
    color: colors.title,
  },
  closeButton: {
    height: 44,
    width: 44,
    marginTop: -10,
    marginRight: -10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  closeButtonPressed: {
    backgroundColor: colors.closePressed,
  },
  closeButtonFocused: {
    borderWidth: 2,
    borderColor: colors.focusRing,
  },
  description: {
    marginTop: 12,
    marginLeft: 48,
    fontSize: 14,
    lineHeight: 20,
    color: colors.description,
  },
  content: {
    marginTop: 16,
    marginLeft: 48,
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});

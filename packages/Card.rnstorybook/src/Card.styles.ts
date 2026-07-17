import { StyleSheet } from 'react-native';
import type { CardVariant } from './Card.types';

export const colors = {
  elevatedBg: 'rgba(15, 23, 42, 0.6)',
  outlinedBg: 'rgba(15, 23, 42, 0.3)',
  flatBg: 'rgba(15, 23, 42, 0.4)',
  border: '#1E293B',
  borderFocused: '#334155',
  borderSelected: '#10B981',
  selectedRing: 'rgba(16, 185, 129, 0.5)',
  title: '#FFFFFF',
  subtitle: '#94A3B8',
  skeleton: '#1E293B',
};

export function containerBgFor(variant: CardVariant): string {
  if (variant === 'outlined') return colors.outlinedBg;
  if (variant === 'flat') return colors.flatBg;
  return colors.elevatedBg;
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    overflow: 'hidden',
  },
  containerElevated: {
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  containerFlat: {
    borderColor: 'transparent',
  },
  containerSelected: {
    borderColor: colors.borderSelected,
  },
  containerFocused: {
    borderColor: colors.borderFocused,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  media: {
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.title,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: colors.subtitle,
  },
  footer: {
    marginTop: 16,
  },
  skeletonBlock: {
    borderRadius: 8,
    backgroundColor: colors.skeleton,
  },
});

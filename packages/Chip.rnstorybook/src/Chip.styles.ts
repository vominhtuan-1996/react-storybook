import { StyleSheet } from 'react-native';
import type { ChipVariant } from './Chip.types';

export const colors = {
  filledBg: '#1E293B',
  filledText: '#E2E8F0',
  filledPressed: '#334155',
  outlinedBorder: '#334155',
  outlinedText: '#CBD5E1',
  outlinedPressed: '#0F172A',
  selectedFilledBg: '#10B981',
  selectedFilledText: '#020617',
  selectedFilledPressed: '#34D399',
  selectedOutlinedBorder: '#10B981',
  selectedOutlinedBg: 'rgba(16, 185, 129, 0.15)',
  selectedOutlinedText: '#6EE7B7',
  selectedOutlinedPressed: 'rgba(16, 185, 129, 0.25)',
};

export function bgFor(
  variant: ChipVariant,
  selected: boolean,
  pressed: boolean,
): string {
  if (variant === 'outlined') {
    if (selected) return pressed ? colors.selectedOutlinedPressed : colors.selectedOutlinedBg;
    return pressed ? colors.outlinedPressed : 'transparent';
  }
  if (selected) return pressed ? colors.selectedFilledPressed : colors.selectedFilledBg;
  return pressed ? colors.filledPressed : colors.filledBg;
}

export function textColorFor(variant: ChipVariant, selected: boolean): string {
  if (selected) return variant === 'outlined' ? colors.selectedOutlinedText : colors.selectedFilledText;
  return variant === 'outlined' ? colors.outlinedText : colors.filledText;
}

export function borderColorFor(variant: ChipVariant, selected: boolean): string | undefined {
  if (variant !== 'outlined') return undefined;
  return selected ? colors.selectedOutlinedBorder : colors.outlinedBorder;
}

export const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 12,
    gap: 6,
  },
  pillWithRemove: {
    paddingRight: 6,
  },
  bordered: {
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    maxWidth: 200,
  },
  removeButton: {
    height: 32,
    width: 32,
    marginLeft: -2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
});

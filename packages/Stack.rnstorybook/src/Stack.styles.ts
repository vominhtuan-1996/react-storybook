import { StyleSheet } from 'react-native';

export const colors = {
  divider: '#1E293B',
};

const spacingValue: Record<string, number> = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const spacingPx = spacingValue;

export const styles = StyleSheet.create({
  dividerRow: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: colors.divider,
  },
  dividerColumn: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: colors.divider,
  },
});

import { StyleSheet } from 'react-native';

export const colors = {
  border: '#1E293B',
  bg: 'rgba(15, 23, 42, 0.6)',
  indicator: 'rgba(16, 185, 129, 0.9)',
  textActive: '#020617',
  textDefault: '#CBD5E1',
  textDisabled: '#475569',
  segmentPressedBg: 'rgba(30, 41, 59, 0.6)',
};

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    padding: 4,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  indicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    borderRadius: 8,
    backgroundColor: colors.indicator,
  },
  segment: {
    height: 32,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  segmentPressed: {
    backgroundColor: colors.segmentPressedBg,
  },
  segmentFullWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  labelActive: {
    color: colors.textActive,
  },
  labelDefault: {
    color: colors.textDefault,
  },
  labelDisabled: {
    color: colors.textDisabled,
  },
});

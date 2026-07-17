import { StyleSheet } from 'react-native';

export const colors = {
  border: '#1E293B',
  indicator: '#34D399',
  textActive: '#FFFFFF',
  textDefault: '#94A3B8',
  textDisabled: '#475569',
  badgeBgActive: '#10B981',
  badgeTextActive: '#020617',
  badgeBgDefault: '#1E293B',
  badgeTextDefault: '#CBD5E1',
};

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  tab: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
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
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeActive: {
    backgroundColor: colors.badgeBgActive,
  },
  badgeDefault: {
    backgroundColor: colors.badgeBgDefault,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeTextActive: {
    color: colors.badgeTextActive,
  },
  badgeTextDefault: {
    color: colors.badgeTextDefault,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.indicator,
  },
});

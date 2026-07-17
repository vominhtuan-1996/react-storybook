import { StyleSheet } from 'react-native';

export const colors = {
  groupLabel: '#E2E8F0',
  border: '#475569',
  borderHover: '#94A3B8',
  borderChecked: '#10B981',
  borderError: '#EF4444',
  dot: '#10B981',
  focusRing: '#34D399',
  labelDefault: '#E2E8F0',
  labelDisabled: '#64748B',
  descriptionDefault: '#64748B',
  descriptionError: '#F87171',
  errorText: '#F87171',
};

export const styles = StyleSheet.create({
  group: {
    gap: 4,
  },
  groupLabel: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
    color: colors.groupLabel,
  },
  row: {
    flexDirection: 'row',
  },
  touchArea: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircleFocused: {
    borderColor: colors.focusRing,
  },
  outerCircleDisabled: {
    opacity: 0.5,
  },
  innerDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.dot,
  },
  textCol: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 4,
    minHeight: 44,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 16,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    color: colors.errorText,
  },
});

import { StyleSheet } from 'react-native';

export const colors = {
  border: '#475569',
  borderHover: '#94A3B8',
  borderError: '#EF4444',
  boxBg: '#020617',
  checkedBg: '#10B981',
  checkedBorder: '#10B981',
  checkGlyph: '#020617',
  focusRing: '#34D399',
  labelDefault: '#E2E8F0',
  labelDisabled: '#64748B',
  descriptionDefault: '#64748B',
  descriptionError: '#F87171',
  required: '#F87171',
};

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  touchArea: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 20,
    width: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFocused: {
    borderColor: colors.focusRing,
  },
  boxDisabled: {
    opacity: 0.5,
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
  required: {
    color: colors.required,
  },
  description: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 16,
  },
});

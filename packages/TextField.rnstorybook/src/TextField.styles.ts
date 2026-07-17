import { StyleSheet } from 'react-native';

export const colors = {
  label: '#E2E8F0',
  required: '#F87171',
  count: '#64748B',
  fieldBg: '#020617',
  fieldBgReadOnly: '#0F172A',
  border: '#334155',
  borderFocus: '#34D399',
  borderError: '#EF4444',
  borderSuccess: '#10B981',
  text: '#F1F5F9',
  placeholder: '#64748B',
  helperDefault: '#64748B',
  helperError: '#F87171',
  helperSuccess: '#34D399',
  iconError: '#F87171',
  iconSuccess: '#34D399',
  toggleIcon: '#94A3B8',
  togglePressed: '#1E293B',
};

export function borderColorFor(
  status: 'default' | 'error' | 'success',
  focused: boolean,
): string {
  if (status === 'error') return colors.borderError;
  if (status === 'success') return colors.borderSuccess;
  if (focused) return colors.borderFocus;
  return colors.border;
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.label,
  },
  required: {
    color: colors.required,
  },
  count: {
    fontSize: 12,
    color: colors.count,
  },
  fieldWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.fieldBg,
    paddingHorizontal: 12,
  },
  fieldWrapReadOnly: {
    backgroundColor: colors.fieldBgReadOnly,
  },
  fieldWrapDisabled: {
    opacity: 0.5,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 15,
    color: colors.text,
    padding: 0,
  },
  toggleButton: {
    height: 44,
    width: 44,
    marginRight: -12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  toggleButtonPressed: {
    backgroundColor: colors.togglePressed,
  },
  helperText: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 16,
  },
});

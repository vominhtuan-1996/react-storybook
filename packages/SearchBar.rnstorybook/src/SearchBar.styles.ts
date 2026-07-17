import { StyleSheet } from 'react-native';

export const colors = {
  fieldBg: '#020617',
  border: '#334155',
  borderFocused: '#34D399',
  borderError: '#EF4444',
  icon: '#64748B',
  text: '#F1F5F9',
  placeholder: '#64748B',
  clearIcon: '#94A3B8',
  errorText: '#F87171',
  listBg: '#0F172A',
  listBorder: '#1E293B',
  optionText: '#CBD5E1',
  optionHighlightBg: '#1E293B',
  emptyText: '#64748B',
};

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.fieldBg,
    paddingHorizontal: 12,
    gap: 8,
  },
  fieldFocused: {
    borderColor: colors.borderFocused,
  },
  fieldError: {
    borderColor: colors.borderError,
  },
  fieldDisabled: {
    opacity: 0.5,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: colors.text,
    padding: 0,
  },
  clearButton: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 16,
    color: colors.errorText,
  },
  suggestionList: {
    marginTop: 6,
    maxHeight: 240,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.listBorder,
    backgroundColor: colors.listBg,
    paddingVertical: 4,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  optionHighlighted: {
    backgroundColor: colors.optionHighlightBg,
  },
  optionText: {
    fontSize: 15,
    color: colors.optionText,
  },
  emptyState: {
    paddingVertical: 24,
    alignItems: 'center',
  },
});

import { StyleSheet } from 'react-native';

export const colors = {
  border: '#1E293B',
  surface: 'rgba(15, 23, 42, 0.4)',
  headerPressedBg: 'rgba(30, 41, 59, 0.6)',
  title: '#E2E8F0',
  chevron: '#94A3B8',
  contentText: '#CBD5E1',
};

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  header: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 16,
  },
  headerPressed: {
    backgroundColor: colors.headerPressedBg,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.title,
  },
  content: {
    overflow: 'hidden',
  },
  contentInner: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.contentText,
  },
});

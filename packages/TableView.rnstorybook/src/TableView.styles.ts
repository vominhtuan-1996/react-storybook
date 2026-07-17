import { StyleSheet } from 'react-native';

export const colors = {
  border: '#1E293B',
  headerBg: 'rgba(15, 23, 42, 0.6)',
  headerText: '#94A3B8',
  sortActive: '#34D399',
  sortInactive: '#475569',
  rowText: '#E2E8F0',
  rowSelectedBg: 'rgba(16, 185, 129, 0.1)',
  rowPressedBg: 'rgba(30, 41, 59, 0.6)',
  skeleton: '#1E293B',
  errorIconBg: 'rgba(239, 68, 68, 0.1)',
  errorIcon: '#F87171',
  stateTitle: '#E2E8F0',
  stateBody: '#64748B',
  retryBorder: '#1E293B',
  retryText: '#E2E8F0',
  emptyIconBg: '#1E293B',
  emptyIcon: '#64748B',
};

export const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.headerBg,
  },
  headerCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.headerText,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowSelected: {
    backgroundColor: colors.rowSelectedBg,
  },
  rowPressed: {
    backgroundColor: colors.rowPressedBg,
  },
  cell: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 14,
    color: colors.rowText,
  },
  skeletonLine: {
    height: 12,
    width: '70%',
    borderRadius: 6,
    backgroundColor: colors.skeleton,
  },
  centerState: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  iconBadge: {
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.stateTitle,
  },
  stateBody: {
    maxWidth: 260,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
    color: colors.stateBody,
  },
  retryButton: {
    marginTop: 4,
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.retryBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.retryText,
  },
});

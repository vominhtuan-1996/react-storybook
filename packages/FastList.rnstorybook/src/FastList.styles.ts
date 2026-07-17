import { StyleSheet } from 'react-native';

export const colors = {
  border: '#1E293B',
  bg: 'rgba(15, 23, 42, 0.4)',
  skeletonAvatar: '#1E293B',
  skeletonLine: '#1E293B',
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
    backgroundColor: colors.bg,
    overflow: 'hidden',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },
  skeletonAvatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: colors.skeletonAvatar,
  },
  skeletonLine: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.skeletonLine,
  },
  centerState: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
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

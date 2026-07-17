import { StyleSheet } from 'react-native';

export const colors = {
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
  tileGap: {
    marginBottom: 12,
  },
  skeletonTile: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: colors.skeleton,
    marginHorizontal: 6,
  },
  skeletonRow: {
    flexDirection: 'row',
    marginBottom: 12,
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
  gridItem: {
    flex: 1,
    marginHorizontal: 6,
  },
});

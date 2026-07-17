import { StyleSheet } from 'react-native';

export const colors = {
  border: '#1E293B',
  surface: 'rgba(15, 23, 42, 0.4)',
  skeleton: 'rgba(30, 41, 59, 0.6)',
  errorText: '#94A3B8',
  errorIcon: '#F87171',
  retryText: '#34D399',
  emptyIcon: '#475569',
  emptyText: '#64748B',
  controlBg: 'rgba(2, 6, 23, 0.8)',
  scrim: 'rgba(2, 6, 23, 0.9)',
};

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeleton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.skeleton,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
  },
  errorText: {
    fontSize: 12,
    color: colors.errorText,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 4,
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.retryText,
  },
  emptyText: {
    fontSize: 12,
    color: colors.emptyText,
  },
  zoomButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.controlBg,
  },
  scrim: {
    flex: 1,
    backgroundColor: colors.scrim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomImage: {
    width: '92%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 48,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
  },
});

import { StyleSheet } from 'react-native';

export const colors = {
  border: '#1E293B',
  bg: 'rgba(15, 23, 42, 0.4)',
  arrowBg: 'rgba(2, 6, 23, 0.8)',
  arrowIcon: '#E2E8F0',
  dotActive: '#34D399',
  dotInactive: '#334155',
  dotPressed: '#475569',
};

export const styles = StyleSheet.create({
  track: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    overflow: 'hidden',
  },
  slideRow: {
    flexDirection: 'row',
  },
  fadeLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    marginTop: -18,
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: colors.arrowBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowLeft: {
    left: 8,
  },
  arrowRight: {
    right: 8,
  },
  arrowDisabled: {
    opacity: 0.3,
  },
  dotsRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dotHitArea: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.dotInactive,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.dotActive,
  },
  dotInactiveSize: {
    width: 8,
  },
});

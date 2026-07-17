import { StyleSheet } from 'react-native';

export const colors = {
  border: '#1E293B',
  surface: 'rgba(15, 23, 42, 0.4)',
  controlBg: 'rgba(2, 6, 23, 0.8)',
  dotActive: '#34D399',
  dotDefault: '#334155',
};

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.controlBg,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  dotTouch: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: colors.dotDefault,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.dotActive,
  },
});

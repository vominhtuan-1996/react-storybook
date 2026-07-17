import { StyleSheet } from 'react-native';

export const colors = {
  border: '#1E293B',
  bg: 'rgba(15, 23, 42, 0.4)',
  shadow: 'rgba(2, 6, 23, 0.55)',
  buttonBg: '#1E293B',
  buttonIcon: '#E2E8F0',
};

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
  scroll: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  shadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 24,
    zIndex: 1,
  },
  shadowTop: {
    top: 0,
  },
  shadowBottom: {
    bottom: 0,
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.buttonBg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    zIndex: 2,
  },
});

import { StyleSheet } from 'react-native';
import type { SnackbarVariant } from './Snackbar.types';

export const colors = {
  bg: '#0F172A',
  border: '#334155',
  borderSuccess: 'rgba(16, 185, 129, 0.4)',
  borderError: 'rgba(239, 68, 68, 0.4)',
  message: '#F1F5F9',
  action: '#34D399',
  actionPressed: '#6EE7B7',
  dismiss: '#94A3B8',
  dismissPressed: '#1E293B',
  success: '#34D399',
  error: '#F87171',
};

export function borderColorForVariant(variant: SnackbarVariant): string {
  if (variant === 'success') return colors.borderSuccess;
  if (variant === 'error') return colors.borderError;
  return colors.border;
}

export const styles = StyleSheet.create({
  stack: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.bg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  icon: {
    marginTop: 2,
  },
  message: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: colors.message,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.action,
  },
  actionTextPressed: {
    color: colors.actionPressed,
  },
  dismissButton: {
    height: 44,
    width: 44,
    marginTop: -12,
    marginRight: -12,
    marginLeft: -4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  dismissButtonPressed: {
    backgroundColor: colors.dismissPressed,
  },
});

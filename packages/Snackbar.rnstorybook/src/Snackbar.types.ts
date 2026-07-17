export type SnackbarVariant = 'default' | 'success' | 'error';

export interface SnackbarItem {
  id: string;
  message: string;
  variant?: SnackbarVariant;
  actionLabel?: string;
  onAction?: () => void;
}

export interface SnackbarProps extends SnackbarItem {
  onDismiss: (id: string) => void;
  testID?: string;
}

export interface ShowSnackbarOptions {
  variant?: SnackbarVariant;
  durationMs?: number;
  actionLabel?: string;
  onAction?: () => void;
}

export interface SnackbarContextValue {
  showSnackbar: (message: string, options?: ShowSnackbarOptions) => void;
}

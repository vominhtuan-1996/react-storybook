import type { ReactNode } from 'react';

export type DialogVariant = 'confirmation' | 'success' | 'error' | 'warning';

export interface DialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  variant?: DialogVariant;
  children?: ReactNode;
  footer?: ReactNode;
  testID?: string;
}

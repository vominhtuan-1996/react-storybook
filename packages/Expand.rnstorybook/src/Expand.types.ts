import type { ReactNode } from 'react';

export interface ExpandProps {
  title: ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  disabled?: boolean;
  testID?: string;
}

import type { ReactNode } from 'react';

export type ChipVariant = 'filled' | 'outlined';

export interface ChipProps {
  children: string;
  variant?: ChipVariant;
  selected?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  onPress?: () => void;
  onRemove?: () => void;
  removeLabel?: string;
  testID?: string;
}

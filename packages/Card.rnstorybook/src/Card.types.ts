import type { ReactNode } from 'react';
import type { GestureResponderEvent } from 'react-native';

export type CardVariant = 'elevated' | 'outlined' | 'flat';

export interface CardProps {
  variant?: CardVariant;
  selected?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  media?: ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  children?: ReactNode;
  testID?: string;
  accessibilityLabel?: string;
}

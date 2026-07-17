import type { ReactNode, RefObject } from 'react';
import type { View } from 'react-native';

export type PopupPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export interface PopupWindowProps {
  visible: boolean;
  onClose: () => void;
  anchorRef: RefObject<View>;
  placement?: PopupPlacement;
  disabled?: boolean;
  children: ReactNode;
  testID?: string;
}

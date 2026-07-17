import type { ReactNode } from 'react';

export type AnimationVariant = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'bounce';

export type AnimationEasingPreset = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'back' | 'anticipate';

export type AnimationEasing = AnimationEasingPreset | [number, number, number, number];

export type AnimationPhase = 'exited' | 'entering' | 'entered' | 'exiting';

export interface AnimationProps {
  show: boolean;
  children: ReactNode;
  variant?: AnimationVariant;
  duration?: number;
  easing?: AnimationEasing;
  exitDuration?: number;
  unmountOnExit?: boolean;
  onEntered?: () => void;
  onExited?: () => void;
  testID?: string;
}

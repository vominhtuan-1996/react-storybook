import type { ReactNode } from 'react';

export interface ScrollViewProps {
  children: ReactNode;
  height?: number;
  showScrollToTop?: boolean;
  scrollToTopThreshold?: number;
  testID?: string;
}

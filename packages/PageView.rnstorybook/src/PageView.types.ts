import type { ReactNode } from 'react';

export type PageTransition = 'slide' | 'fade' | 'scale';

export interface PageViewProps {
  pages: ReactNode[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  transition?: PageTransition;
  showDots?: boolean;
  showArrows?: boolean;
  disabled?: boolean;
  testID?: string;
}

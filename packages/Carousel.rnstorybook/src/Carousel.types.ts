import type { ReactNode } from 'react';

export interface CarouselProps {
  slides: ReactNode[];
  autoPlay?: boolean;
  intervalMs?: number;
  loop?: boolean;
  showDots?: boolean;
  testID?: string;
}

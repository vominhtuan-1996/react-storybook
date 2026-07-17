import type { ReactNode } from 'react';

export type GridViewStatus = 'loading' | 'error' | 'success';

export interface GridViewProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  status: GridViewStatus;
  error?: string;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  columns?: 2 | 3 | 4;
  testID?: string;
}

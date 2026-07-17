import type { ReactNode } from 'react';

export type FastListStatus = 'loading' | 'error' | 'success';

export interface FastListProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  status: FastListStatus;
  error?: string;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  testID?: string;
}

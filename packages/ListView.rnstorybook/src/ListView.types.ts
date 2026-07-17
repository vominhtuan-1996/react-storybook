import type { ReactNode } from 'react';

export type ListViewStatus = 'loading' | 'error' | 'success';

export interface ListViewProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  status: ListViewStatus;
  error?: string;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  loadMoreError?: string;
  onLoadMore?: () => void;
  onRetryLoadMore?: () => void;
  testID?: string;
}

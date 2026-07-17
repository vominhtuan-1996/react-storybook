import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ListView } from '@/components/ui/ListView';

interface Item {
  id: string;
  name: string;
}

const items: Item[] = [
  { id: '1', name: 'One' },
  { id: '2', name: 'Two' },
];

const baseProps = {
  renderItem: (item: Item) => <span>{item.name}</span>,
  keyExtractor: (item: Item) => item.id,
};

describe('ListView', () => {
  it('shows loading skeleton', () => {
    render(<ListView items={[]} status="loading" {...baseProps} />);
    expect(screen.getByRole('status', { name: 'Loading items' })).toBeInTheDocument();
  });

  it('shows error state and calls onRetry', async () => {
    const onRetry = vi.fn();
    render(<ListView items={[]} status="error" error="Timeout" onRetry={onRetry} {...baseProps} />);
    expect(screen.getByText('Timeout')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('shows empty state', () => {
    render(<ListView items={[]} status="success" emptyTitle="No results" {...baseProps} />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders list items', () => {
    render(<ListView items={items} status="success" {...baseProps} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('shows item count and calls onRefresh', async () => {
    const onRefresh = vi.fn();
    render(<ListView items={items} status="success" onRefresh={onRefresh} {...baseProps} />);
    expect(screen.getByText('2 items')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Refresh list' }));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('disables refresh button and shows refreshing text while refreshing', () => {
    render(<ListView items={items} status="success" onRefresh={vi.fn()} isRefreshing {...baseProps} />);
    expect(screen.getByText('Refreshing…')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refresh list' })).toBeDisabled();
  });

  it('shows Load more button and calls onLoadMore', async () => {
    const onLoadMore = vi.fn();
    render(<ListView items={items} status="success" hasMore onLoadMore={onLoadMore} {...baseProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Load more' }));
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('shows loading-more spinner text instead of button while loading more', () => {
    render(<ListView items={items} status="success" hasMore isLoadingMore onLoadMore={vi.fn()} {...baseProps} />);
    expect(screen.getByText('Loading more…')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Load more' })).not.toBeInTheDocument();
  });

  it('shows load-more error and calls onRetryLoadMore', async () => {
    const onRetryLoadMore = vi.fn();
    render(
      <ListView
        items={items}
        status="success"
        hasMore
        loadMoreError="Failed to load more"
        onRetryLoadMore={onRetryLoadMore}
        {...baseProps}
      />,
    );
    expect(screen.getByText('Failed to load more')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetryLoadMore).toHaveBeenCalledTimes(1);
  });

  it('shows end-of-list message when no more items', () => {
    render(<ListView items={items} status="success" hasMore={false} {...baseProps} />);
    expect(screen.getByText("You've reached the end.")).toBeInTheDocument();
  });
});

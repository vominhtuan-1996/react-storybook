import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FastList } from '@/components/ui/FastList';

interface Row {
  id: string;
  name: string;
}

const items: Row[] = Array.from({ length: 50 }, (_, i) => ({ id: `row-${i}`, name: `Item ${i}` }));

const baseProps = {
  itemHeight: 40,
  height: 200,
  renderItem: (item: Row) => <span>{item.name}</span>,
  keyExtractor: (item: Row) => item.id,
};

describe('FastList', () => {
  it('renders skeleton rows while loading', () => {
    render(<FastList items={[]} status="loading" {...baseProps} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders error state with message and retry button', async () => {
    const onRetry = vi.fn();
    render(<FastList items={[]} status="error" error="Network down" onRetry={onRetry} {...baseProps} />);
    expect(screen.getByText('Network down')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders empty state when success with no items', () => {
    render(
      <FastList
        items={[]}
        status="success"
        emptyTitle="No packages"
        emptyDescription="Publish one to see it here."
        {...baseProps}
      />,
    );
    expect(screen.getByText('No packages')).toBeInTheDocument();
    expect(screen.getByText('Publish one to see it here.')).toBeInTheDocument();
  });

  it('virtualizes and only renders a window of items, not all 50', () => {
    render(<FastList items={items} status="success" {...baseProps} />);
    const list = screen.getByRole('list');
    expect(list).toHaveAttribute('aria-rowcount', '50');
    const rendered = screen.getAllByRole('listitem');
    expect(rendered.length).toBeGreaterThan(0);
    expect(rendered.length).toBeLessThan(50);
    expect(screen.getByText('Item 0')).toBeInTheDocument();
  });
});

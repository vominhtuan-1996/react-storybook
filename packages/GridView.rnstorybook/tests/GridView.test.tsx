import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GridView } from '@/components/ui/GridView';

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

describe('GridView', () => {
  it('shows loading skeleton with status role', () => {
    render(<GridView items={[]} status="loading" {...baseProps} />);
    expect(screen.getByRole('status', { name: 'Loading grid' })).toBeInTheDocument();
  });

  it('shows error state and calls onRetry', async () => {
    const onRetry = vi.fn();
    render(<GridView items={[]} status="error" error="Boom" onRetry={onRetry} {...baseProps} />);
    expect(screen.getByText('Boom')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('shows empty state when success with no items', () => {
    render(<GridView items={[]} status="success" emptyTitle="Empty grid" {...baseProps} />);
    expect(screen.getByText('Empty grid')).toBeInTheDocument();
  });

  it('renders items as a list', () => {
    render(<GridView items={items} status="success" {...baseProps} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });
});

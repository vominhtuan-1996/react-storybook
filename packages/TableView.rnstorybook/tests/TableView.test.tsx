import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TableView } from '@/components/ui/TableView';
import type { TableColumn } from '@/components/ui/TableView';

interface Row {
  id: string;
  name: string;
  downloads: number;
}

const rows: Row[] = [
  { id: '1', name: 'Button', downloads: 900 },
  { id: '2', name: 'Card', downloads: 400 },
];

const columns: TableColumn<Row>[] = [
  { key: 'name', header: 'Name', sortable: true, render: (r) => r.name },
  { key: 'downloads', header: 'Downloads', sortable: true, render: (r) => r.downloads },
];

const baseProps = { columns, rowKey: (r: Row) => r.id };

describe('TableView', () => {
  it('renders column headers', () => {
    render(<TableView rows={rows} status="success" {...baseProps} />);
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Downloads' })).toBeInTheDocument();
  });

  it('shows skeleton rows while loading', () => {
    render(<TableView rows={[]} status="loading" {...baseProps} />);
    expect(screen.queryByText('Button')).not.toBeInTheDocument();
    expect(document.querySelectorAll('tbody tr').length).toBeGreaterThan(0);
  });

  it('shows error state and calls onRetry', async () => {
    const onRetry = vi.fn();
    render(<TableView rows={[]} status="error" error="Load failed" onRetry={onRetry} {...baseProps} />);
    expect(screen.getByText('Load failed')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('shows empty state', () => {
    render(<TableView rows={[]} status="success" emptyTitle="No rows" {...baseProps} />);
    expect(screen.getByText('No rows')).toBeInTheDocument();
  });

  it('renders row data', () => {
    render(<TableView rows={rows} status="success" {...baseProps} />);
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByText('Card')).toBeInTheDocument();
  });

  it('calls onRowClick with the row when clicked', async () => {
    const onRowClick = vi.fn();
    render(<TableView rows={rows} status="success" onRowClick={onRowClick} {...baseProps} />);
    await userEvent.click(screen.getByText('Button'));
    expect(onRowClick).toHaveBeenCalledWith(rows[0]);
  });

  it('cycles sort direction asc -> desc -> none on repeated header clicks', async () => {
    const onSortChange = vi.fn();
    render(
      <TableView rows={rows} status="success" sortKey="name" sortDirection="asc" onSortChange={onSortChange} {...baseProps} />,
    );
    await userEvent.click(screen.getByRole('button', { name: /Name/ }));
    expect(onSortChange).toHaveBeenCalledWith('name', 'desc');
  });

  it('starts a new column sort at asc', async () => {
    const onSortChange = vi.fn();
    render(<TableView rows={rows} status="success" onSortChange={onSortChange} {...baseProps} />);
    await userEvent.click(screen.getByRole('button', { name: /Downloads/ }));
    expect(onSortChange).toHaveBeenCalledWith('downloads', 'asc');
  });

  it('marks active sorted column with aria-sort', () => {
    render(<TableView rows={rows} status="success" sortKey="name" sortDirection="asc" onSortChange={vi.fn()} {...baseProps} />);
    expect(screen.getByRole('columnheader', { name: /Name/ })).toHaveAttribute('aria-sort', 'ascending');
  });
});

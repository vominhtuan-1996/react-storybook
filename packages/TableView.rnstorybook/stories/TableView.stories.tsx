import type { Meta, StoryObj } from '@storybook/react';
import { TableView } from '../src/TableView';

interface Pkg {
  id: string;
  name: string;
  downloads: number;
}

const rows: Pkg[] = Array.from({ length: 6 }, (_, i) => ({
  id: `${i}`,
  name: `component-${i}`,
  downloads: (i + 1) * 37,
}));

const columns = [
  { key: 'name', header: 'Name', sortable: true, render: (r: Pkg) => r.name },
  { key: 'downloads', header: 'Downloads', sortable: true, render: (r: Pkg) => r.downloads },
];

const meta: Meta<typeof TableView<Pkg>> = {
  title: 'Components/TableView',
  component: TableView,
};

export default meta;
type Story = StoryObj<typeof TableView<Pkg>>;

const baseArgs = { columns, rowKey: (r: Pkg) => r.id };

export const Success: Story = {
  args: { ...baseArgs, rows, status: 'success' },
};

export const Loading: Story = {
  args: { ...baseArgs, rows: [], status: 'loading' },
};

export const ErrorState: Story = {
  args: {
    ...baseArgs,
    rows: [],
    status: 'error',
    error: 'Network request failed.',
    onRetry: () => {},
  },
};

export const Empty: Story = {
  args: { ...baseArgs, rows: [], status: 'success' },
};

export const SelectableRows: Story = {
  args: {
    ...baseArgs,
    rows,
    status: 'success',
    selectedRowKey: '2',
    onRowPress: () => {},
  },
};

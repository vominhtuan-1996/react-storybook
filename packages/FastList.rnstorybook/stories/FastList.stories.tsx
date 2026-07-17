import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { FastList } from '../src/FastList';

interface Row {
  id: string;
  name: string;
}

const items: Row[] = Array.from({ length: 10000 }, (_, i) => ({
  id: `${i}`,
  name: `component-${i}`,
}));

const meta: Meta<typeof FastList<Row>> = {
  title: 'Components/FastList',
  component: FastList,
};

export default meta;
type Story = StoryObj<typeof FastList<Row>>;

const baseArgs = {
  itemHeight: 48,
  keyExtractor: (item: Row) => item.id,
  renderItem: (item: Row) => <Text style={{ padding: 14 }}>{item.name}</Text>,
};

export const Success: Story = {
  args: { ...baseArgs, items, status: 'success' },
};

export const Loading: Story = {
  args: { ...baseArgs, items: [], status: 'loading' },
};

export const ErrorState: Story = {
  args: {
    ...baseArgs,
    items: [],
    status: 'error',
    error: 'Network request failed.',
    onRetry: () => {},
  },
};

export const Empty: Story = {
  args: { ...baseArgs, items: [], status: 'success' },
};

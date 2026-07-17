import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { ListView } from '../src/ListView';

interface Pkg {
  id: string;
  name: string;
}

const items: Pkg[] = Array.from({ length: 6 }, (_, i) => ({
  id: `${i}`,
  name: `component-${i}`,
}));

const meta: Meta<typeof ListView<Pkg>> = {
  title: 'Components/ListView',
  component: ListView,
};

export default meta;
type Story = StoryObj<typeof ListView<Pkg>>;

const baseArgs = {
  keyExtractor: (item: Pkg) => item.id,
  renderItem: (item: Pkg) => <Text style={{ padding: 16 }}>{item.name}</Text>,
};

export const Loading: Story = {
  args: { ...baseArgs, items: [], status: 'loading' },
};

export const Success: Story = {
  args: { ...baseArgs, items, status: 'success' },
};

export const Empty: Story = {
  args: { ...baseArgs, items: [], status: 'success' },
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

export const Refreshable: Story = {
  args: { ...baseArgs, items, status: 'success', onRefresh: () => {} },
};

export const WithLoadMore: Story = {
  args: { ...baseArgs, items, status: 'success', hasMore: true, onLoadMore: () => {} },
};

export const LoadingMore: Story = {
  args: {
    ...baseArgs,
    items,
    status: 'success',
    hasMore: true,
    isLoadingMore: true,
    onLoadMore: () => {},
  },
};

export const LoadMoreError: Story = {
  args: {
    ...baseArgs,
    items,
    status: 'success',
    hasMore: true,
    loadMoreError: 'Failed to load more items.',
    onLoadMore: () => {},
    onRetryLoadMore: () => {},
  },
};

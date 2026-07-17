import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import { GridView } from '../src/GridView';

interface Pkg {
  id: string;
  name: string;
}

const items: Pkg[] = Array.from({ length: 8 }, (_, i) => ({
  id: `${i}`,
  name: `component-${i}`,
}));

const meta: Meta<typeof GridView<Pkg>> = {
  title: 'Components/GridView',
  component: GridView,
};

export default meta;
type Story = StoryObj<typeof GridView<Pkg>>;

const baseArgs = {
  keyExtractor: (item: Pkg) => item.id,
  renderItem: (item: Pkg) => (
    <View style={{ aspectRatio: 1, backgroundColor: '#1E293B', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 12 }}>{item.name}</Text>
    </View>
  ),
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

export const FourColumns: Story = {
  args: { ...baseArgs, items, status: 'success', columns: 4 },
};

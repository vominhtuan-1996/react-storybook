import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../src/Stack';

const item = (label: string) => (
  <View key={label} style={{ padding: 12, backgroundColor: '#1E293B', borderRadius: 8 }}>
    <Text style={{ color: '#fff' }}>{label}</Text>
  </View>
);

const meta: Meta<typeof Stack> = {
  title: 'Components/Stack',
  component: Stack,
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Column: Story = {
  args: {
    direction: 'column',
    spacing: 'md',
    children: [item('Item A'), item('Item B'), item('Item C')],
  },
};

export const Row: Story = {
  args: {
    direction: 'row',
    spacing: 'md',
    children: [item('Item A'), item('Item B'), item('Item C')],
  },
};

export const WithDivider: Story = {
  args: {
    direction: 'row',
    spacing: 'md',
    divider: true,
    children: [item('Item A'), item('Item B'), item('Item C')],
  },
};

export const Wrap: Story = {
  args: {
    direction: 'row',
    spacing: 'sm',
    wrap: true,
    children: Array.from({ length: 8 }, (_, i) => item(`Tag ${i + 1}`)),
  },
};

export const JustifyBetween: Story = {
  args: {
    direction: 'row',
    justify: 'between',
    children: [item('Left'), item('Right')],
  },
};

export const ReverseRow: Story = {
  args: {
    direction: 'row',
    reverse: true,
    spacing: 'md',
    children: [item('First'), item('Second'), item('Third')],
  },
};

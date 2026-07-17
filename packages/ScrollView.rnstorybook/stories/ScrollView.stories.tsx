import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import { ScrollView } from '../src/ScrollView';

const items = Array.from({ length: 12 }, (_, i) => `component-${i}`);

const meta: Meta<typeof ScrollView> = {
  title: 'Components/ScrollView',
  component: ScrollView,
};

export default meta;
type Story = StoryObj<typeof ScrollView>;

export const WithScrollToTop: Story = {
  args: {
    height: 200,
    children: (
      <>
        {items.map((name) => (
          <View key={name} style={{ padding: 14, borderBottomWidth: 1, borderBottomColor: '#1E293B' }}>
            <Text style={{ color: '#fff' }}>{name}</Text>
          </View>
        ))}
      </>
    ),
  },
};

export const NoScrollToTop: Story = {
  args: {
    height: 200,
    showScrollToTop: false,
    children: (
      <>
        {items.map((name) => (
          <View key={name} style={{ padding: 14, borderBottomWidth: 1, borderBottomColor: '#1E293B' }}>
            <Text style={{ color: '#fff' }}>{name}</Text>
          </View>
        ))}
      </>
    ),
  },
};

export const ShortContentNoOverflow: Story = {
  args: {
    height: 200,
    children: (
      <View style={{ padding: 14 }}>
        <Text style={{ color: '#fff' }}>Not enough content to scroll.</Text>
      </View>
    ),
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { PageView } from '../src/PageView';

const colors = ['#4F46E5', '#10B981', '#F59E0B'];
const pages = colors.map((c, i) => (
  <View key={i} style={{ height: 160, backgroundColor: c, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: '#fff', fontWeight: '700' }}>Page {i + 1}</Text>
  </View>
));

const meta: Meta<typeof PageView> = {
  title: 'Components/PageView',
  component: PageView,
};

export default meta;
type Story = StoryObj<typeof PageView>;

export const Slide: Story = {
  args: { pages, transition: 'slide' },
};

export const Fade: Story = {
  args: { pages, transition: 'fade' },
};

export const Scale: Story = {
  args: { pages, transition: 'scale' },
};

export const NoArrows: Story = {
  args: { pages, showArrows: false },
};

export const NoDots: Story = {
  args: { pages, showDots: false },
};

export const Disabled: Story = {
  args: { pages, disabled: true },
};

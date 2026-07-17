import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Animation } from '../src/Animation';

const box = (label: string) => (
  <View style={{ height: 96, width: 180, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4F46E5', borderRadius: 12 }}>
    <Text style={{ color: '#fff', fontWeight: '700' }}>{label}</Text>
  </View>
);

const meta: Meta<typeof Animation> = {
  title: 'Components/Animation',
  component: Animation,
};

export default meta;
type Story = StoryObj<typeof Animation>;

export const Fade: Story = {
  args: { show: true, variant: 'fade', duration: 200, children: box('Fade') },
};

export const SlideUp: Story = {
  args: { show: true, variant: 'slide-up', duration: 220, easing: 'ease-out', children: box('Slide Up') },
};

export const Scale: Story = {
  args: { show: true, variant: 'scale', duration: 200, easing: 'back', children: box('Scale') },
};

export const Bounce: Story = {
  args: { show: true, variant: 'bounce', duration: 300, easing: 'back', children: box('Bounce') },
};

export const CustomCubicBezier: Story = {
  args: {
    show: true,
    variant: 'slide-left',
    duration: 260,
    easing: [0.68, -0.55, 0.27, 1.55],
    children: box('Custom'),
  },
};

export const PersistWhenHidden: Story = {
  args: { show: false, variant: 'fade', duration: 200, unmountOnExit: false, children: box('Persist') },
};

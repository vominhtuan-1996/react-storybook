import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '../src/Carousel';

const slide = (label: string, bg: string) => (
  <View style={{ height: 160, alignItems: 'center', justifyContent: 'center', backgroundColor: bg }}>
    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>{label}</Text>
  </View>
);

const defaultSlides = [slide('Slide 1', '#4F46E5'), slide('Slide 2', '#059669'), slide('Slide 3', '#D97706')];

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: { slides: defaultSlides },
};

export const Autoplay: Story = {
  args: { slides: defaultSlides, autoPlay: true, intervalMs: 2000 },
};

export const NoAutoplay: Story = {
  args: { slides: defaultSlides, autoPlay: false },
};

export const NoLoop: Story = {
  args: { slides: defaultSlides, loop: false },
};

export const NoDots: Story = {
  args: { slides: defaultSlides, showDots: false },
};

export const SingleSlide: Story = {
  args: { slides: [slide('Only slide', '#4F46E5')] },
};

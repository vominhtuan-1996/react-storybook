import type { Meta, StoryObj } from '@storybook/react';
import { Preview } from '../src/Preview';

const meta: Meta<typeof Preview> = {
  title: 'Components/Preview',
  component: Preview,
};

export default meta;
type Story = StoryObj<typeof Preview>;

export const Loaded: Story = {
  args: {
    source: { uri: 'https://picsum.photos/seed/rnpreview/600/450' },
    accessibilityLabel: 'Sample photo',
  },
};

export const Error: Story = {
  args: {
    source: { uri: 'https://invalid.invalid/broken.jpg' },
    accessibilityLabel: 'Broken image',
  },
};

export const Empty: Story = {
  args: {
    accessibilityLabel: 'No image provided',
  },
};

export const NonZoomable: Story = {
  args: {
    source: { uri: 'https://picsum.photos/seed/rnpreview2/600/450' },
    accessibilityLabel: 'Sample photo, not zoomable',
    zoomable: false,
  },
};

export const SquareAspectRatio: Story = {
  args: {
    source: { uri: 'https://picsum.photos/seed/rnpreview3/600/600' },
    accessibilityLabel: 'Square sample photo',
    aspectRatio: 1,
  },
};

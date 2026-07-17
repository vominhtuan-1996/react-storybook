import type { Meta, StoryObj } from '@storybook/react';
import { Expand } from '../src/Expand';

const meta: Meta<typeof Expand> = {
  title: 'Components/Expand',
  component: Expand,
};

export default meta;
type Story = StoryObj<typeof Expand>;

export const Collapsed: Story = {
  args: {
    title: 'What is React Native Storybook Hub?',
    children: 'A catalog of publishable RN components ported from a web reference implementation.',
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'Already expanded',
    defaultOpen: true,
    children: 'This panel starts open by default.',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Cannot toggle',
    disabled: true,
    children: 'Hidden content.',
  },
};

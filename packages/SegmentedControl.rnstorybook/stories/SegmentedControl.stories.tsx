import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from '../src/SegmentedControl';

const options = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
];

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  args: { options, value: 'all', onChange: () => {} },
};

export const WithDisabledSegment: Story = {
  args: {
    options: [options[0], { ...options[1], disabled: true }, options[2]],
    value: 'all',
    onChange: () => {},
  },
};

export const WholeControlDisabled: Story = {
  args: { options, value: 'active', onChange: () => {}, disabled: true },
};

export const FullWidth: Story = {
  args: { options, value: 'archived', onChange: () => {}, fullWidth: true },
};

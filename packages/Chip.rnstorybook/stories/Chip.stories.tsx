import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../src/Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Filled: Story = {
  args: { children: 'Static filled' },
};

export const Outlined: Story = {
  args: { children: 'Static outlined', variant: 'outlined' },
};

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
};

export const Selectable: Story = {
  args: { children: 'Toggleable', onPress: () => {} },
};

export const Selected: Story = {
  args: { children: 'Selected', selected: true, onPress: () => {} },
};

export const Removable: Story = {
  args: { children: 'React', onRemove: () => {} },
};

export const SelectedAndRemovable: Story = {
  args: {
    children: 'Selected + removable',
    variant: 'outlined',
    selected: true,
    onPress: () => {},
    onRemove: () => {},
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../src/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Static: Story = {
  args: {
    title: 'Static card',
    subtitle: 'Not interactive',
  },
};

export const Interactive: Story = {
  args: {
    title: 'Interactive card',
    subtitle: 'Press, focus',
    onPress: () => {},
  },
};

export const Selected: Story = {
  args: {
    title: 'Selected card',
    subtitle: 'Persistent accent',
    onPress: () => {},
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled card',
    subtitle: 'No interaction',
    onPress: () => {},
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined variant',
    variant: 'outlined',
  },
};

export const Flat: Story = {
  args: {
    title: 'Flat variant',
    variant: 'flat',
  },
};

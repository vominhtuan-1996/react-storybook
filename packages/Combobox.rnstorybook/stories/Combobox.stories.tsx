import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from '../src/Combobox';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'solid', label: 'Solid', disabled: true },
];

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Empty: Story = {
  args: { label: 'Framework', options, value: null, onChange: () => {}, helperText: 'Pick one.' },
};

export const Selected: Story = {
  args: { label: 'Framework', options, value: 'vue', onChange: () => {} },
};

export const Disabled: Story = {
  args: { label: 'Framework', options, value: null, onChange: () => {}, disabled: true },
};

export const Loading: Story = {
  args: { label: 'Framework', options, value: null, onChange: () => {}, isLoading: true },
};

export const ErrorState: Story = {
  args: {
    label: 'Framework',
    options,
    value: null,
    onChange: () => {},
    errorText: 'Selection required.',
  },
};

export const NoOptions: Story = {
  args: { label: 'Framework', options: [], value: null, onChange: () => {} },
};

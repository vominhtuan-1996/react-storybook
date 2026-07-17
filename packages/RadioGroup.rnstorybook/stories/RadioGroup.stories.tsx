import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../src/RadioGroup';

const options = [
  { value: 'free', label: 'Free', description: 'Basic features.' },
  { value: 'pro', label: 'Pro', description: 'Everything, plus support.' },
  { value: 'enterprise', label: 'Enterprise', disabled: true },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Unselected: Story = {
  args: { label: 'Plan', options, value: null, onChange: () => {} },
};

export const Selected: Story = {
  args: { label: 'Plan', options, value: 'pro', onChange: () => {} },
};

export const ErrorState: Story = {
  args: {
    label: 'Plan with error',
    options,
    value: null,
    onChange: () => {},
    errorText: 'Please select a plan.',
  },
};

export const DisabledGroup: Story = {
  args: { label: 'Disabled group', options, value: 'free', onChange: () => {}, disabled: true },
};

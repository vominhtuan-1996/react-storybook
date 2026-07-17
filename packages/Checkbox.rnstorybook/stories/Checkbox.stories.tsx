import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../src/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: { label: 'Unchecked', checked: false, onChange: () => {} },
};

export const Checked: Story = {
  args: { label: 'Checked', checked: true, onChange: () => {} },
};

export const WithDescription: Story = {
  args: {
    label: 'Toggle me',
    description: 'Tap to check/uncheck',
    checked: false,
    onChange: () => {},
  },
};

export const Indeterminate: Story = {
  args: { label: 'Indeterminate', checked: false, indeterminate: true, onChange: () => {} },
};

export const DisabledUnchecked: Story = {
  args: { label: 'Disabled unchecked', checked: false, disabled: true, onChange: () => {} },
};

export const DisabledChecked: Story = {
  args: { label: 'Disabled checked', checked: true, disabled: true, onChange: () => {} },
};

export const Required: Story = {
  args: { label: 'Required field', required: true, checked: false, onChange: () => {} },
};

export const ErrorState: Story = {
  args: {
    label: 'Accept terms',
    error: 'You must accept the terms to continue.',
    checked: false,
    onChange: () => {},
  },
};

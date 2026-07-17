import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../src/TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Package name',
    placeholder: 'component-button',
  },
};

export const Required: Story = {
  args: {
    label: 'Package name',
    placeholder: 'component-button',
    required: true,
    helperText: 'Lowercase, kebab-case.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Version',
    defaultValue: '1.2.x',
    errorText: 'Must follow semver (e.g. 1.2.0).',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Version',
    defaultValue: '1.2.0',
    successText: 'Valid semver.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Owner',
    defaultValue: 'platform-team',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Registry URL',
    defaultValue: 'npm.internal.dev',
    editable: false,
  },
};

export const Password: Story = {
  args: {
    label: 'Access token',
    defaultValue: 'secret123',
    secureTextEntry: true,
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Description',
    placeholder: 'One-line summary',
    maxLength: 80,
    showCount: true,
  },
};

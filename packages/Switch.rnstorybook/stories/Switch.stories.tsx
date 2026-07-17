import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../src/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Off: Story = {
  args: { label: 'Off', checked: false, onChange: () => {} },
};

export const On: Story = {
  args: { label: 'On', checked: true, onChange: () => {} },
};

export const WithDescription: Story = {
  args: {
    label: 'Toggle me',
    description: 'Tap to turn on/off',
    checked: false,
    onChange: () => {},
  },
};

export const DisabledOff: Story = {
  args: { label: 'Disabled off', checked: false, disabled: true, onChange: () => {} },
};

export const DisabledOn: Story = {
  args: { label: 'Disabled on', checked: true, disabled: true, onChange: () => {} },
};

export const Loading: Story = {
  args: { label: 'Loading', checked: true, isLoading: true, onChange: () => {} },
};

export const ErrorState: Story = {
  args: {
    label: 'Error',
    error: 'Could not save preference.',
    checked: false,
    onChange: () => {},
  },
};

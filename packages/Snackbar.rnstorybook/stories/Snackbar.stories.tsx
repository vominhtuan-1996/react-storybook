import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from '../src/Snackbar';

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  args: {
    id: 'demo-1',
    message: 'Component archived.',
    variant: 'default',
    onDismiss: () => {},
  },
};

export const Success: Story = {
  args: {
    id: 'demo-2',
    message: 'Package uploaded successfully.',
    variant: 'success',
    onDismiss: () => {},
  },
};

export const ErrorWithAction: Story = {
  args: {
    id: 'demo-3',
    message: 'Upload failed. Check your connection.',
    variant: 'error',
    actionLabel: 'Retry',
    onAction: () => {},
    onDismiss: () => {},
  },
};

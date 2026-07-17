import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '../src/Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Confirmation: Story = {
  args: {
    visible: true,
    variant: 'confirmation',
    title: 'Delete component-button-1.2.0.tgz?',
    description:
      'This removes the package from Storage and Database. Mobile developers who already downloaded it keep their copy.',
    onClose: () => {},
  },
};

export const Success: Story = {
  args: {
    visible: true,
    variant: 'success',
    title: 'Package published',
    description: 'component-button-1.2.0.tgz is now live on the Hub.',
    onClose: () => {},
  },
};

export const ErrorVariant: Story = {
  args: {
    visible: true,
    variant: 'error',
    title: 'Upload failed',
    description: 'Could not reach Supabase Storage. Check your connection and retry.',
    onClose: () => {},
  },
};

export const Warning: Story = {
  args: {
    visible: true,
    variant: 'warning',
    title: 'Breaking change detected',
    description: 'This version changes the public API. Downstream apps may need updates.',
    onClose: () => {},
  },
};

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '@/components/ui/Switch';

describe('Switch', () => {
  it('renders as a switch role linked to its label', () => {
    render(<Switch label="Notifications" />);
    const toggle = screen.getByRole('switch', { name: 'Notifications' });
    expect(toggle).toBeInTheDocument();
    expect(toggle).not.toBeChecked();
  });

  it('toggles on click and fires onChange', async () => {
    const onChange = vi.fn();
    render(<Switch label="Dark mode" onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('shows description text', () => {
    render(<Switch label="Emails" description="Weekly digest" />);
    expect(screen.getByText('Weekly digest')).toBeInTheDocument();
  });

  it('shows error as alert and marks aria-invalid', () => {
    render(<Switch label="Sync" error="Sync failed" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Sync failed');
  });

  it('disables and blocks interaction while loading', async () => {
    const onChange = vi.fn();
    render(<Switch label="Saving" isLoading onChange={onChange} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeDisabled();
    await userEvent.click(toggle);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('respects explicit disabled prop', () => {
    render(<Switch label="Locked" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });
});

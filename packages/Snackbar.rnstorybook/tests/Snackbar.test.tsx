import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Snackbar } from '@/components/ui/Snackbar';

describe('Snackbar', () => {
  it('renders the message with status role', () => {
    render(<Snackbar id="1" message="Saved successfully" onDismiss={vi.fn()} />);
    expect(screen.getByRole('status')).toHaveTextContent('Saved successfully');
  });

  it('calls onDismiss with the item id when dismiss button clicked', async () => {
    const onDismiss = vi.fn();
    render(<Snackbar id="abc" message="Deleted" onDismiss={onDismiss} />);
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(onDismiss).toHaveBeenCalledWith('abc');
  });

  it('renders action button and fires onAction then dismisses', async () => {
    const onAction = vi.fn();
    const onDismiss = vi.fn();
    render(
      <Snackbar id="1" message="Item archived" actionLabel="Undo" onAction={onAction} onDismiss={onDismiss} />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledWith('1');
  });

  it('does not render action button when actionLabel is missing', () => {
    render(<Snackbar id="1" message="Info" onDismiss={vi.fn()} />);
    expect(screen.queryByRole('button', { name: 'Undo' })).not.toBeInTheDocument();
  });
});

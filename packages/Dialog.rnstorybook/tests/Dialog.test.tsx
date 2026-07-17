import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from '@/components/ui/Dialog';

describe('Dialog', () => {
  it('renders nothing when closed', () => {
    render(<Dialog open={false} onClose={vi.fn()} title="Confirm" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders title and description when open', () => {
    render(<Dialog open onClose={vi.fn()} title="Delete package" description="This cannot be undone." />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Delete package')).toBeInTheDocument();
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="Confirm" />);
    await userEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop clicked', async () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="Confirm" />);
    const backdrop = document.querySelector('[aria-hidden="true"].absolute.inset-0');
    expect(backdrop).toBeTruthy();
    await userEvent.click(backdrop as Element);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key', async () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="Confirm" />);
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders footer content', () => {
    render(
      <Dialog open onClose={vi.fn()} title="Confirm" footer={<button>Confirm action</button>}>
        body
      </Dialog>,
    );
    expect(screen.getByRole('button', { name: 'Confirm action' })).toBeInTheDocument();
  });

  it('applies variant label for screen readers', () => {
    render(<Dialog open onClose={vi.fn()} title="Deleted" variant="success" />);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});

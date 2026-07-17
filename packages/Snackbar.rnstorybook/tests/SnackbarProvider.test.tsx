import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider, useSnackbar } from '@/components/ui/SnackbarProvider';

function Trigger({ durationMs, actionLabel, onAction }: { durationMs?: number; actionLabel?: string; onAction?: () => void } = {}) {
  const { showSnackbar } = useSnackbar();
  return (
    <button
      onClick={() =>
        showSnackbar('Package published', { durationMs, actionLabel, onAction, variant: 'success' })
      }
    >
      Publish
    </button>
  );
}

describe('SnackbarProvider / useSnackbar', () => {
  it('throws when useSnackbar is used outside a provider', () => {
    const BadConsumer = () => {
      useSnackbar();
      return null;
    };
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<BadConsumer />)).toThrow('useSnackbar must be used within a SnackbarProvider');
    spy.mockRestore();
  });

  it('shows a snackbar when showSnackbar is called', async () => {
    render(
      <SnackbarProvider>
        <Trigger />
      </SnackbarProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Publish' }));
    expect(screen.getByRole('status')).toHaveTextContent('Package published');
  });

  it('auto-dismisses after durationMs', async () => {
    render(
      <SnackbarProvider>
        <Trigger durationMs={50} />
      </SnackbarProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Publish' }));
    expect(screen.getByRole('status')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument(), { timeout: 1000 });
  });

  it('caps visible snackbars at 3, dropping the oldest', async () => {
    render(
      <SnackbarProvider>
        <Trigger durationMs={10000} />
      </SnackbarProvider>,
    );
    const button = screen.getByRole('button', { name: 'Publish' });
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    expect(screen.getAllByRole('status')).toHaveLength(3);
  });

  it('dismisses on manual close button click', async () => {
    render(
      <SnackbarProvider>
        <Trigger durationMs={10000} />
      </SnackbarProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Publish' }));
    expect(screen.getByRole('status')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

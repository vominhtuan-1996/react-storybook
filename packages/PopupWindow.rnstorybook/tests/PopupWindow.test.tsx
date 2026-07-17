import { useRef, useState } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PopupWindow } from '@/components/ui/PopupWindow';

function Harness({ disabled = false }: { disabled?: boolean } = {}) {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button ref={anchorRef} onClick={() => setOpen(true)}>
        Menu
      </button>
      <PopupWindow open={open} onClose={() => setOpen(false)} anchorRef={anchorRef} disabled={disabled}>
        <button>Edit</button>
        <button>Delete</button>
      </PopupWindow>
    </div>
  );
}

describe('PopupWindow', () => {
  it('renders nothing when closed', () => {
    render(<Harness />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens and shows content when anchor clicked', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('closes on outside click', async () => {
    render(
      <div>
        <Harness />
        <button>Outside</button>
      </div>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    render(<Harness disabled />);
    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not close when clicking inside the panel', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

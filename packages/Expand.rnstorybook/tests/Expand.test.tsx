import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Expand } from '@/components/ui/Expand';

describe('Expand', () => {
  it('renders collapsed by default with aria-expanded false', () => {
    render(<Expand title="Details">Content</Expand>);
    expect(screen.getByRole('button', { name: 'Details' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('starts open when defaultOpen is true', () => {
    render(
      <Expand title="Details" defaultOpen>
        Content
      </Expand>,
    );
    expect(screen.getByRole('button', { name: 'Details' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles open state on click (uncontrolled)', async () => {
    render(<Expand title="Details">Content</Expand>);
    const trigger = screen.getByRole('button', { name: 'Details' });
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('calls onToggle with the next open value', async () => {
    const onToggle = vi.fn();
    render(
      <Expand title="Details" onToggle={onToggle}>
        Content
      </Expand>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Details' }));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', async () => {
    const onToggle = vi.fn();
    render(
      <Expand title="Details" disabled onToggle={onToggle}>
        Content
      </Expand>,
    );
    const trigger = screen.getByRole('button', { name: 'Details' });
    expect(trigger).toBeDisabled();
    await userEvent.click(trigger);
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('behaves as a controlled component when open prop is provided', async () => {
    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <Expand title="Details" open={open} onToggle={setOpen}>
          Content
        </Expand>
      );
    }
    render(<Controlled />);
    const trigger = screen.getByRole('button', { name: 'Details' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('links trigger to panel via aria-controls', () => {
    render(<Expand title="Details">Content</Expand>);
    const trigger = screen.getByRole('button', { name: 'Details' });
    const panelId = trigger.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId as string)).toHaveTextContent('Content');
  });
});

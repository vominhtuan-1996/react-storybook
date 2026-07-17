import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chip } from '@/components/ui/Chip';

describe('Chip', () => {
  it('renders as plain span when non-interactive', () => {
    render(<Chip>Filter</Chip>);
    expect(screen.getByText('Filter')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders as button and fires onClick when interactive', async () => {
    const onClick = vi.fn();
    render(<Chip onClick={onClick}>Filter</Chip>);
    await userEvent.click(screen.getByRole('button', { name: 'Filter' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('marks selected chip with aria-pressed', () => {
    render(
      <Chip onClick={() => {}} selected>
        Active
      </Chip>,
    );
    expect(screen.getByRole('button', { name: 'Active' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders remove button and fires onRemove without triggering onClick', async () => {
    const onClick = vi.fn();
    const onRemove = vi.fn();
    render(
      <Chip onClick={onClick} onRemove={onRemove}>
        Tag
      </Chip>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('disables both main and remove buttons when disabled', () => {
    render(
      <Chip onClick={() => {}} onRemove={() => {}} disabled>
        Tag
      </Chip>,
    );
    expect(screen.getByRole('button', { name: 'Tag' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Remove' })).toBeDisabled();
  });
});

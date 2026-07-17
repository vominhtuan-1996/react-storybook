import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioButton } from '@/components/ui/RadioButton';

describe('RadioButton', () => {
  it('renders label linked to the radio input', () => {
    render(<RadioButton label="Option A" />);
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
  });

  it('calls onChange when clicked', async () => {
    const onChange = vi.fn();
    render(<RadioButton label="Option A" onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('shows description text', () => {
    render(<RadioButton label="Option A" description="Extra detail" />);
    expect(screen.getByText('Extra detail')).toBeInTheDocument();
  });

  it('shows error as alert and marks aria-invalid', () => {
    render(<RadioButton label="Option A" error="Invalid choice" />);
    expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid choice');
  });

  it('disables input and blocks change', async () => {
    const onChange = vi.fn();
    render(<RadioButton label="Option A" disabled onChange={onChange} />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();
    await userEvent.click(radio);
    expect(onChange).not.toHaveBeenCalled();
  });
});

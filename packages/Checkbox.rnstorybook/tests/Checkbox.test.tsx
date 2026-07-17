import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '@/components/ui/Checkbox';

describe('Checkbox', () => {
  it('renders label linked to the input', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('toggles checked state on click and fires onChange', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Notify" onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('applies indeterminate DOM property', () => {
    render(<Checkbox label="Select all" indeterminate />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('shows error message with alert role and aria-invalid', () => {
    render(<Checkbox label="Accept" error="Required field" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Required field');
  });

  it('shows description text when no error', () => {
    render(<Checkbox label="Marketing" description="Optional emails" />);
    expect(screen.getByText('Optional emails')).toBeInTheDocument();
  });

  it('disables the input and blocks toggling', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Locked" disabled onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    await userEvent.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders required asterisk when required', () => {
    render(<Checkbox label="Terms" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});

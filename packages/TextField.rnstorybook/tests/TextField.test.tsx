import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from '@/components/ui/TextField';

describe('TextField', () => {
  it('renders label linked to input', () => {
    render(<TextField label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('calls onChange as the user types', async () => {
    const onChange = vi.fn();
    render(<TextField label="Name" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText('Name'), 'a');
    expect(onChange).toHaveBeenCalled();
  });

  it('shows required asterisk', () => {
    render(<TextField label="Name" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows character count when showCount and maxLength are set', () => {
    render(<TextField label="Bio" showCount maxLength={20} value="hello" onChange={() => {}} />);
    expect(screen.getByText('5/20')).toBeInTheDocument();
  });

  it('shows error text with alert role and aria-invalid', () => {
    render(<TextField label="Email" errorText="Invalid email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
  });

  it('shows success text', () => {
    render(<TextField label="Username" successText="Available" />);
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('toggles password visibility', async () => {
    render(<TextField label="Password" type="password" />);
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
    await userEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(input).toHaveAttribute('type', 'text');
    await userEvent.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(input).toHaveAttribute('type', 'password');
  });

  it('does not show the password toggle when disabled', () => {
    render(<TextField label="Password" type="password" disabled />);
    expect(screen.queryByRole('button', { name: 'Show password' })).not.toBeInTheDocument();
  });

  it('disables the input when disabled', () => {
    render(<TextField label="Email" disabled />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('marks the input read-only', () => {
    render(<TextField label="Email" readOnly value="fixed@example.com" onChange={() => {}} />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('readonly');
  });
});

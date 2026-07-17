import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox } from '@/components/ui/Combobox';
import type { ComboboxOption } from '@/components/ui/Combobox';

const options: ComboboxOption[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived', disabled: true },
];

function ControlledCombobox(props: Partial<React.ComponentProps<typeof Combobox>> = {}) {
  const [value, setValue] = useState<string | null>(props.value ?? null);
  return (
    <Combobox
      label="Status"
      options={options}
      {...props}
      value={value}
      onChange={(v) => {
        setValue(v);
        props.onChange?.(v);
      }}
    />
  );
}

describe('Combobox', () => {
  it('opens the listbox on focus', async () => {
    render(<ControlledCombobox />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument();
  });

  it('filters options by typed query', async () => {
    render(<ControlledCombobox />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'Act');
    expect(screen.getByRole('option', { name: 'Active' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'All' })).not.toBeInTheDocument();
  });

  it('selects an option on click and closes the list', async () => {
    const onChange = vi.fn();
    render(<ControlledCombobox onChange={onChange} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', { name: 'Active' }));
    expect(onChange).toHaveBeenCalledWith('active');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('Active');
  });

  it('does not select a disabled option', async () => {
    const onChange = vi.fn();
    render(<ControlledCombobox onChange={onChange} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', { name: 'Archived' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('selects highlighted option with keyboard Enter', async () => {
    const onChange = vi.fn();
    render(<ControlledCombobox onChange={onChange} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalledWith('active');
  });

  it('closes the list on Escape', async () => {
    render(<ControlledCombobox />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows clear button when a value is selected and clears it', async () => {
    const onChange = vi.fn();
    render(<ControlledCombobox value="active" onChange={onChange} />);
    const clearButton = screen.getByRole('button', { name: 'Clear selection' });
    await userEvent.click(clearButton);
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('shows empty message when no options match', async () => {
    render(<ControlledCombobox />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'zzz-no-match');
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('shows error text with alert role', () => {
    render(<ControlledCombobox errorText="Selection required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Selection required');
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables the input when disabled', () => {
    render(<ControlledCombobox disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});

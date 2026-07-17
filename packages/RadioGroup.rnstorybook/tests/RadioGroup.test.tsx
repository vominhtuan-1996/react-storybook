import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup } from '@/components/ui/RadioGroup';
import type { RadioOption } from '@/components/ui/RadioGroup';

const options: RadioOption[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived', disabled: true },
];

describe('RadioGroup', () => {
  it('renders a radiogroup with a labeled radio per option', () => {
    render(<RadioGroup label="Filter" options={options} value="all" onChange={vi.fn()} />);
    expect(screen.getByRole('radiogroup', { name: 'Filter' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('marks the matching option as checked', () => {
    render(<RadioGroup options={options} value="active" onChange={vi.fn()} />);
    expect(screen.getByRole('radio', { name: 'Active' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'All' })).not.toBeChecked();
  });

  it('calls onChange with the clicked option value', async () => {
    const onChange = vi.fn();
    render(<RadioGroup options={options} value="all" onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Active' }));
    expect(onChange).toHaveBeenCalledWith('active');
  });

  it('disables an individually disabled option', () => {
    render(<RadioGroup options={options} value="all" onChange={vi.fn()} />);
    expect(screen.getByRole('radio', { name: 'Archived' })).toBeDisabled();
  });

  it('disables all options when group disabled', () => {
    render(<RadioGroup options={options} value="all" onChange={vi.fn()} disabled />);
    screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeDisabled());
  });

  it('shows error text with alert role', () => {
    render(<RadioGroup options={options} value={null} onChange={vi.fn()} errorText="Pick one" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Pick one');
  });
});

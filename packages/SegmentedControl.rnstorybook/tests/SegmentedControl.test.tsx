import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import type { SegmentOption } from '@/components/ui/SegmentedControl';

const options: SegmentOption[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived', disabled: true },
];

describe('SegmentedControl', () => {
  it('renders a radiogroup with a radio per option', () => {
    render(<SegmentedControl options={options} value="all" onChange={vi.fn()} />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('marks the active option as checked', () => {
    render(<SegmentedControl options={options} value="active" onChange={vi.fn()} />);
    expect(screen.getByRole('radio', { name: 'Active' })).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange when an option is clicked', async () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={options} value="all" onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Active' }));
    expect(onChange).toHaveBeenCalledWith('active');
  });

  it('does not select a disabled option', async () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={options} value="all" onChange={onChange} />);
    expect(screen.getByRole('radio', { name: 'Archived' })).toBeDisabled();
    await userEvent.click(screen.getByRole('radio', { name: 'Archived' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('navigates with ArrowRight, skipping disabled options', async () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={options} value="active" onChange={onChange} />);
    screen.getByRole('radio', { name: 'Active' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('all');
  });

  it('navigates to the last non-disabled option with End', async () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={options} value="all" onChange={onChange} />);
    screen.getByRole('radio', { name: 'All' }).focus();
    await userEvent.keyboard('{End}');
    expect(onChange).toHaveBeenCalledWith('active');
  });

  it('navigates to the first option with Home', async () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={options} value="active" onChange={onChange} />);
    screen.getByRole('radio', { name: 'Active' }).focus();
    await userEvent.keyboard('{Home}');
    expect(onChange).toHaveBeenCalledWith('all');
  });

  it('disables all options when disabled prop set', () => {
    render(<SegmentedControl options={options} value="all" onChange={vi.fn()} disabled />);
    screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeDisabled());
  });
});

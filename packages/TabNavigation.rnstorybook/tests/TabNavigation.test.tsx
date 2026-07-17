import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabNavigation } from '@/components/ui/TabNavigation';
import type { TabItem } from '@/components/ui/TabNavigation';

const tabs: TabItem[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active', badge: 3 },
  { value: 'archived', label: 'Archived', disabled: true },
];

describe('TabNavigation', () => {
  it('renders a tablist with a tab per item', () => {
    render(<TabNavigation tabs={tabs} value="all" onChange={vi.fn()} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('marks the active tab as selected', () => {
    render(<TabNavigation tabs={tabs} value="active" onChange={vi.fn()} />);
    expect(screen.getByRole('tab', { name: /Active/ })).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onChange when a tab is clicked', async () => {
    const onChange = vi.fn();
    render(<TabNavigation tabs={tabs} value="all" onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: /Active/ }));
    expect(onChange).toHaveBeenCalledWith('active');
  });

  it('does not select a disabled tab', async () => {
    const onChange = vi.fn();
    render(<TabNavigation tabs={tabs} value="all" onChange={onChange} />);
    expect(screen.getByRole('tab', { name: 'Archived' })).toBeDisabled();
    await userEvent.click(screen.getByRole('tab', { name: 'Archived' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders a badge on the tab that has one', () => {
    render(<TabNavigation tabs={tabs} value="all" onChange={vi.fn()} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('navigates with ArrowRight, skipping the disabled tab and wrapping', async () => {
    const onChange = vi.fn();
    render(<TabNavigation tabs={tabs} value="active" onChange={onChange} />);
    screen.getByRole('tab', { name: /Active/ }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('all');
  });

  it('navigates to the last non-disabled tab with End', async () => {
    const onChange = vi.fn();
    render(<TabNavigation tabs={tabs} value="all" onChange={onChange} />);
    screen.getByRole('tab', { name: 'All' }).focus();
    await userEvent.keyboard('{End}');
    expect(onChange).toHaveBeenCalledWith('active');
  });

  it('navigates to the first tab with Home', async () => {
    const onChange = vi.fn();
    render(<TabNavigation tabs={tabs} value="active" onChange={onChange} />);
    screen.getByRole('tab', { name: /Active/ }).focus();
    await userEvent.keyboard('{Home}');
    expect(onChange).toHaveBeenCalledWith('all');
  });
});

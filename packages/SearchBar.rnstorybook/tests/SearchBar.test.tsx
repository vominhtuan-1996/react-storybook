import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/components/ui/SearchBar';
import type { SearchSuggestion } from '@/components/ui/SearchBar';

const suggestions: SearchSuggestion[] = [
  { id: '1', label: 'Button' },
  { id: '2', label: 'Card' },
];

function ControlledSearchBar(props: Partial<React.ComponentProps<typeof SearchBar>> = {}) {
  const [value, setValue] = useState(props.value ?? '');
  return (
    <SearchBar
      {...props}
      value={value}
      onChange={(v) => {
        setValue(v);
        props.onChange?.(v);
      }}
    />
  );
}

describe('SearchBar', () => {
  it('renders search input with placeholder', () => {
    render(<ControlledSearchBar placeholder="Search packages…" />);
    expect(screen.getByPlaceholderText('Search packages…')).toBeInTheDocument();
  });

  it('calls onChange as user types', async () => {
    const onChange = vi.fn();
    render(<ControlledSearchBar onChange={onChange} />);
    await userEvent.type(screen.getByRole('searchbox'), 'but');
    expect(onChange).toHaveBeenLastCalledWith('but');
  });

  it('debounces onSearch after typing stops', async () => {
    const onSearch = vi.fn();
    render(<ControlledSearchBar onSearch={onSearch} debounceMs={50} />);
    await userEvent.type(screen.getByRole('searchbox'), 'a');
    expect(onSearch).not.toHaveBeenCalled();
    await waitFor(() => expect(onSearch).toHaveBeenCalledWith('a'), { timeout: 1000 });
  });

  it('shows clear button once there is a value and clears on click', async () => {
    render(<ControlledSearchBar value="button" />);
    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    await userEvent.click(clearButton);
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('shows suggestions listbox when focused with a query and suggestions provided', async () => {
    render(<ControlledSearchBar value="but" suggestions={suggestions} />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox', { name: 'Search suggestions' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Button' })).toBeInTheDocument();
  });

  it('selects a suggestion on click', async () => {
    const onSelectSuggestion = vi.fn();
    render(<ControlledSearchBar value="but" suggestions={suggestions} onSelectSuggestion={onSelectSuggestion} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', { name: 'Card' }));
    expect(onSelectSuggestion).toHaveBeenCalledWith(suggestions[1]);
  });

  it('selects highlighted suggestion via keyboard Enter', async () => {
    const onSelectSuggestion = vi.fn();
    render(<ControlledSearchBar value="but" suggestions={suggestions} onSelectSuggestion={onSelectSuggestion} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(onSelectSuggestion).toHaveBeenCalledWith(suggestions[1]);
  });

  it('shows empty message when suggestions array is empty', async () => {
    render(<ControlledSearchBar value="zzz" suggestions={[]} />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('shows error text with alert role', () => {
    render(<ControlledSearchBar errorText="Query too short" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Query too short');
    expect(screen.getByRole('searchbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables input when disabled', () => {
    render(<ControlledSearchBar disabled />);
    expect(screen.getByRole('searchbox')).toBeDisabled();
  });
});

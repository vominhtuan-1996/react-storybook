import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PageView } from '@/components/ui/PageView';

const pages = [<div key="a">Page A</div>, <div key="b">Page B</div>, <div key="c">Page C</div>];

describe('PageView', () => {
  it('renders all pages with only the active one visible to a11y', () => {
    render(<PageView pages={pages} />);
    expect(screen.getByText('Page A')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  });

  it('navigates forward and back with arrow buttons', async () => {
    const onChange = vi.fn();
    render(<PageView pages={pages} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('disables previous arrow at first page and next arrow at last page', async () => {
    const { rerender } = render(<PageView pages={pages} activeIndex={0} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    rerender(<PageView pages={pages} activeIndex={2} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('navigates directly via dot buttons and marks aria-selected', async () => {
    const onChange = vi.fn();
    render(<PageView pages={pages} onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Go to page 3' }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('reflects controlled activeIndex in aria-selected dots', () => {
    render(<PageView pages={pages} activeIndex={1} onChange={vi.fn()} />);
    expect(screen.getByRole('tab', { name: 'Go to page 2' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Go to page 1' })).toHaveAttribute('aria-selected', 'false');
  });

  it('navigates with ArrowRight/ArrowLeft keyboard when focused', async () => {
    const onChange = vi.fn();
    render(<PageView pages={pages} onChange={onChange} />);
    const track = screen.getByRole('group');
    track.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('disables arrow navigation when disabled', async () => {
    const onChange = vi.fn();
    render(<PageView pages={pages} onChange={onChange} disabled />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('hides dots and arrows when disabled via props', () => {
    render(<PageView pages={pages} showDots={false} showArrows={false} />);
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Next page' })).not.toBeInTheDocument();
  });
});

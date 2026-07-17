import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScrollView } from '@/components/ui/ScrollView';

function mockScrollMetrics(el: HTMLElement, { scrollTop, scrollHeight, clientHeight }: Record<string, number>) {
  Object.defineProperty(el, 'scrollTop', { value: scrollTop, configurable: true });
  Object.defineProperty(el, 'scrollHeight', { value: scrollHeight, configurable: true });
  Object.defineProperty(el, 'clientHeight', { value: clientHeight, configurable: true });
}

describe('ScrollView', () => {
  it('renders children inside a scrollable container', () => {
    render(
      <ScrollView>
        <p>Scroll content</p>
      </ScrollView>,
    );
    expect(screen.getByText('Scroll content')).toBeInTheDocument();
  });

  it('shows scroll-to-top button once past threshold and calls scrollTo on click', async () => {
    const { container } = render(
      <ScrollView scrollToTopThreshold={100}>
        <p>Content</p>
      </ScrollView>,
    );
    const scrollEl = container.querySelector('.overflow-y-auto') as HTMLElement;
    const scrollToSpy = vi.fn();
    scrollEl.scrollTo = scrollToSpy as unknown as typeof scrollEl.scrollTo;

    mockScrollMetrics(scrollEl, { scrollTop: 0, scrollHeight: 1000, clientHeight: 320 });
    fireEvent.scroll(scrollEl);
    expect(screen.queryByRole('button', { name: 'Scroll to top' })).not.toBeInTheDocument();

    mockScrollMetrics(scrollEl, { scrollTop: 300, scrollHeight: 1000, clientHeight: 320 });
    fireEvent.scroll(scrollEl);
    const button = screen.getByRole('button', { name: 'Scroll to top' });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(scrollToSpy).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
  });

  it('does not show scroll-to-top button when showScrollToTop is false', () => {
    const { container } = render(
      <ScrollView showScrollToTop={false}>
        <p>Content</p>
      </ScrollView>,
    );
    const scrollEl = container.querySelector('.overflow-y-auto') as HTMLElement;
    mockScrollMetrics(scrollEl, { scrollTop: 500, scrollHeight: 1000, clientHeight: 320 });
    fireEvent.scroll(scrollEl);
    expect(screen.queryByRole('button', { name: 'Scroll to top' })).not.toBeInTheDocument();
  });
});

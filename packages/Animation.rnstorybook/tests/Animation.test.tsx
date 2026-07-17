import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Animation } from '@/components/ui/Animation';

describe('Animation', () => {
  it('renders children when show is true', () => {
    render(
      <Animation show>
        <div>Content</div>
      </Animation>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('unmounts children after exiting when unmountOnExit is true (default)', async () => {
    const { rerender } = render(
      <Animation show>
        <div>Content</div>
      </Animation>,
    );
    rerender(
      <Animation show={false}>
        <div>Content</div>
      </Animation>,
    );
    await waitFor(() => expect(screen.queryByText('Content')).not.toBeInTheDocument());
  });

  it('keeps the element mounted when unmountOnExit is false, hidden via aria', async () => {
    const { rerender } = render(
      <Animation show unmountOnExit={false}>
        <div>Content</div>
      </Animation>,
    );
    rerender(
      <Animation show={false} unmountOnExit={false}>
        <div>Content</div>
      </Animation>,
    );
    await waitFor(() => {
      const wrapper = screen.getByText('Content').closest('[data-animation-phase]');
      expect(wrapper).toHaveAttribute('data-animation-phase', 'exited');
    });
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onEntered when show transitions to true', async () => {
    const onEntered = vi.fn();
    const { rerender } = render(
      <Animation show={false} unmountOnExit={false} onEntered={onEntered} duration={10}>
        <div>Content</div>
      </Animation>,
    );
    rerender(
      <Animation show unmountOnExit={false} onEntered={onEntered} duration={10}>
        <div>Content</div>
      </Animation>,
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));
  });

  it('calls onExited when show transitions to false', async () => {
    const onExited = vi.fn();
    const { rerender } = render(
      <Animation show onExited={onExited} exitDuration={10}>
        <div>Content</div>
      </Animation>,
    );
    rerender(
      <Animation show={false} onExited={onExited} exitDuration={10}>
        <div>Content</div>
      </Animation>,
    );
    await waitFor(() => expect(onExited).toHaveBeenCalledTimes(1));
  });

  it('applies the resolved cubic-bezier easing preset in the transition style', () => {
    render(
      <Animation show easing="back" duration={200}>
        <div>Content</div>
      </Animation>,
    );
    const wrapper = screen.getByText('Content').closest('[data-animation-phase]') as HTMLElement;
    expect(wrapper.style.transition).toContain('cubic-bezier(0.34, 1.56, 0.64, 1)');
  });

  it('applies a custom cubic-bezier tuple in the transition style', () => {
    render(
      <Animation show easing={[0.68, -0.55, 0.27, 1.55]} duration={200}>
        <div>Content</div>
      </Animation>,
    );
    const wrapper = screen.getByText('Content').closest('[data-animation-phase]') as HTMLElement;
    expect(wrapper.style.transition).toContain('cubic-bezier(0.68, -0.55, 0.27, 1.55)');
  });

  it('skips the transition and snaps state when prefers-reduced-motion is set', () => {
    const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    window.matchMedia = matchMediaMock as unknown as typeof window.matchMedia;

    render(
      <Animation show>
        <div>Content</div>
      </Animation>,
    );
    const wrapper = screen.getByText('Content').closest('[data-animation-phase]') as HTMLElement;
    expect(wrapper.style.transition).toBe('');
    expect(wrapper.style.opacity).toBe('1');
  });
});

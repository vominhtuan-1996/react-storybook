import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Carousel } from '@/components/ui/Carousel';

const slides = [<div key="a">Slide A</div>, <div key="b">Slide B</div>, <div key="c">Slide C</div>];

describe('Carousel', () => {
  it('renders all slides and announces the current one', () => {
    render(<Carousel slides={slides} autoPlay={false} />);
    expect(screen.getByText('Slide A')).toBeInTheDocument();
    expect(screen.getByText('Slide 1 of 3')).toBeInTheDocument();
  });

  it('navigates with next/previous arrow buttons', async () => {
    render(<Carousel slides={slides} autoPlay={false} />);
    await userEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByText('Slide 2 of 3')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    expect(screen.getByText('Slide 1 of 3')).toBeInTheDocument();
  });

  it('disables previous arrow at first slide and next at last when loop is off', async () => {
    render(<Carousel slides={slides} autoPlay={false} loop={false} />);
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
    await userEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    await userEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled();
  });

  it('navigates directly via dot buttons', async () => {
    render(<Carousel slides={slides} autoPlay={false} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Go to slide 3' }));
    expect(screen.getByText('Slide 3 of 3')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Go to slide 3' })).toHaveAttribute('aria-selected', 'true');
  });

  it('shows a play/pause toggle when autoPlay is on and toggles aria-pressed', async () => {
    render(<Carousel slides={slides} autoPlay />);
    const pauseButton = screen.getByRole('button', { name: 'Pause carousel' });
    await userEvent.click(pauseButton);
    expect(screen.getByRole('button', { name: 'Play carousel' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('hides dots and arrows when disabled via props', () => {
    render(<Carousel slides={slides} autoPlay={false} showDots={false} showArrows={false} />);
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Next slide' })).not.toBeInTheDocument();
  });

  it('renders nothing for an empty slide list', () => {
    const onRender = vi.fn();
    const { container } = render(<Carousel slides={[]} />);
    onRender();
    expect(container.firstChild).toBeNull();
  });
});

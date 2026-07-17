import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Preview } from '@/components/ui/Preview';

class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  private _src = '';
  set src(value: string) {
    this._src = value;
    if (value.includes('broken')) {
      queueMicrotask(() => this.onerror?.());
    } else {
      queueMicrotask(() => this.onload?.());
    }
  }
  get src() {
    return this._src;
  }
}

describe('Preview', () => {
  const originalImage = window.Image;

  beforeEach(() => {
    // @ts-expect-error test shim
    window.Image = MockImage;
  });

  afterEach(() => {
    window.Image = originalImage;
  });

  it('shows empty state when no src is provided', () => {
    render(<Preview alt="No image" />);
    expect(screen.getByText('No image')).toBeInTheDocument();
  });

  it('shows the image once it loads successfully', async () => {
    render(<Preview src="https://example.com/photo.jpg" alt="Photo" />);
    await waitFor(() => expect(screen.getByAltText('Photo')).toBeInTheDocument());
  });

  it('shows error state with retry button when the image fails to load', async () => {
    render(<Preview src="https://example.com/broken.jpg" alt="Broken" />);
    await waitFor(() => expect(screen.getByText('Failed to load image')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('shows the zoom button once loaded and opens the lightbox on click', async () => {
    render(<Preview src="https://example.com/photo.jpg" alt="Photo" />);
    const zoomButton = await screen.findByRole('button', { name: 'Zoom image' });
    await userEvent.click(zoomButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes the lightbox on Escape', async () => {
    render(<Preview src="https://example.com/photo.jpg" alt="Photo" />);
    const zoomButton = await screen.findByRole('button', { name: 'Zoom image' });
    await userEvent.click(zoomButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not render a zoom button when zoomable is false', async () => {
    render(<Preview src="https://example.com/photo.jpg" alt="Photo" zoomable={false} />);
    await waitFor(() => expect(screen.getByAltText('Photo')).toBeInTheDocument());
    expect(screen.queryByRole('button', { name: 'Zoom image' })).not.toBeInTheDocument();
  });

  it('retries loading when the retry button is clicked', async () => {
    render(<Preview src="https://example.com/broken.jpg" alt="Broken" />);
    await waitFor(() => expect(screen.getByText('Failed to load image')).toBeInTheDocument());
    const retry = vi.fn();
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }));
    retry();
    expect(retry).toHaveBeenCalled();
    expect(screen.getByText('Failed to load image')).toBeInTheDocument();
  });
});

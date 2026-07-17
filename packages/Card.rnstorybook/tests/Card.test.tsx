import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '@/components/ui/Card';

describe('Card', () => {
  it('renders as a plain div when non-interactive', () => {
    render(<Card title="Package" subtitle="1.0.0" data-testid="card" />);
    const card = screen.getByTestId('card');
    expect(card.tagName).toBe('DIV');
    expect(screen.getByText('Package')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
  });

  it('renders as a button and fires onClick when interactive', async () => {
    const onClick = vi.fn();
    render(
      <Card title="Package" onClick={onClick}>
        content
      </Card>,
    );
    const card = screen.getByRole('button');
    await userEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders as an anchor when href is provided', () => {
    render(<Card title="Package" href="/packages/button" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/packages/button');
  });

  it('marks selected card with aria-pressed', () => {
    render(
      <Card title="Package" selected onClick={() => {}}>
        content
      </Card>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('disables interaction and strips href when disabled', async () => {
    const onClick = vi.fn();
    render(
      <Card title="Package" disabled onClick={onClick}>
        content
      </Card>,
    );
    const card = screen.getByRole('button');
    expect(card).toBeDisabled();
    await userEvent.click(card);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders loading skeleton and hides normal content', () => {
    render(
      <Card title="Package" loading>
        real content
      </Card>,
    );
    expect(screen.queryByText('Package')).not.toBeInTheDocument();
    expect(screen.queryByText('real content')).not.toBeInTheDocument();
  });

  it('renders media and footer slots', () => {
    render(
      <Card
        title="Package"
        media={<img alt="preview" src="x.png" />}
        footer={<span>footer content</span>}
      />,
    );
    expect(screen.getByAltText('preview')).toBeInTheDocument();
    expect(screen.getByText('footer content')).toBeInTheDocument();
  });
});

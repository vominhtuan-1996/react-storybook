import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stack } from '@/components/ui/Stack';

describe('Stack', () => {
  it('renders all children', () => {
    render(
      <Stack>
        <span>A</span>
        <span>B</span>
        <span>C</span>
      </Stack>,
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('applies row flex-direction when direction="row"', () => {
    const { container } = render(
      <Stack direction="row">
        <span>A</span>
        <span>B</span>
      </Stack>,
    );
    expect(container.firstChild).toHaveClass('flex-row');
  });

  it('applies column flex-direction by default', () => {
    const { container } = render(
      <Stack>
        <span>A</span>
      </Stack>,
    );
    expect(container.firstChild).toHaveClass('flex-col');
  });

  it('reverses direction when reverse is set', () => {
    const { container } = render(
      <Stack direction="row" reverse>
        <span>A</span>
      </Stack>,
    );
    expect(container.firstChild).toHaveClass('flex-row-reverse');
  });

  it('inserts a divider between each child when divider is set', () => {
    const { container } = render(
      <Stack direction="row" divider>
        <span>A</span>
        <span>B</span>
        <span>C</span>
      </Stack>,
    );
    const dividers = container.querySelectorAll('[aria-hidden="true"]');
    expect(dividers).toHaveLength(2);
  });

  it('renders no dividers by default', () => {
    const { container } = render(
      <Stack>
        <span>A</span>
        <span>B</span>
      </Stack>,
    );
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
  });

  it('filters out falsy children before inserting dividers', () => {
    const { container } = render(
      <Stack direction="row" divider>
        <span>A</span>
        {false}
        <span>B</span>
      </Stack>,
    );
    const dividers = container.querySelectorAll('[aria-hidden="true"]');
    expect(dividers).toHaveLength(1);
  });
});

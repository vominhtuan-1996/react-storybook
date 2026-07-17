import { Children, Fragment } from 'react';
import type { ReactNode } from 'react';

type StackDirection = 'row' | 'column';
type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type StackAlign = 'start' | 'center' | 'end' | 'stretch';
type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

interface StackProps {
  children: ReactNode;
  direction?: StackDirection;
  reverse?: boolean;
  spacing?: StackSpacing;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  divider?: boolean;
  className?: string;
}

const spacingClass: Record<StackSpacing, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const alignClass: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyClass: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

export const Stack = ({
  children,
  direction = 'column',
  reverse = false,
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  divider = false,
  className = '',
}: StackProps) => {
  const flexDirection =
    direction === 'row' ? (reverse ? 'flex-row-reverse' : 'flex-row') : reverse ? 'flex-col-reverse' : 'flex-col';

  const items = Children.toArray(children).filter(Boolean);

  return (
    <div
      className={`flex ${flexDirection} ${wrap ? 'flex-wrap' : ''} ${spacingClass[spacing]} ${alignClass[align]} ${justifyClass[justify]} ${className}`}
    >
      {divider
        ? items.map((child, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <div
                  aria-hidden="true"
                  className={
                    direction === 'row'
                      ? 'w-px shrink-0 self-stretch bg-slate-800'
                      : 'h-px w-full shrink-0 bg-slate-800'
                  }
                />
              )}
              {child}
            </Fragment>
          ))
        : items}
    </div>
  );
};

import type { ReactNode } from 'react';

export type StackDirection = 'row' | 'column';
export type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface StackProps {
  children: ReactNode;
  direction?: StackDirection;
  reverse?: boolean;
  spacing?: StackSpacing;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  divider?: boolean;
  testID?: string;
}

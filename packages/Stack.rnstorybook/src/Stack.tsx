import { Children, Fragment } from 'react';
import { View } from 'react-native';
import type { StackProps } from './Stack.types';
import { spacingPx, styles } from './Stack.styles';

const alignItems: Record<string, 'flex-start' | 'center' | 'flex-end' | 'stretch'> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const justifyContent: Record<
  string,
  'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
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
  testID,
}: StackProps) => {
  const isRow = direction === 'row';
  const flexDirection = isRow
    ? reverse
      ? 'row-reverse'
      : 'row'
    : reverse
      ? 'column-reverse'
      : 'column';

  const items = Children.toArray(children).filter(Boolean);
  const gap = spacingPx[spacing];

  return (
    <View
      testID={testID}
      style={{
        flexDirection,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        alignItems: alignItems[align],
        justifyContent: justifyContent[justify],
        gap: divider ? 0 : gap,
      }}
    >
      {divider
        ? items.map((child, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <View
                  style={[
                    isRow ? styles.dividerRow : styles.dividerColumn,
                    isRow ? { marginHorizontal: gap / 2 } : { marginVertical: gap / 2 },
                  ]}
                />
              )}
              {child}
            </Fragment>
          ))
        : items}
    </View>
  );
};

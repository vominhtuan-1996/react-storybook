import { FlatList, Pressable, Text, View } from 'react-native';
import type { GridViewProps } from './GridView.types';
import { colors, styles } from './GridView.styles';

export function GridView<T>({
  items,
  renderItem,
  keyExtractor,
  status,
  error,
  onRetry,
  emptyTitle = 'Nothing here yet',
  emptyDescription = 'New items will show up here once available.',
  columns = 3,
  testID,
}: GridViewProps<T>) {
  if (status === 'loading') {
    const rows = Math.ceil((columns * 2) / columns);
    return (
      <View testID={testID}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.skeletonRow}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <View key={colIndex} style={styles.skeletonTile} />
            ))}
          </View>
        ))}
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.centerState} testID={testID}>
        <View style={[styles.iconBadge, { backgroundColor: colors.errorIconBg }]}>
          <Text style={{ color: colors.errorIcon, fontSize: 20, fontWeight: '700' }}>!</Text>
        </View>
        <Text style={styles.stateTitle}>Couldn't load items</Text>
        <Text style={styles.stateBody}>
          {error || 'Something went wrong. Check your connection and try again.'}
        </Text>
        {onRetry ? (
          <Pressable onPress={onRetry} accessibilityRole="button" style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.centerState} testID={testID}>
        <View style={[styles.iconBadge, { backgroundColor: colors.emptyIconBg }]}>
          <Text style={{ color: colors.emptyIcon, fontSize: 20 }}>▦</Text>
        </View>
        <Text style={styles.stateTitle}>{emptyTitle}</Text>
        <Text style={styles.stateBody}>{emptyDescription}</Text>
      </View>
    );
  }

  return (
    <FlatList
      testID={testID}
      data={items}
      key={columns}
      numColumns={columns}
      keyExtractor={keyExtractor}
      columnWrapperStyle={styles.tileGap}
      renderItem={({ item, index }) => (
        <View style={styles.gridItem}>{renderItem(item, index)}</View>
      )}
    />
  );
}

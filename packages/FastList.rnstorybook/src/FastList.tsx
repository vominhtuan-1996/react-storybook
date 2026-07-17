import { FlatList, Pressable, Text, View } from 'react-native';
import type { FastListProps } from './FastList.types';
import { colors, styles } from './FastList.styles';

const SkeletonRow = ({ height }: { height: number }) => (
  <View style={[styles.skeletonRow, { height }]}>
    <View style={styles.skeletonAvatar} />
    <View style={{ flex: 1 }}>
      <View style={[styles.skeletonLine, { width: '33%' }]} />
      <View style={[styles.skeletonLine, { width: '66%', marginTop: 8 }]} />
    </View>
  </View>
);

export function FastList<T>({
  items,
  itemHeight,
  renderItem,
  keyExtractor,
  status,
  error,
  onRetry,
  emptyTitle = 'Nothing here yet',
  emptyDescription = 'New items will show up here once available.',
  testID,
}: FastListProps<T>) {
  if (status === 'loading') {
    return (
      <View style={styles.container} testID={testID}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View key={i}>
            <SkeletonRow height={itemHeight} />
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={[styles.container, styles.centerState, { paddingVertical: 40 }]} testID={testID}>
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
      <View style={[styles.container, styles.centerState, { paddingVertical: 40 }]} testID={testID}>
        <View style={[styles.iconBadge, { backgroundColor: colors.emptyIconBg }]}>
          <Text style={{ color: colors.emptyIcon, fontSize: 20 }}>▢</Text>
        </View>
        <Text style={styles.stateTitle}>{emptyTitle}</Text>
        <Text style={styles.stateBody}>{emptyDescription}</Text>
      </View>
    );
  }

  return (
    <FlatList
      testID={testID}
      style={styles.container}
      data={items}
      keyExtractor={keyExtractor}
      renderItem={({ item, index }) => <>{renderItem(item, index)}</>}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      getItemLayout={(_, index) => ({
        length: itemHeight,
        offset: itemHeight * index,
        index,
      })}
      removeClippedSubviews
      initialNumToRender={12}
      maxToRenderPerBatch={12}
      windowSize={7}
      updateCellsBatchingPeriod={50}
    />
  );
}

import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import type { ListViewProps } from './ListView.types';
import { colors, styles } from './ListView.styles';

const RefreshGlyph = ({ spinning }: { spinning: boolean }) =>
  spinning ? (
    <ActivityIndicator size="small" color={colors.refreshIcon} />
  ) : (
    <Text style={{ color: colors.refreshIcon, fontSize: 16 }}>⟳</Text>
  );

const SkeletonRow = () => (
  <View style={styles.skeletonRow}>
    <View style={styles.skeletonAvatar} />
    <View style={{ flex: 1 }}>
      <View style={[styles.skeletonLine, { width: '33%' }]} />
      <View style={[styles.skeletonLine, { width: '66%', marginTop: 8 }]} />
    </View>
  </View>
);

export function ListView<T>({
  items,
  renderItem,
  keyExtractor,
  status,
  error,
  onRetry,
  emptyTitle = 'Nothing here yet',
  emptyDescription = 'New items will show up here once available.',
  isRefreshing = false,
  onRefresh,
  hasMore = false,
  isLoadingMore = false,
  loadMoreError,
  onLoadMore,
  onRetryLoadMore,
  testID,
}: ListViewProps<T>) {
  const [refreshPressed, setRefreshPressed] = useState(false);

  const header = onRefresh ? (
    <View style={styles.header}>
      <Text style={styles.count} accessibilityLiveRegion="polite">
        {isRefreshing ? 'Refreshing…' : `${items.length} item${items.length === 1 ? '' : 's'}`}
      </Text>
      <Pressable
        onPress={onRefresh}
        disabled={isRefreshing}
        onPressIn={() => setRefreshPressed(true)}
        onPressOut={() => setRefreshPressed(false)}
        accessibilityRole="button"
        accessibilityLabel="Refresh list"
        style={[styles.refreshButton, refreshPressed && styles.refreshButtonPressed]}
      >
        <RefreshGlyph spinning={isRefreshing} />
      </Pressable>
    </View>
  ) : null;

  if (status === 'loading') {
    return (
      <View style={styles.container} testID={testID}>
        {header}
        {Array.from({ length: 5 }).map((_, i) => (
          <View key={i}>
            <SkeletonRow />
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.container} testID={testID}>
        {header}
        <View style={styles.centerState}>
          <View style={[styles.iconBadge, { backgroundColor: colors.errorIconBg }]}>
            <Text style={{ color: colors.errorIcon, fontSize: 20, fontWeight: '700' }}>!</Text>
          </View>
          <Text style={styles.stateTitle}>Couldn't load items</Text>
          <Text style={styles.stateBody}>
            {error || 'Something went wrong. Check your connection and try again.'}
          </Text>
          {onRetry ? (
            <Pressable
              onPress={onRetry}
              accessibilityRole="button"
              style={styles.retryButton}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </Pressable>
          ) : null}
        </View>
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
      ListHeaderComponent={header}
      stickyHeaderIndices={header ? [0] : undefined}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.refreshIcon}
          />
        ) : undefined
      }
      onEndReached={() => {
        if (hasMore && !isLoadingMore && !loadMoreError) onLoadMore?.();
      }}
      onEndReachedThreshold={0.4}
      ListEmptyComponent={
        <View style={styles.centerState}>
          <View style={[styles.iconBadge, { backgroundColor: colors.emptyIconBg }]}>
            <Text style={{ color: colors.emptyIcon, fontSize: 20 }}>▢</Text>
          </View>
          <Text style={styles.stateTitle}>{emptyTitle}</Text>
          <Text style={styles.stateBody}>{emptyDescription}</Text>
        </View>
      }
      ListFooterComponent={
        items.length > 0 && hasMore ? (
          <View style={styles.footer}>
            {loadMoreError ? (
              <>
                <Text style={styles.loadMoreErrorText}>{loadMoreError}</Text>
                {onRetryLoadMore ? (
                  <Pressable onPress={onRetryLoadMore} accessibilityRole="button">
                    <Text style={styles.retryLinkText}>Retry</Text>
                  </Pressable>
                ) : null}
              </>
            ) : isLoadingMore ? (
              <View style={styles.footerRow}>
                <ActivityIndicator size="small" color={colors.footerText} />
                <Text style={styles.footerText}>Loading more…</Text>
              </View>
            ) : null}
          </View>
        ) : items.length > 0 ? (
          <Text style={styles.endText}>You've reached the end.</Text>
        ) : null
      }
    />
  );
}

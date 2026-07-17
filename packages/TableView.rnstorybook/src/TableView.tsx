import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import type { SortDirection, TableColumn, TableViewProps } from './TableView.types';
import { colors, styles } from './TableView.styles';

function nextDirection(current: SortDirection): SortDirection {
  if (current === null) return 'asc';
  if (current === 'asc') return 'desc';
  return null;
}

export function TableView<T>({
  columns,
  rows,
  rowKey,
  status,
  error,
  onRetry,
  emptyTitle = 'No data yet',
  emptyDescription = 'Rows will show up here once available.',
  selectedRowKey,
  onRowPress,
  sortKey,
  sortDirection = null,
  onSortChange,
  testID,
}: TableViewProps<T>) {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const handleSort = (col: TableColumn<T>) => {
    if (!col.sortable || !onSortChange) return;
    const isActive = sortKey === col.key;
    onSortChange(col.key, isActive ? nextDirection(sortDirection) : 'asc');
  };

  const header = (
    <View style={styles.headerRow}>
      {columns.map((col) => {
        const isActive = sortKey === col.key;
        return (
          <View key={col.key} style={[styles.headerCell, { flex: col.flex ?? 1 }]}>
            {col.sortable ? (
              <Pressable
                onPress={() => handleSort(col)}
                accessibilityRole="button"
                accessibilityLabel={`Sort by ${col.header}`}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
              >
                <Text style={styles.headerText}>{col.header}</Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '700',
                    color: isActive ? colors.sortActive : colors.sortInactive,
                  }}
                >
                  {isActive && sortDirection === 'desc' ? '↓' : '↑'}
                </Text>
              </Pressable>
            ) : (
              <Text style={styles.headerText}>{col.header}</Text>
            )}
          </View>
        );
      })}
    </View>
  );

  if (status === 'loading') {
    return (
      <View style={styles.container} testID={testID}>
        {header}
        {Array.from({ length: 5 }).map((_, i) => (
          <View key={i} style={styles.row}>
            {columns.map((col) => (
              <View key={col.key} style={[styles.cell, { flex: col.flex ?? 1 }]}>
                <View style={styles.skeletonLine} />
              </View>
            ))}
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
          <Text style={styles.stateTitle}>Couldn't load data</Text>
          <Text style={styles.stateBody}>
            {error || 'Something went wrong. Check your connection and try again.'}
          </Text>
          {onRetry ? (
            <Pressable onPress={onRetry} accessibilityRole="button" style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  }

  if (rows.length === 0) {
    return (
      <View style={styles.container} testID={testID}>
        {header}
        <View style={styles.centerState}>
          <View style={[styles.iconBadge, { backgroundColor: colors.emptyIconBg }]}>
            <Text style={{ color: colors.emptyIcon, fontSize: 20 }}>▦</Text>
          </View>
          <Text style={styles.stateTitle}>{emptyTitle}</Text>
          <Text style={styles.stateBody}>{emptyDescription}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} testID={testID}>
      {header}
      <FlatList
        data={rows}
        keyExtractor={rowKey}
        renderItem={({ item, index }) => {
          const key = rowKey(item, index);
          const isSelected = selectedRowKey === key;
          const isPressed = pressedKey === key;
          return (
            <Pressable
              onPress={() => onRowPress?.(item)}
              onPressIn={() => setPressedKey(key)}
              onPressOut={() => setPressedKey(null)}
              disabled={!onRowPress}
              accessibilityRole={onRowPress ? 'button' : undefined}
              accessibilityState={onRowPress ? { selected: isSelected } : undefined}
              style={[styles.row, isSelected && styles.rowSelected, isPressed && styles.rowPressed]}
            >
              {columns.map((col) => {
                const content = col.render(item);
                return (
                  <View key={col.key} style={[styles.cell, { flex: col.flex ?? 1 }]}>
                    {typeof content === 'string' || typeof content === 'number' ? (
                      <Text style={styles.cellText}>{content}</Text>
                    ) : (
                      content
                    )}
                  </View>
                );
              })}
            </Pressable>
          );
        }}
      />
    </View>
  );
}

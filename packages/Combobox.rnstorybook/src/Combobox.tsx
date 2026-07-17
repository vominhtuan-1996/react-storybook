import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { ComboboxOption, ComboboxProps } from './Combobox.types';
import { colors, styles } from './Combobox.styles';

export const Combobox = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select…',
  helperText,
  errorText,
  disabled = false,
  isLoading = false,
  clearable = true,
  emptyMessage = 'No results found.',
  testID,
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selectedOption = options.find((o) => o.value === value) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const openSheet = () => {
    if (disabled || isLoading) return;
    setQuery('');
    setOpen(true);
  };

  const closeSheet = () => {
    setOpen(false);
    setQuery('');
  };

  const selectOption = (option: ComboboxOption) => {
    if (option.disabled) return;
    onChange(option.value);
    closeSheet();
  };

  const isDisabled = disabled || isLoading;

  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        onPress={openSheet}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, expanded: open }}
        accessibilityLabel={label}
        style={[
          styles.field,
          errorText && styles.fieldError,
          isDisabled && styles.fieldDisabled,
        ]}
      >
        <Text
          style={[
            styles.fieldText,
            { color: selectedOption ? colors.text : colors.placeholder },
          ]}
          numberOfLines={1}
        >
          {selectedOption?.label ?? placeholder}
        </Text>

        {isLoading ? (
          <ActivityIndicator size="small" color={colors.chevron} />
        ) : (
          <>
            {clearable && selectedOption && !disabled ? (
              <Pressable
                onPress={() => onChange(null)}
                accessibilityRole="button"
                accessibilityLabel="Clear selection"
                hitSlop={8}
                style={styles.clearButton}
              >
                <Text style={{ color: colors.clearIcon, fontSize: 14 }}>✕</Text>
              </Pressable>
            ) : null}
            <Text style={{ color: colors.chevron, fontSize: 12 }}>
              {open ? '▲' : '▼'}
            </Text>
          </>
        )}
      </Pressable>

      {(helperText || errorText) ? (
        <Text
          style={[
            styles.helperText,
            { color: errorText ? colors.helperError : colors.helperDefault },
          ]}
          accessibilityLiveRegion={errorText ? 'assertive' : 'polite'}
        >
          {errorText || helperText}
        </Text>
      ) : null}

      <Modal visible={open} transparent animationType="slide" onRequestClose={closeSheet}>
        <Pressable style={styles.backdrop} onPress={closeSheet}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{label}</Text>
              <Pressable
                onPress={closeSheet}
                accessibilityRole="button"
                accessibilityLabel="Close"
                style={styles.closeButton}
              >
                <Text style={{ color: colors.clearIcon, fontSize: 16 }}>✕</Text>
              </Pressable>
            </View>

            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search…"
              placeholderTextColor={colors.placeholder}
              autoFocus
              style={styles.searchInput}
              accessibilityLabel={`Search ${label}`}
            />

            <FlatList
              data={filtered}
              keyExtractor={(item) => item.value}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={{ color: colors.emptyText, fontSize: 14 }}>
                    {emptyMessage}
                  </Text>
                </View>
              }
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <Pressable
                    onPress={() => selectOption(item)}
                    disabled={item.disabled}
                    accessibilityRole="menuitem"
                    accessibilityState={{ selected: isSelected, disabled: item.disabled }}
                    style={({ pressed }) => [
                      styles.option,
                      pressed && !item.disabled && styles.optionHighlighted,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        { color: item.disabled ? colors.optionTextDisabled : colors.optionText },
                      ]}
                      numberOfLines={1}
                    >
                      {item.label}
                    </Text>
                    {isSelected ? (
                      <Text style={{ color: colors.optionSelectedIcon, fontSize: 16, fontWeight: '700' }}>
                        ✓
                      </Text>
                    ) : null}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

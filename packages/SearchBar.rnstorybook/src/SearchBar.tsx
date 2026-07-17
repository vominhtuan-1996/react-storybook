import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { SearchBarProps, SearchSuggestion } from './SearchBar.types';
import { colors, styles } from './SearchBar.styles';

export const SearchBar = ({
  value,
  onChange,
  onSearch,
  debounceMs = 300,
  placeholder = 'Search…',
  suggestions,
  onSelectSuggestion,
  isLoading = false,
  disabled = false,
  errorText,
  emptyMessage = 'No results found.',
  testID,
}: SearchBarProps) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const showSuggestions = focused && suggestions !== undefined && value.trim().length > 0;

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const fireSearch = (next: string) => {
    if (!onSearch) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(next), debounceMs);
  };

  const handleChangeText = (next: string) => {
    onChange(next);
    fireSearch(next);
  };

  const handleClear = () => {
    onChange('');
    if (debounceRef.current) clearTimeout(debounceRef.current);
    onSearch?.('');
    inputRef.current?.focus();
  };

  const selectSuggestion = (s: SearchSuggestion) => {
    onSelectSuggestion?.(s);
    setFocused(false);
    inputRef.current?.blur();
  };

  return (
    <View style={styles.container} testID={testID}>
      <View
        style={[
          styles.field,
          focused && !errorText && styles.fieldFocused,
          !!errorText && styles.fieldError,
          disabled && styles.fieldDisabled,
        ]}
      >
        <Text style={{ color: colors.icon, fontSize: 16 }}>⌕</Text>

        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={() => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            onSearch?.(value);
          }}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          returnKeyType="search"
          autoCorrect={false}
          style={styles.input}
          accessibilityLabel={placeholder}
        />

        {isLoading ? (
          <ActivityIndicator size="small" color={colors.icon} />
        ) : value && !disabled ? (
          <Pressable
            onPress={handleClear}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            hitSlop={8}
            style={styles.clearButton}
          >
            <Text style={{ color: colors.clearIcon, fontSize: 14 }}>✕</Text>
          </Pressable>
        ) : null}
      </View>

      {errorText ? (
        <Text style={styles.errorText} accessibilityLiveRegion="assertive">
          {errorText}
        </Text>
      ) : null}

      {showSuggestions ? (
        <View style={styles.suggestionList}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={{ color: colors.emptyText, fontSize: 14 }}>
                  {isLoading ? 'Searching…' : emptyMessage}
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <Pressable
                onPress={() => selectSuggestion(item)}
                style={({ pressed }) => [
                  styles.option,
                  pressed && styles.optionHighlighted,
                ]}
              >
                <Text style={styles.optionText} numberOfLines={1}>
                  {item.label}
                </Text>
              </Pressable>
            )}
          />
        </View>
      ) : null}
    </View>
  );
};

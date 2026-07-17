export interface SearchSuggestion {
  id: string;
  label: string;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  debounceMs?: number;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  onSelectSuggestion?: (suggestion: SearchSuggestion) => void;
  isLoading?: boolean;
  disabled?: boolean;
  errorText?: string;
  emptyMessage?: string;
  testID?: string;
}

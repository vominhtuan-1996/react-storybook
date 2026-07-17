import {
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import type { KeyboardEvent, SVGProps } from 'react';

export interface SearchSuggestion {
  id: string;
  label: string;
}

interface SearchBarProps {
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
  className?: string;
}

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

const Spinner = () => (
  <svg
    className="h-4 w-4 shrink-0 animate-spin text-slate-500 motion-reduce:animate-none"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

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
  className = '',
}: SearchBarProps) => {
  const [focused, setFocused] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const inputId = useId();
  const listboxId = useId();
  const helperId = useId();

  const showSuggestions =
    focused && suggestions !== undefined && value.trim().length > 0;

  useEffect(() => {
    setHighlightIndex(0);
  }, [suggestions, value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fireSearch = (next: string) => {
    if (!onSearch) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(next), debounceMs);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleChange = (next: string) => {
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || !suggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (debounceRef.current) clearTimeout(debounceRef.current);
        onSearch?.(value);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const s = suggestions[highlightIndex];
      if (s) selectSuggestion(s);
      else {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        onSearch?.(value);
      }
    } else if (e.key === 'Escape') {
      setFocused(false);
    }
  };

  return (
    <div ref={rootRef} className={`relative w-full ${className}`}>
      <div
        className={`flex h-11 items-center gap-2 rounded-lg border bg-slate-950 px-3 transition-colors duration-150 ${
          errorText
            ? 'border-red-500'
            : focused
              ? 'border-emerald-400 ring-2 ring-emerald-400/30'
              : 'border-slate-700 hover:border-slate-600'
        } ${disabled ? 'opacity-50' : ''}`}
      >
        <SearchIcon className="shrink-0 text-slate-500" />

        <input
          ref={inputRef}
          id={inputId}
          type="search"
          role={suggestions !== undefined ? 'combobox' : undefined}
          aria-expanded={suggestions !== undefined ? showSuggestions : undefined}
          aria-controls={suggestions !== undefined ? listboxId : undefined}
          aria-autocomplete={suggestions !== undefined ? 'list' : undefined}
          aria-activedescendant={
            showSuggestions && suggestions?.[highlightIndex]
              ? `${listboxId}-opt-${highlightIndex}`
              : undefined
          }
          aria-describedby={errorText ? helperId : undefined}
          aria-invalid={!!errorText}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onFocus={() => setFocused(true)}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none [&::-webkit-search-cancel-button]:appearance-none disabled:cursor-not-allowed"
        />

        {isLoading && <Spinner />}

        {!isLoading && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="-m-2 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors duration-150 hover:bg-slate-800 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {errorText && (
        <p
          id={helperId}
          role="alert"
          className="mt-1.5 text-xs leading-relaxed text-red-400"
        >
          {errorText}
        </p>
      )}

      {showSuggestions && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute z-20 mt-1.5 max-h-60 w-full overflow-auto rounded-lg border border-slate-800 bg-slate-900 py-1 shadow-xl shadow-black/40 animate-dialog-panel-in"
        >
          {!suggestions || suggestions.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-slate-500">
              {isLoading ? 'Searching…' : emptyMessage}
            </li>
          ) : (
            suggestions.map((s, index) => (
              <li
                key={s.id}
                id={`${listboxId}-opt-${index}`}
                role="option"
                aria-selected={index === highlightIndex}
                onMouseEnter={() => setHighlightIndex(index)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectSuggestion(s);
                }}
                className={`cursor-pointer px-3 py-2 text-sm ${
                  index === highlightIndex
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300'
                }`}
              >
                {s.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

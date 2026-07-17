import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { KeyboardEvent, SVGProps } from 'react';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ComboboxProps {
  label: string;
  options: ComboboxOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  isLoading?: boolean;
  clearable?: boolean;
  emptyMessage?: string;
  className?: string;
}

const ChevronIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M6 9l6 6 6-6" />
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

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const Spinner = () => (
  <svg
    className="h-4 w-4 animate-spin text-slate-500 motion-reduce:animate-none"
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
  className = '',
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const inputId = useId();
  const listboxId = useId();
  const helperId = useId();

  const selectedOption = options.find((o) => o.value === value) ?? null;
  const displayValue = open ? query : selectedOption?.label ?? '';

  const filtered = useMemo(() => {
    if (!open) return options;
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query, open]);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => {
    setHighlightIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${highlightIndex}"]`,
    );
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlightIndex, open]);

  const openList = () => {
    if (disabled || isLoading) return;
    setOpen(true);
    setQuery('');
  };

  const selectOption = (option: ComboboxOption) => {
    if (option.disabled) return;
    onChange(option.value);
    setOpen(false);
    setQuery('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled || isLoading) return;

    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      openList();
      return;
    }
    if (!open) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = filtered[highlightIndex];
      if (opt) selectOption(opt);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      setQuery('');
    } else if (e.key === 'Tab') {
      setOpen(false);
      setQuery('');
    }
  };

  const status = errorText ? 'error' : 'default';

  return (
    <div ref={rootRef} className={`relative w-full ${className}`}>
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-sm font-medium text-slate-200"
      >
        {label}
      </label>

      <div
        className={`flex h-11 items-center gap-2 rounded-lg border bg-slate-950 px-3 transition-colors duration-150 ${
          status === 'error'
            ? 'border-red-500'
            : open
              ? 'border-emerald-400 ring-2 ring-emerald-400/30'
              : 'border-slate-700 hover:border-slate-600'
        } ${disabled ? 'opacity-50' : ''}`}
      >
        <input
          ref={inputRef}
          id={inputId}
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && filtered[highlightIndex]
              ? `${listboxId}-opt-${highlightIndex}`
              : undefined
          }
          aria-describedby={helperText || errorText ? helperId : undefined}
          aria-invalid={status === 'error'}
          disabled={disabled || isLoading}
          placeholder={placeholder}
          autoComplete="off"
          value={displayValue}
          onFocus={openList}
          onClick={openList}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none disabled:cursor-not-allowed"
        />

        {isLoading && <Spinner />}

        {!isLoading && clearable && selectedOption && !disabled && (
          <button
            type="button"
            onClick={() => {
              onChange(null);
              setQuery('');
              inputRef.current?.focus();
            }}
            aria-label="Clear selection"
            className="-m-2 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors duration-150 hover:bg-slate-800 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <CloseIcon />
          </button>
        )}

        {!isLoading && (
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => {
              if (open) {
                setOpen(false);
                setQuery('');
              } else {
                openList();
                inputRef.current?.focus();
              }
            }}
            disabled={disabled}
            className="-m-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-slate-500 disabled:cursor-not-allowed"
          >
            <ChevronIcon
              className={`transition-transform duration-150 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>

      {(helperText || errorText) && (
        <p
          id={helperId}
          role={status === 'error' ? 'alert' : undefined}
          className={`mt-1.5 text-xs leading-relaxed ${status === 'error' ? 'text-red-400' : 'text-slate-500'}`}
        >
          {errorText || helperText}
        </p>
      )}

      {open && !disabled && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute z-20 mt-1.5 max-h-60 w-full overflow-auto rounded-lg border border-slate-800 bg-slate-900 py-1 shadow-xl shadow-black/40 animate-dialog-panel-in"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-slate-500">
              {emptyMessage}
            </li>
          ) : (
            filtered.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightIndex;
              return (
                <li
                  key={option.value}
                  id={`${listboxId}-opt-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                  onMouseEnter={() => setHighlightIndex(index)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectOption(option);
                  }}
                  className={`flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm ${
                    option.disabled
                      ? 'cursor-not-allowed text-slate-600'
                      : isHighlighted
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-300'
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <CheckIcon className="shrink-0 text-emerald-400" />
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
};

import { useState } from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import type { SearchSuggestion } from '@/components/ui/SearchBar';

const all: SearchSuggestion[] = [
  { id: '1', label: 'React' },
  { id: '2', label: 'Redux' },
  { id: '3', label: 'Remix' },
];

export const SearchBarPlayground = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showError, setShowError] = useState(false);
  const [searchCount, setSearchCount] = useState(0);

  const handleSearch = (q: string) => {
    setSearchCount((c) => c + 1);
    if (!q.trim()) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setSuggestions(all.filter((s) => s.label.toLowerCase().includes(q.toLowerCase())));
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[140px] items-start rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <SearchBar
          value={value}
          onChange={setValue}
          onSearch={handleSearch}
          suggestions={suggestions}
          isLoading={isLoading}
          disabled={disabled}
          errorText={showError ? 'Search query too short.' : undefined}
          onSelectSuggestion={(s) => setValue(s.label)}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <p className="col-span-2 text-slate-500">
          onSearch fired: {searchCount}x (debounced 300ms)
        </p>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Disabled
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={showError}
            onChange={(e) => setShowError(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Error
        </label>
      </div>
    </div>
  );
};

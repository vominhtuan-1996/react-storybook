import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { Snackbar } from './Snackbar';
import type { SnackbarItem, SnackbarVariant } from './Snackbar';

interface ShowSnackbarOptions {
  variant?: SnackbarVariant;
  durationMs?: number;
  actionLabel?: string;
  onAction?: () => void;
}

interface SnackbarContextValue {
  showSnackbar: (message: string, options?: ShowSnackbarOptions) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

const DEFAULT_DURATION_MS = 4000;
const MAX_VISIBLE = 3;

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<SnackbarItem[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showSnackbar = useCallback(
    (message: string, options?: ShowSnackbarOptions) => {
      const id = crypto.randomUUID();
      const duration = options?.durationMs ?? DEFAULT_DURATION_MS;

      setItems((prev) => [
        ...prev.slice(-(MAX_VISIBLE - 1)),
        {
          id,
          message,
          variant: options?.variant ?? 'default',
          actionLabel: options?.actionLabel,
          onAction: options?.onAction,
        },
      ]);

      const timer = setTimeout(() => dismiss(id), duration);
      timers.current.set(id, timer);
    },
    [dismiss],
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[1000] flex flex-col items-center gap-2 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-start sm:pl-6"
      >
        {items.map((item) => (
          <Snackbar key={item.id} {...item} onDismiss={dismiss} />
        ))}
      </div>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextValue => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return ctx;
};

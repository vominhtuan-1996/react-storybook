import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Snackbar } from './Snackbar';
import { styles } from './Snackbar.styles';
import type {
  ShowSnackbarOptions,
  SnackbarContextValue,
  SnackbarItem,
} from './Snackbar.types';

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

const DEFAULT_DURATION_MS = 4000;
const MAX_VISIBLE = 3;

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `snackbar-${idCounter}`;
}

interface SnackbarProviderProps {
  children: ReactNode;
  /** Bottom safe-area inset, e.g. from useSafeAreaInsets().bottom. Defaults to 0. */
  bottomInset?: number;
}

export const SnackbarProvider = ({
  children,
  bottomInset = 0,
}: SnackbarProviderProps) => {
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
      const id = nextId();
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
      <View
        pointerEvents="box-none"
        style={[styles.stack, { paddingBottom: 16 + bottomInset }]}
      >
        {items.map((item) => (
          <Snackbar key={item.id} {...item} onDismiss={dismiss} />
        ))}
      </View>
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

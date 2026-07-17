import type { ReactNode, SVGProps } from 'react';

export type SnackbarVariant = 'default' | 'success' | 'error';

export interface SnackbarItem {
  id: string;
  message: string;
  variant?: SnackbarVariant;
  actionLabel?: string;
  onAction?: () => void;
}

interface SnackbarProps extends SnackbarItem {
  onDismiss: (id: string) => void;
}

const CheckCircleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.5 2.5 4.5-5" />
  </svg>
);

const AlertCircleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5" />
    <path d="M12 16h.01" />
  </svg>
);

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

const variantIcon: Record<SnackbarVariant, ReactNode> = {
  default: null,
  success: <CheckCircleIcon className="text-emerald-400" />,
  error: <AlertCircleIcon className="text-red-400" />,
};

const variantBorder: Record<SnackbarVariant, string> = {
  default: 'border-slate-700',
  success: 'border-emerald-500/40',
  error: 'border-red-500/40',
};

export const Snackbar = ({
  id,
  message,
  variant = 'default',
  actionLabel,
  onAction,
  onDismiss,
}: SnackbarProps) => {
  return (
    <div
      role="status"
      className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border ${variantBorder[variant]} bg-slate-900 px-4 py-3 shadow-lg shadow-black/30 animate-snackbar-in`}
    >
      {variantIcon[variant] && (
        <span className="mt-0.5 shrink-0">{variantIcon[variant]}</span>
      )}

      <p className="min-w-0 flex-1 text-sm leading-relaxed text-slate-100">
        {message}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={() => {
            onAction();
            onDismiss(id);
          }}
          className="shrink-0 cursor-pointer text-sm font-semibold text-emerald-400 transition-colors duration-150 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          {actionLabel}
        </button>
      )}

      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
        className="-m-2.5 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors duration-150 hover:bg-slate-800 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

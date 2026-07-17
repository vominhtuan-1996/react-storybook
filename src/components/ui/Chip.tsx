import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode, SVGProps } from 'react';

type ChipVariant = 'filled' | 'outlined';

interface ChipOwnProps {
  variant?: ChipVariant;
  selected?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
  children: ReactNode;
  className?: string;
}

export type ChipProps = ChipOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ChipOwnProps>;

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M2.5 2.5l7 7" />
    <path d="M9.5 2.5l-7 7" />
  </svg>
);

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M3 7.2l2.6 2.6L11 4.2" />
  </svg>
);

const variantClasses: Record<ChipVariant, { base: string; selected: string }> = {
  filled: {
    base: 'bg-slate-800 text-slate-200',
    selected: 'bg-emerald-500 text-slate-950',
  },
  outlined: {
    base: 'border border-slate-700 bg-transparent text-slate-300',
    selected: 'border border-emerald-500 bg-emerald-500/15 text-emerald-300',
  },
};

const hoverClasses: Record<ChipVariant, { base: string; selected: string }> = {
  filled: {
    base: 'hover:bg-slate-700',
    selected: 'hover:bg-emerald-400',
  },
  outlined: {
    base: 'hover:border-slate-500 hover:bg-slate-900',
    selected: 'hover:bg-emerald-500/20',
  },
};

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      variant = 'filled',
      selected = false,
      disabled = false,
      icon,
      onRemove,
      removeLabel = 'Remove',
      children,
      className = '',
      onClick,
      ...props
    },
    ref,
  ) => {
    const colors = variantClasses[variant];
    const hover = hoverClasses[variant];
    const isInteractive = !!onClick;

    const pillClasses = `inline-flex h-8 items-center rounded-full text-sm font-medium transition-colors duration-150 ease-out ${
      disabled
        ? 'cursor-not-allowed opacity-50'
        : selected
          ? colors.selected
          : colors.base
    } ${className}`;

    const content = (
      <>
        {selected ? (
          <CheckIcon className="shrink-0" />
        ) : icon ? (
          <span className="flex shrink-0 items-center" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span className="truncate">{children}</span>
      </>
    );

    const removeButton = onRemove && (
      <button
        type="button"
        disabled={disabled}
        aria-label={removeLabel}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className={`-m-1.5 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:cursor-not-allowed ${
          !disabled ? (selected ? 'hover:bg-black/10' : 'hover:bg-white/10') : ''
        }`}
      >
        <CloseIcon />
      </button>
    );

    if (isInteractive) {
      return (
        <span className={`${pillClasses} gap-1.5 ${!disabled ? (selected ? hover.selected : hover.base) : ''} ${onRemove ? 'pl-3 pr-1.5' : 'px-3'}`}>
          <button
            ref={ref}
            type="button"
            aria-pressed={selected}
            disabled={disabled}
            onClick={onClick}
            className={`inline-flex min-w-0 items-center gap-1.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-95 ${
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            {...props}
          >
            {content}
          </button>
          {removeButton}
        </span>
      );
    }

    return (
      <span
        className={`${pillClasses} gap-1.5 ${onRemove ? 'pl-3 pr-1.5' : 'px-3'}`}
      >
        {content}
        {removeButton}
      </span>
    );
  },
);

Chip.displayName = 'Chip';

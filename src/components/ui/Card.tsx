import { forwardRef } from 'react';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

type CardVariant = 'elevated' | 'outlined' | 'flat';

interface CardOwnProps {
  variant?: CardVariant;
  selected?: boolean;
  loading?: boolean;
  disabled?: boolean;
  media?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

type CardAsButton = CardOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CardOwnProps> & {
    href?: undefined;
  };

type CardAsAnchor = CardOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CardOwnProps> & {
    href: string;
  };

export type CardProps = CardAsButton | CardAsAnchor;

const variantClasses: Record<CardVariant, string> = {
  elevated: 'border border-slate-800 bg-slate-900/60 shadow-md shadow-black/20',
  outlined: 'border border-slate-800 bg-slate-900/30 shadow-none',
  flat: 'border border-transparent bg-slate-900/40 shadow-none',
};

const CardSkeleton = () => (
  <div className="animate-pulse" aria-hidden="true">
    <div className="h-32 rounded-lg bg-slate-800" />
    <div className="mt-4 h-4 w-2/3 rounded bg-slate-800" />
    <div className="mt-2 h-3 w-full rounded bg-slate-800/70" />
    <div className="mt-1.5 h-3 w-4/5 rounded bg-slate-800/70" />
  </div>
);

export const Card = forwardRef<HTMLElement, CardProps>(
  (
    {
      variant = 'elevated',
      selected = false,
      loading = false,
      disabled = false,
      media,
      title,
      subtitle,
      footer,
      children,
      className = '',
      href,
      ...rest
    },
    ref,
  ) => {
    const isInteractive = !!(href || 'onClick' in rest);

    const sharedClasses = `group relative w-full rounded-xl p-5 text-left transition-all duration-200 ease-out motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${variantClasses[variant]} ${
      selected
        ? 'border-emerald-500 ring-1 ring-emerald-500/50'
        : ''
    } ${
      isInteractive && !disabled
        ? 'cursor-pointer hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-lg hover:shadow-black/30 active:translate-y-0 active:scale-[0.99] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950'
        : ''
    } ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`;

    const content = loading ? (
      <CardSkeleton />
    ) : (
      <>
        {media && (
          <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-xl">
            {media}
          </div>
        )}
        {(title || subtitle) && (
          <div className="mb-1">
            {title && (
              <h3 className="text-base font-semibold text-white">{title}</h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
            )}
          </div>
        )}
        {children}
        {footer && <div className="mt-4">{footer}</div>}
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={disabled ? undefined : href}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
          className={sharedClasses}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    if (isInteractive) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          disabled={disabled}
          aria-pressed={selected}
          className={sharedClasses}
          {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={sharedClasses}
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      >
        {content}
      </div>
    );
  },
);

Card.displayName = 'Card';

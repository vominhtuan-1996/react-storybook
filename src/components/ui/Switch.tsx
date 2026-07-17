import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';

interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  error?: string;
  isLoading?: boolean;
}

const Spinner = () => (
  <svg
    className="pointer-events-none absolute left-[12px] top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-slate-500 transition-transform duration-200 ease-out peer-checked:translate-x-5 motion-reduce:animate-none"
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

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      description,
      error,
      isLoading = false,
      disabled,
      id,
      className = '',
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const isDisabled = disabled || isLoading;

    return (
      <div className={`flex ${className}`}>
        <div className="relative h-6 w-11 shrink-0">
          {/* Extend the touch target to 44px without affecting visual track size. */}
          <div className="absolute -inset-[10px]">
            <input
              ref={ref}
              type="checkbox"
              role="switch"
              id={inputId}
              disabled={isDisabled}
              aria-invalid={!!error}
              aria-describedby={description || error ? helperId : undefined}
              className="peer absolute inset-0 m-0 h-full w-full cursor-pointer appearance-none disabled:cursor-not-allowed"
              {...props}
            />

            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-[10px] rounded-full transition-colors duration-200 ease-out ${
                error
                  ? 'bg-red-500/30'
                  : 'bg-slate-700 peer-checked:bg-emerald-500'
              } peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-950 peer-disabled:opacity-50`}
            />

            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[12px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out peer-checked:translate-x-5 peer-active:scale-x-110 peer-disabled:opacity-50"
            />

            {isLoading && <Spinner />}
          </div>
        </div>

        {(label || description || error) && (
          <div className="flex min-w-0 flex-col justify-center py-1 pl-3">
            {label && (
              <label
                htmlFor={inputId}
                className={`text-sm font-medium leading-5 ${
                  isDisabled ? 'cursor-not-allowed text-slate-500' : 'cursor-pointer text-slate-200'
                }`}
              >
                {label}
              </label>
            )}
            {(description || error) && (
              <p
                id={helperId}
                role={error ? 'alert' : undefined}
                className={`text-xs leading-relaxed ${error ? 'text-red-400' : 'text-slate-500'}`}
              >
                {error || description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);

Switch.displayName = 'Switch';

import { forwardRef, useEffect, useId, useRef } from 'react';
import type { InputHTMLAttributes, MutableRefObject } from 'react';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  error?: string;
}

const CheckIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 m-auto hidden text-slate-950 peer-checked:block"
  >
    <path
      d="M2.5 6.2l2.2 2.2 4.8-5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={0}
      className="animate-checkbox-draw motion-reduce:animate-none"
    />
  </svg>
);

const IndeterminateIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 m-auto hidden text-slate-950 peer-indeterminate:block"
  >
    <path d="M2.5 6h7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </svg>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      indeterminate = false,
      error,
      disabled,
      id,
      className = '',
      ...props
    },
    forwardedRef,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const innerRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const setRefs = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) {
        (forwardedRef as MutableRefObject<HTMLInputElement | null>).current = node;
      }
    };

    return (
      <div className={`flex ${className}`}>
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
          <input
            ref={setRefs}
            type="checkbox"
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={description || error ? helperId : undefined}
            className="peer absolute inset-0 m-0 h-full w-full cursor-pointer appearance-none disabled:cursor-not-allowed"
            {...props}
          />
          <span
            aria-hidden="true"
            className={`pointer-events-none h-5 w-5 rounded-md border transition-all duration-150 ease-out ${
              error ? 'border-red-500' : 'border-slate-600 peer-hover:border-slate-400'
            } bg-slate-950 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 peer-indeterminate:border-emerald-500 peer-indeterminate:bg-emerald-500 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-950 peer-active:scale-90 peer-disabled:opacity-50`}
          />
          <CheckIcon />
          <IndeterminateIcon />
        </div>

        {(label || description || error) && (
          <div className="flex min-w-0 flex-col justify-center py-1">
            {label && (
              <label
                htmlFor={inputId}
                className={`text-sm font-medium leading-5 ${
                  disabled ? 'cursor-not-allowed text-slate-500' : 'cursor-pointer text-slate-200'
                }`}
              >
                {label}
                {props.required && (
                  <span className="ml-0.5 text-red-400" aria-hidden="true">
                    *
                  </span>
                )}
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

Checkbox.displayName = 'Checkbox';

import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';

interface RadioButtonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  error?: string;
  invalid?: boolean;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    { label, description, error, invalid, disabled, id, className = '', ...props },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const showInvalid = invalid || !!error;

    return (
      <div className={`flex ${className}`}>
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
          <input
            ref={ref}
            type="radio"
            id={inputId}
            disabled={disabled}
            aria-invalid={showInvalid}
            aria-describedby={description || error ? helperId : undefined}
            className="peer absolute inset-0 m-0 h-full w-full cursor-pointer appearance-none disabled:cursor-not-allowed"
            {...props}
          />
          <span
            aria-hidden="true"
            className={`pointer-events-none h-5 w-5 rounded-full border transition-all duration-150 ease-out ${
              showInvalid ? 'border-red-500' : 'border-slate-600 peer-hover:border-slate-400'
            } bg-slate-950 peer-checked:border-emerald-500 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-950 peer-active:scale-90 peer-disabled:opacity-50`}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 m-auto h-2.5 w-2.5 scale-0 rounded-full bg-emerald-500 transition-transform duration-150 ease-out peer-checked:scale-100 peer-disabled:opacity-50"
          />
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

RadioButton.displayName = 'RadioButton';

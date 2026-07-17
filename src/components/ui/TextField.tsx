import { forwardRef, useId, useRef, useState } from 'react';
import type { FocusEvent, InputHTMLAttributes, SVGProps } from 'react';
import { useKeyboardAvoidance } from '@/hooks/useKeyboardAvoidance';

type TextFieldStatus = 'default' | 'error' | 'success';

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  showCount?: boolean;
}

const EyeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M3 3l18 18" />
    <path d="M10.6 5.1A10.7 10.7 0 0112 5c6.5 0 10 7 10 7a17.9 17.9 0 01-3.2 4.1M6.6 6.6C4 8.3 2 12 2 12s3.5 7 10 7a10 10 0 004.2-.9" />
    <path d="M9.9 9.9a3 3 0 004.2 4.2" />
  </svg>
);

const CheckCircleIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.5 2.5 4.5-5" />
  </svg>
);

const AlertCircleIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5" />
    <path d="M12 16h.01" />
  </svg>
);

const borderByStatus: Record<TextFieldStatus, string> = {
  default:
    'border-slate-700 focus-within:border-emerald-400 focus-within:ring-emerald-400/30',
  error: 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/30',
  success:
    'border-emerald-500 focus-within:border-emerald-500 focus-within:ring-emerald-500/30',
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      helperText,
      errorText,
      successText,
      showCount,
      required,
      disabled,
      readOnly,
      type = 'text',
      id,
      maxLength,
      value,
      defaultValue,
      className = '',
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [revealPassword, setRevealPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;

    const wrapperRef = useRef<HTMLDivElement>(null);
    const { offset, reducedMotion } = useKeyboardAvoidance(wrapperRef, isFocused);

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };
    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const status: TextFieldStatus = errorText
      ? 'error'
      : successText
        ? 'success'
        : 'default';

    const isPassword = type === 'password';
    const resolvedType = isPassword && revealPassword ? 'text' : type;

    const currentLength =
      (value != null ? String(value) : (defaultValue as string) || '').length;

    return (
      <div
        ref={wrapperRef}
        className="w-full"
        style={{
          transform: offset > 0 ? `translateY(-${offset}px)` : undefined,
          transition: reducedMotion
            ? undefined
            : 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <label
          htmlFor={inputId}
          className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-slate-200"
        >
          <span>
            {label}
            {required && (
              <span className="ml-0.5 text-red-400" aria-hidden="true">
                *
              </span>
            )}
          </span>
          {showCount && maxLength && (
            <span className="text-xs font-normal text-slate-500">
              {currentLength}/{maxLength}
            </span>
          )}
        </label>

        <div
          className={`flex items-center gap-2 rounded-lg border bg-slate-950 px-3 transition-colors duration-150 focus-within:ring-2 ${borderByStatus[status]} ${
            disabled ? 'opacity-50' : ''
          } ${readOnly ? 'bg-slate-900' : ''}`}
        >
          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            aria-invalid={status === 'error'}
            aria-describedby={
              helperText || errorText || successText ? helperId : undefined
            }
            className={`h-11 min-w-0 flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none disabled:cursor-not-allowed read-only:cursor-default ${className}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {status === 'success' && !isPassword && (
            <CheckCircleIcon className="shrink-0 text-emerald-400" />
          )}
          {status === 'error' && !isPassword && (
            <AlertCircleIcon className="shrink-0 text-red-400" />
          )}

          {isPassword && !disabled && (
            <button
              type="button"
              onClick={() => setRevealPassword((prev) => !prev)}
              aria-label={revealPassword ? 'Hide password' : 'Show password'}
              className="-m-2 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors duration-150 hover:bg-slate-800 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              {revealPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}
        </div>

        {(helperText || errorText || successText) && (
          <p
            id={helperId}
            role={status === 'error' ? 'alert' : undefined}
            className={`mt-1.5 text-xs leading-relaxed ${
              status === 'error'
                ? 'text-red-400'
                : status === 'success'
                  ? 'text-emerald-400'
                  : 'text-slate-500'
            }`}
          >
            {errorText || successText || helperText}
          </p>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';

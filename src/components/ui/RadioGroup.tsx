import { useId } from 'react';
import { RadioButton } from './RadioButton';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  label?: string;
  name?: string;
  options: RadioOption[];
  value: string | null;
  onChange: (value: string) => void;
  disabled?: boolean;
  errorText?: string;
  className?: string;
}

export const RadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  disabled = false,
  errorText,
  className = '',
}: RadioGroupProps) => {
  const generatedName = useId();
  const groupName = name ?? generatedName;
  const helperId = useId();

  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-describedby={errorText ? helperId : undefined}
      className={`flex flex-col gap-1 ${className}`}
    >
      {label && (
        <span className="mb-1 text-sm font-medium text-slate-200">{label}</span>
      )}

      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={groupName}
          value={option.value}
          label={option.label}
          description={option.description}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          disabled={disabled || option.disabled}
          invalid={!!errorText}
        />
      ))}

      {errorText && (
        <p id={helperId} role="alert" className="mt-1 text-xs leading-relaxed text-red-400">
          {errorText}
        </p>
      )}
    </div>
  );
};

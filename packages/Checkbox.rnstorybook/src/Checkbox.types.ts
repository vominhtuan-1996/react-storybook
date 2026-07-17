export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  testID?: string;
}

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  isLoading?: boolean;
  label?: string;
  description?: string;
  error?: string;
  testID?: string;
}

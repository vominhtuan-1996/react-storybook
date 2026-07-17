import type { TextInputProps } from 'react-native';

export interface TextFieldProps
  extends Omit<TextInputProps, 'style' | 'placeholderTextColor'> {
  label: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  showCount?: boolean;
  required?: boolean;
  disabled?: boolean;
  testID?: string;
}

export interface TabNavigationItem {
  value: string;
  label: string;
  badge?: number;
  disabled?: boolean;
}

export interface TabNavigationProps {
  tabs: TabNavigationItem[];
  value: string;
  onChange: (value: string) => void;
  testID?: string;
}

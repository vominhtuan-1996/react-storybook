import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from '../src/SearchBar';

const suggestions = [
  { id: '1', label: 'React' },
  { id: '2', label: 'Redux' },
  { id: '3', label: 'Remix' },
];

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Empty: Story = {
  args: { value: '', onChange: () => {} },
};

export const WithSuggestions: Story = {
  args: { value: 're', onChange: () => {}, suggestions },
};

export const Loading: Story = {
  args: { value: 're', onChange: () => {}, suggestions: [], isLoading: true },
};

export const NoResults: Story = {
  args: { value: 'xyz', onChange: () => {}, suggestions: [] },
};

export const Disabled: Story = {
  args: { value: '', onChange: () => {}, disabled: true },
};

export const ErrorState: Story = {
  args: { value: '', onChange: () => {}, errorText: 'Search query too short.' },
};

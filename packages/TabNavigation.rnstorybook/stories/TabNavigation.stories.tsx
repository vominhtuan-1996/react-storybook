import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabNavigation } from '../src/TabNavigation';
import type { TabNavigationItem } from '../src/TabNavigation.types';

const basicTabs: TabNavigationItem[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
];

const badgeTabs: TabNavigationItem[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active', badge: 3 },
  { value: 'archived', label: 'Archived', disabled: true },
];

const manyTabs: TabNavigationItem[] = [
  { value: 'a', label: 'Overview' },
  { value: 'b', label: 'Analytics' },
  { value: 'c', label: 'Reports' },
  { value: 'd', label: 'Notifications' },
  { value: 'e', label: 'Settings' },
  { value: 'f', label: 'Billing' },
];

const meta: Meta<typeof TabNavigation> = {
  title: 'Components/TabNavigation',
  component: TabNavigation,
};

export default meta;
type Story = StoryObj<typeof TabNavigation>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('all');
    return <TabNavigation tabs={basicTabs} value={value} onChange={setValue} />;
  },
};

export const WithBadgeAndDisabled: Story = {
  render: () => {
    const [value, setValue] = useState('all');
    return <TabNavigation tabs={badgeTabs} value={value} onChange={setValue} />;
  },
};

export const ScrollableOverflow: Story = {
  render: () => {
    const [value, setValue] = useState('a');
    return <TabNavigation tabs={manyTabs} value={value} onChange={setValue} />;
  },
};

export interface RnStorybookPackage {
  slug: string;
  name: string;
  packageName: string;
  version: string;
  description: string;
  tags: string[];
  category: string;
  installCommand: string;
  usage: string;
}

export const packages: RnStorybookPackage[] = [
  {
    slug: 'animation',
    name: 'Animation',
    packageName: '@rnstorybook/animation',
    version: '0.1.0',
    description:
      'Declarative enter/exit transition wrapper with fade/slide/scale/bounce variants, configurable cubic-bezier easing presets, and reduced-motion support.',
    tags: ['animation', 'transition', 'easing', 'cubic-bezier', 'motion'],
    category: 'Utility',
    installCommand: 'npm install @rnstorybook/animation',
    usage: `import { Animation } from '@rnstorybook/animation';

<Animation show={visible} variant="slide-up" duration={220} easing="back">
  <Card />
</Animation>`,
  },
  {
    slug: 'button',
    name: 'Button',
    packageName: '@rnstorybook/button',
    version: '0.1.0',
    description:
      'Primary/secondary/ghost button with loading state, size scale, and press feedback.',
    tags: ['button', 'action', 'form'],
    category: 'Inputs',
    installCommand: 'npm install @rnstorybook/button',
    usage: `import { Button } from '@rnstorybook/button';

<Button variant="primary" size="md" onPress={onSubmit}>
  Get started
</Button>`,
  },
  {
    slug: 'card',
    name: 'Card',
    packageName: '@rnstorybook/card',
    version: '0.1.0',
    description:
      'Polymorphic content card with elevated/outlined/flat variants, press/focus/selected/disabled/loading states.',
    tags: ['card', 'container', 'layout'],
    category: 'Layout',
    installCommand: 'npm install @rnstorybook/card',
    usage: `import { Card } from '@rnstorybook/card';

<Card
  variant="elevated"
  title="Package published"
  subtitle="1.2.0"
  onPress={openDetails}
/>`,
  },
  {
    slug: 'carousel',
    name: 'Carousel',
    packageName: '@rnstorybook/carousel',
    version: '0.1.0',
    description:
      'Autoplaying slide carousel with swipe paging, play/pause control, and dot navigation. Respects reduced motion.',
    tags: ['carousel', 'slider', 'autoplay', 'swipe'],
    category: 'Display',
    installCommand: 'npm install @rnstorybook/carousel',
    usage: `import { Carousel } from '@rnstorybook/carousel';

<Carousel
  slides={banners.map((b) => <Banner key={b.id} {...b} />)}
  intervalMs={4000}
  loop
/>`,
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    packageName: '@rnstorybook/checkbox',
    version: '0.1.0',
    description:
      'Checkbox with checked/unchecked/indeterminate/disabled/error states, animated check glyph, and focus ring.',
    tags: ['checkbox', 'form', 'toggle'],
    category: 'Inputs',
    installCommand: 'npm install @rnstorybook/checkbox',
    usage: `import { Checkbox } from '@rnstorybook/checkbox';

<Checkbox
  label="Accept terms"
  checked={accepted}
  onChange={setAccepted}
  required
/>`,
  },
  {
    slug: 'chip',
    name: 'Chip',
    packageName: '@rnstorybook/chip',
    version: '0.1.0',
    description:
      'Filled/outlined chip with selectable, removable, and disabled states.',
    tags: ['chip', 'tag', 'filter', 'selection'],
    category: 'Inputs',
    installCommand: 'npm install @rnstorybook/chip',
    usage: `import { Chip } from '@rnstorybook/chip';

<Chip
  selected={isActive}
  onPress={() => toggle(tag)}
  onRemove={() => removeTag(tag)}
>
  {tag}
</Chip>`,
  },
  {
    slug: 'combobox',
    name: 'Combobox',
    packageName: '@rnstorybook/combobox',
    version: '0.1.0',
    description:
      'Searchable select field with filter, disabled/loading/error/empty states, and a bottom-sheet option list.',
    tags: ['combobox', 'select', 'search', 'dropdown', 'form'],
    category: 'Inputs',
    installCommand: 'npm install @rnstorybook/combobox',
    usage: `import { Combobox } from '@rnstorybook/combobox';

<Combobox
  label="Framework"
  options={frameworks}
  value={value}
  onChange={setValue}
/>`,
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    packageName: '@rnstorybook/dialog',
    version: '0.1.0',
    description:
      'Accessible modal dialog with focus trap, backdrop dismiss, and Android back-button handling.',
    tags: ['modal', 'overlay', 'confirmation', 'accessibility'],
    category: 'Feedback',
    installCommand: 'npm install @rnstorybook/dialog',
    usage: `import { Dialog } from '@rnstorybook/dialog';

<Dialog
  visible={visible}
  onClose={() => setVisible(false)}
  title="Delete component?"
  description="This can't be undone."
/>`,
  },
  {
    slug: 'expand',
    name: 'Expand',
    packageName: '@rnstorybook/expand',
    version: '0.1.0',
    description:
      'Collapsible panel with animated height transition, controlled/uncontrolled open state, and disabled support.',
    tags: ['accordion', 'collapse', 'expand', 'disclosure'],
    category: 'Layout',
    installCommand: 'npm install @rnstorybook/expand',
    usage: `import { Expand } from '@rnstorybook/expand';

<Expand title="What is included?">
  Everything you need to publish a component.
</Expand>`,
  },
  {
    slug: 'fast-list',
    name: 'FastList',
    packageName: '@rnstorybook/fast-list',
    version: '0.1.0',
    description:
      'Virtualized fixed-height list for large datasets, with loading/error/empty states and getItemLayout-tuned scroll performance.',
    tags: ['list', 'virtualized', 'performance', 'flatlist'],
    category: 'Layout',
    installCommand: 'npm install @rnstorybook/fast-list',
    usage: `import { FastList } from '@rnstorybook/fast-list';

<FastList
  items={tenThousandRows}
  itemHeight={48}
  status="success"
  keyExtractor={(item) => item.id}
  renderItem={(item) => <Row item={item} />}
/>`,
  },
  {
    slug: 'grid-view',
    name: 'GridView',
    packageName: '@rnstorybook/grid-view',
    version: '0.1.0',
    description:
      'Responsive grid list (2/3/4 columns) with loading skeleton, error/retry, and empty states.',
    tags: ['grid', 'list', 'gallery', 'layout'],
    category: 'Layout',
    installCommand: 'npm install @rnstorybook/grid-view',
    usage: `import { GridView } from '@rnstorybook/grid-view';

<GridView
  items={packages}
  columns={3}
  status="success"
  keyExtractor={(item) => item.id}
  renderItem={(item) => <Tile item={item} />}
/>`,
  },
  {
    slug: 'list-view',
    name: 'ListView',
    packageName: '@rnstorybook/list-view',
    version: '0.1.0',
    description:
      'FlatList wrapper with loading/error/empty/success states, pull-to-refresh, and infinite scroll load-more.',
    tags: ['list', 'flatlist', 'pagination', 'refresh', 'infinite-scroll'],
    category: 'Layout',
    installCommand: 'npm install @rnstorybook/list-view',
    usage: `import { ListView } from '@rnstorybook/list-view';

<ListView
  items={packages}
  status={status}
  onRefresh={refetch}
  isRefreshing={isRefreshing}
  hasMore={hasMore}
  onLoadMore={fetchNextPage}
  keyExtractor={(item) => item.id}
  renderItem={(item) => <PackageRow item={item} />}
/>`,
  },
  {
    slug: 'page-view',
    name: 'PageView',
    packageName: '@rnstorybook/page-view',
    version: '0.1.0',
    description:
      'Swipeable paginated container with slide/fade/scale transitions, dots, arrows, and rubber-band boundaries.',
    tags: ['pagination', 'carousel', 'pager', 'gesture'],
    category: 'Layout',
    installCommand: 'npm install @rnstorybook/page-view',
    usage: `import { PageView } from '@rnstorybook/page-view';

<PageView
  pages={[<Slide1 />, <Slide2 />, <Slide3 />]}
  transition="slide"
  activeIndex={index}
  onChange={setIndex}
/>`,
  },
  {
    slug: 'popup-window',
    name: 'PopupWindow',
    packageName: '@rnstorybook/popup-window',
    version: '0.1.0',
    description:
      'Anchored popup/menu panel with auto-flip positioning, outside-tap dismiss, and disabled trigger support.',
    tags: ['popup', 'popover', 'menu', 'dropdown', 'anchor'],
    category: 'Overlays',
    installCommand: 'npm install @rnstorybook/popup-window',
    usage: `import { useRef, useState } from 'react';
import { PopupWindow } from '@rnstorybook/popup-window';

const anchorRef = useRef(null);
const [open, setOpen] = useState(false);

<button ref={anchorRef} onClick={() => setOpen(true)}>Menu</button>
<PopupWindow open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
  <MenuItem>Edit</MenuItem>
</PopupWindow>`,
  },
  {
    slug: 'preview',
    name: 'Preview',
    packageName: '@rnstorybook/preview',
    version: '0.1.0',
    description:
      'Image preview box with loading skeleton, error/retry state, empty state, and tap-to-zoom fullscreen lightbox.',
    tags: ['image', 'media', 'zoom', 'lightbox', 'loading'],
    category: 'Display',
    installCommand: 'npm install @rnstorybook/preview',
    usage: `import { Preview } from '@rnstorybook/preview';

<Preview
  source={{ uri: photo.url }}
  accessibilityLabel="Package screenshot"
  zoomable
/>`,
  },
  {
    slug: 'radio-group',
    name: 'RadioGroup',
    packageName: '@rnstorybook/radio-group',
    version: '0.1.0',
    description:
      'Single-select radio group with per-option disable, animated dot, focus ring, and group-level error state.',
    tags: ['radio', 'form', 'toggle', 'radiogroup'],
    category: 'Inputs',
    installCommand: 'npm install @rnstorybook/radio-group',
    usage: `import { RadioGroup } from '@rnstorybook/radio-group';

<RadioGroup
  label="Plan"
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
  ]}
  value={plan}
  onChange={setPlan}
/>`,
  },
  {
    slug: 'scroll-view',
    name: 'ScrollView',
    packageName: '@rnstorybook/scroll-view',
    version: '0.1.0',
    description:
      'Scroll container with top/bottom overflow shadows and an animated scroll-to-top button.',
    tags: ['scroll', 'layout', 'container'],
    category: 'Layout',
    installCommand: 'npm install @rnstorybook/scroll-view',
    usage: `import { ScrollView } from '@rnstorybook/scroll-view';

<ScrollView height={320}>
  {items.map((item) => <Row key={item.id} item={item} />)}
</ScrollView>`,
  },
  {
    slug: 'search-bar',
    name: 'SearchBar',
    packageName: '@rnstorybook/search-bar',
    version: '0.1.0',
    description:
      'Debounced search input with suggestion list, loading/empty/error/disabled states, and clear button.',
    tags: ['search', 'input', 'autocomplete', 'form'],
    category: 'Inputs',
    installCommand: 'npm install @rnstorybook/search-bar',
    usage: `import { SearchBar } from '@rnstorybook/search-bar';

<SearchBar
  value={query}
  onChange={setQuery}
  onSearch={fetchResults}
  suggestions={suggestions}
  isLoading={isLoading}
  onSelectSuggestion={(s) => setQuery(s.label)}
/>`,
  },
  {
    slug: 'segmented-control',
    name: 'SegmentedControl',
    packageName: '@rnstorybook/segmented-control',
    version: '0.1.0',
    description:
      'iOS-style segmented control with animated sliding indicator, per-segment disable, and keyboard/roving-focus navigation.',
    tags: ['segment', 'tabs', 'toggle', 'radiogroup'],
    category: 'Inputs',
    installCommand: 'npm install @rnstorybook/segmented-control',
    usage: `import { SegmentedControl } from '@rnstorybook/segmented-control';

<SegmentedControl
  options={[
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
  ]}
  value={filter}
  onChange={setFilter}
/>`,
  },
  {
    slug: 'snackbar',
    name: 'Snackbar',
    packageName: '@rnstorybook/snackbar',
    version: '0.1.0',
    description:
      'Queued toast notifications with success/error variants, undo actions, and safe-area aware stacking.',
    tags: ['toast', 'notification', 'feedback', 'queue'],
    category: 'Feedback',
    installCommand: 'npm install @rnstorybook/snackbar',
    usage: `import { SnackbarProvider, useSnackbar } from '@rnstorybook/snackbar';

const { showSnackbar } = useSnackbar();
showSnackbar('Component archived.', { actionLabel: 'Undo', onAction: undo });`,
  },
  {
    slug: 'stack',
    name: 'Stack',
    packageName: '@rnstorybook/stack',
    version: '0.1.0',
    description:
      'Flexbox layout primitive for arranging children in a row or column with spacing, alignment, wrap, and optional dividers.',
    tags: ['layout', 'flexbox', 'spacing', 'divider'],
    category: 'Layout',
    installCommand: 'npm install @rnstorybook/stack',
    usage: `import { Stack } from '@rnstorybook/stack';

<Stack direction="row" spacing="md" divider>
  <Avatar />
  <UserInfo />
</Stack>`,
  },
  {
    slug: 'switch',
    name: 'Switch',
    packageName: '@rnstorybook/switch',
    version: '0.1.0',
    description:
      'Toggle switch with off/on/disabled/loading/error states and animated thumb.',
    tags: ['switch', 'toggle', 'form'],
    category: 'Inputs',
    installCommand: 'npm install @rnstorybook/switch',
    usage: `import { Switch } from '@rnstorybook/switch';

<Switch
  label="Notifications"
  checked={enabled}
  onChange={setEnabled}
/>`,
  },
  {
    slug: 'tab-navigation',
    name: 'TabNavigation',
    packageName: '@rnstorybook/tab-navigation',
    version: '0.1.0',
    description:
      'Scrollable tab bar with animated underline indicator, badges, and disabled tab support.',
    tags: ['tabs', 'navigation', 'indicator', 'badge'],
    category: 'Navigation',
    installCommand: 'npm install @rnstorybook/tab-navigation',
    usage: `import { TabNavigation } from '@rnstorybook/tab-navigation';

<TabNavigation
  tabs={[
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active', badge: 3 },
    { value: 'archived', label: 'Archived', disabled: true },
  ]}
  value={tab}
  onChange={setTab}
/>`,
  },
  {
    slug: 'table-view',
    name: 'TableView',
    packageName: '@rnstorybook/table-view',
    version: '0.1.0',
    description:
      'Sortable data table with selectable/pressable rows, loading skeleton, error/retry, and empty states.',
    tags: ['table', 'data', 'sort', 'list'],
    category: 'Layout',
    installCommand: 'npm install @rnstorybook/table-view',
    usage: `import { TableView } from '@rnstorybook/table-view';

<TableView
  columns={[
    { key: 'name', header: 'Name', sortable: true, render: (r) => r.name },
    { key: 'downloads', header: 'Downloads', sortable: true, render: (r) => r.downloads },
  ]}
  rows={packages}
  rowKey={(r) => r.id}
  status="success"
/>`,
  },
];

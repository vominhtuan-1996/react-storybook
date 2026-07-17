import { useState } from 'react';
import type { RnStorybookPackage } from '@/data/packages';
import { CopyInstallCommand } from './CopyInstallCommand';
import { AnimationPlayground } from './playgrounds/AnimationPlayground';
import { ButtonPlayground } from './playgrounds/ButtonPlayground';
import { CardPlayground } from './playgrounds/CardPlayground';
import { CarouselPlayground } from './playgrounds/CarouselPlayground';
import { CheckboxPlayground } from './playgrounds/CheckboxPlayground';
import { ChipPlayground } from './playgrounds/ChipPlayground';
import { ComboboxPlayground } from './playgrounds/ComboboxPlayground';
import { DialogPlayground } from './playgrounds/DialogPlayground';
import { ExpandPlayground } from './playgrounds/ExpandPlayground';
import { FastListPlayground } from './playgrounds/FastListPlayground';
import { GridViewPlayground } from './playgrounds/GridViewPlayground';
import { ListViewPlayground } from './playgrounds/ListViewPlayground';
import { PageViewPlayground } from './playgrounds/PageViewPlayground';
import { PopupWindowPlayground } from './playgrounds/PopupWindowPlayground';
import { PreviewPlayground } from './playgrounds/PreviewPlayground';
import { RadioGroupPlayground } from './playgrounds/RadioGroupPlayground';
import { ScrollViewPlayground } from './playgrounds/ScrollViewPlayground';
import { SearchBarPlayground } from './playgrounds/SearchBarPlayground';
import { SegmentedControlPlayground } from './playgrounds/SegmentedControlPlayground';
import { SnackbarPlayground } from './playgrounds/SnackbarPlayground';
import { StackPlayground } from './playgrounds/StackPlayground';
import { SwitchPlayground } from './playgrounds/SwitchPlayground';
import { TabNavigationPlayground } from './playgrounds/TabNavigationPlayground';
import { TableViewPlayground } from './playgrounds/TableViewPlayground';

const playgroundBySlug: Record<string, React.ComponentType> = {
  animation: AnimationPlayground,
  button: ButtonPlayground,
  card: CardPlayground,
  carousel: CarouselPlayground,
  checkbox: CheckboxPlayground,
  chip: ChipPlayground,
  combobox: ComboboxPlayground,
  dialog: DialogPlayground,
  expand: ExpandPlayground,
  'fast-list': FastListPlayground,
  'grid-view': GridViewPlayground,
  'list-view': ListViewPlayground,
  'page-view': PageViewPlayground,
  'popup-window': PopupWindowPlayground,
  preview: PreviewPlayground,
  'radio-group': RadioGroupPlayground,
  'scroll-view': ScrollViewPlayground,
  'search-bar': SearchBarPlayground,
  'segmented-control': SegmentedControlPlayground,
  snackbar: SnackbarPlayground,
  stack: StackPlayground,
  switch: SwitchPlayground,
  'tab-navigation': TabNavigationPlayground,
  'table-view': TableViewPlayground,
};

export const PackageCard = ({ pkg }: { pkg: RnStorybookPackage }) => {
  const [showUsage, setShowUsage] = useState(false);
  const Playground = playgroundBySlug[pkg.slug];

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
      <div className="border-b border-slate-800">
        <div className="flex items-center gap-1.5 border-b border-slate-800/80 bg-slate-900/80 px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-xs font-medium text-slate-400">
            Live preview &middot; edit props below
          </span>
        </div>
        {Playground ? (
          <Playground />
        ) : (
          <div className="flex h-44 items-center justify-center text-sm text-slate-600">
            Preview unavailable
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-white">{pkg.name}</h3>
          <span className="shrink-0 rounded-full border border-slate-700 px-2 py-0.5 text-xs font-medium text-slate-400">
            v{pkg.version}
          </span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {pkg.description}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
          {pkg.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <CopyInstallCommand command={pkg.installCommand} />
        </div>

        <button
          type="button"
          onClick={() => setShowUsage((prev) => !prev)}
          aria-expanded={showUsage}
          className="mt-3 flex h-9 cursor-pointer items-center justify-center rounded-md text-xs font-semibold text-emerald-400 transition-colors duration-150 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          {showUsage ? 'Hide usage' : 'View usage'}
        </button>

        {showUsage && (
          <pre className="mt-1 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs leading-relaxed text-slate-300">
            <code>{pkg.usage}</code>
          </pre>
        )}
      </div>
    </article>
  );
};

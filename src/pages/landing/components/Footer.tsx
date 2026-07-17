import { PackageIcon } from './icons';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2 text-slate-400">
          <PackageIcon className="h-5 w-5" />
          <span className="text-sm font-medium">RN Storybook Hub</span>
        </div>
        <p className="text-sm text-slate-500">
          Internal tool &middot; not for external distribution
        </p>
      </div>
    </footer>
  );
};

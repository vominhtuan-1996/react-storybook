import { Link } from 'react-router-dom';
import { PackageIcon } from '@/pages/landing/components/icons';

export const PackagesHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link to="/" className="flex items-center gap-2 text-slate-50">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
            <PackageIcon className="h-5 w-5" />
          </span>
          <span className="text-base font-bold tracking-tight">
            RN Storybook Hub
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Home
          </Link>
          <span
            aria-current="page"
            className="text-sm font-semibold text-emerald-400"
          >
            Packages
          </span>
        </div>
      </nav>
    </header>
  );
};

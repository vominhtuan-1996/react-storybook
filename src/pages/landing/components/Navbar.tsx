import { Link } from 'react-router-dom';
import { PackageIcon } from './icons';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className="flex min-w-0 shrink items-center gap-2 text-slate-50"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
            <PackageIcon className="h-5 w-5" />
          </span>
          <span className="truncate whitespace-nowrap text-base font-bold tracking-tight">
            <span className="md:hidden">RN Storybook</span>
            <span className="hidden md:inline">RN Storybook Hub</span>
          </span>
        </a>

        <Link
          to="/packages"
          className="shrink-0 whitespace-nowrap text-sm font-medium text-slate-300 transition-colors hover:text-white md:hidden"
        >
          Packages
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/packages"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Packages
          </Link>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            How it works
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Features
          </a>
          <a
            href="#for-teams"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            For teams
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href="#login"
            className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white sm:inline-flex"
          >
            Log in
          </a>
          <a
            href="#get-started"
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-slate-950 shadow-sm shadow-emerald-500/20 transition-colors duration-150 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
};

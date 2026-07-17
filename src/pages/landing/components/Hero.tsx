import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './icons';

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(34,197,94,0.16),transparent)]"
      />

      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-emerald-400">
          Internal platform for React Native teams
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Publish, search, and ship{' '}
          <span className="text-emerald-400">Storybook packages</span> in one
          place
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
          RN Storybook Hub is the internal portal to publish, search, preview
          and download <code className="text-slate-200">.rnstorybook</code>{' '}
          packages — so mobile developers stop rebuilding components that
          already exist.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/packages"
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 text-sm font-semibold text-slate-950 shadow-sm shadow-emerald-500/20 transition-all duration-150 hover:bg-emerald-400 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
          >
            Browse the hub
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-6 text-sm font-semibold text-slate-200 transition-colors duration-150 hover:bg-slate-800 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
          >
            See how it works
          </a>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Backed by Supabase Storage &amp; Postgres — no separate registry to
          maintain.
        </p>
      </div>
    </section>
  );
};

import { ArrowRightIcon } from './icons';

export const CtaSection = () => {
  return (
    <section
      id="for-teams"
      className="border-t border-slate-800/80 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-14 text-center sm:px-12">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Stop shipping duplicate components
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">
          Connect your build pipeline to the Hub and give every mobile
          developer a single source of truth for shared UI.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a
            id="get-started"
            href="#top"
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 text-sm font-semibold text-slate-950 shadow-sm shadow-emerald-500/20 transition-all duration-150 hover:bg-emerald-400 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
          >
            Get started
            <ArrowRightIcon className="h-4 w-4" />
          </a>
          <a
            href="#login"
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-slate-700 px-6 text-sm font-semibold text-slate-200 transition-colors duration-150 hover:bg-slate-800 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
          >
            Talk to your platform team
          </a>
        </div>
      </div>
    </section>
  );
};

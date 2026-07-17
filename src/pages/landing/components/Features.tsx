import type { ComponentType, SVGProps } from 'react';
import { SearchIcon, ShieldIcon, BoltIcon, EyeIcon } from './icons';

interface Feature {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: SearchIcon,
    title: 'Instant search',
    description:
      'Find any component by name, version, or tag across every team publishing to the Hub.',
  },
  {
    icon: EyeIcon,
    title: 'Live preview',
    description:
      'Inspect a component visually before downloading — no need to install it just to check it.',
  },
  {
    icon: ShieldIcon,
    title: 'Auth & storage built-in',
    description:
      'Supabase Auth gates access by team; Supabase Storage keeps every .tgz version retrievable.',
  },
  {
    icon: BoltIcon,
    title: 'Edge Function ingestion',
    description:
      'Uploads are validated and indexed through a Supabase Edge Function, so metadata and files stay in sync.',
  },
];

export const Features = () => {
  return (
    <section
      id="features"
      className="border-t border-slate-800/80 bg-slate-900/40 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for how mobile teams actually work
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Everything the Hub needs, nothing it doesn't.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

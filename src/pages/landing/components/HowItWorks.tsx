import type { ComponentType, SVGProps } from 'react';
import {
  PackageIcon,
  SearchIcon,
  EyeIcon,
  DownloadIcon,
} from './icons';

interface Step {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: PackageIcon,
    title: 'Generate & build',
    description:
      'Run the RN Storybook Generator on your component, then build it into a versioned component-x.y.z.tgz package.',
  },
  {
    icon: SearchIcon,
    title: 'Upload & search',
    description:
      'Upload the package to the Hub. It lands in Supabase Storage and Database, instantly searchable by name and version.',
  },
  {
    icon: EyeIcon,
    title: 'Preview',
    description:
      'Browse component previews directly in the Hub before pulling anything into your app.',
  },
  {
    icon: DownloadIcon,
    title: 'Download & reuse',
    description:
      'Mobile developers download the exact version they need — no duplicated components across repos.',
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="border-t border-slate-800/80 bg-slate-950 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From component to catalog, in four steps
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            One pipeline connects your Storybook build to every mobile
            developer on the team.
          </p>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-6"
              >
                <span className="text-xs font-semibold text-emerald-400">
                  Step {index + 1}
                </span>
                <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

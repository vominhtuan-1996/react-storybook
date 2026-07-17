import { packages } from '@/data/packages';
import { PackagesHeader } from './components/PackagesHeader';
import { PackageCard } from './components/PackageCard';

export const PackagesPage = () => {
  return (
    <div className="min-h-dvh bg-slate-950 font-sans text-slate-50 antialiased">
      <PackagesHeader />

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Packages
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-400">
            {packages.length} published component{packages.length === 1 ? '' : 's'}.
            Install directly, or browse the source in{' '}
            <code className="text-slate-300">packages/</code>.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </main>
    </div>
  );
};

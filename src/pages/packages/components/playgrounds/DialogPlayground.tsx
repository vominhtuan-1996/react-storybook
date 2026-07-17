import { useState } from 'react';
import { Dialog } from '@/components/ui/Dialog';
import type { DialogVariant } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

const variants: DialogVariant[] = ['confirmation', 'success', 'error', 'warning'];

const defaultsByVariant: Record<DialogVariant, { title: string; description: string }> = {
  confirmation: {
    title: 'Delete component-button-1.2.0.tgz?',
    description: 'This removes the package from Storage and Database.',
  },
  success: {
    title: 'Package published',
    description: 'component-button-1.2.0.tgz is now live on the Hub.',
  },
  error: {
    title: 'Upload failed',
    description: 'Could not reach Supabase Storage. Check your connection and retry.',
  },
  warning: {
    title: 'Breaking change detected',
    description: 'This version changes the public API. Downstream apps may need updates.',
  },
};

export const DialogPlayground = () => {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<DialogVariant>('confirmation');
  const [title, setTitle] = useState(defaultsByVariant.confirmation.title);
  const [description, setDescription] = useState(
    defaultsByVariant.confirmation.description,
  );
  const [showFooter, setShowFooter] = useState(true);

  const handleVariantChange = (next: DialogVariant) => {
    setVariant(next);
    setTitle(defaultsByVariant[next].title);
    setDescription(defaultsByVariant[next].description);
  };

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[140px] items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs">
        <label className="flex flex-col gap-1">
          <span className="text-slate-500">Variant</span>
          <select
            value={variant}
            onChange={(e) => handleVariantChange(e.target.value as DialogVariant)}
            className="h-8 rounded-md border border-slate-700 bg-slate-950 px-2 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {variants.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-slate-500">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={60}
            className="h-8 rounded-md border border-slate-700 bg-slate-950 px-2 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-slate-500">Description</span>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={120}
            className="h-8 rounded-md border border-slate-700 bg-slate-950 px-2 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          />
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={showFooter}
            onChange={(e) => setShowFooter(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Show footer actions
        </label>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title={title || 'Dialog title'}
        description={description}
        variant={variant}
        footer={
          showFooter ? (
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </>
          ) : undefined
        }
      />
    </div>
  );
};

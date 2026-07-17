import { useState } from 'react';
import { useSnackbar } from '@/components/ui/SnackbarProvider';
import { Button } from '@/components/ui/Button';

export const SnackbarPlayground = () => {
  const { showSnackbar } = useSnackbar();
  const [message, setMessage] = useState('Component archived.');
  const [withAction, setWithAction] = useState(true);

  const trigger = (variant: 'default' | 'success' | 'error') => {
    showSnackbar(message || 'Notification', {
      variant,
      actionLabel: withAction ? 'Undo' : undefined,
      onAction: withAction ? () => {} : undefined,
    });
  };

  return (
    <div className="flex w-full flex-col gap-4 bg-slate-950 p-4">
      <div className="flex min-h-[140px] flex-wrap items-center justify-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <Button size="sm" variant="secondary" onClick={() => trigger('default')}>
          Default
        </Button>
        <Button size="sm" variant="secondary" onClick={() => trigger('success')}>
          Success
        </Button>
        <Button size="sm" variant="secondary" onClick={() => trigger('error')}>
          Error
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs">
        <label className="flex flex-col gap-1">
          <span className="text-slate-500">Message</span>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={80}
            className="h-8 rounded-md border border-slate-700 bg-slate-950 px-2 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          />
        </label>

        <label className="flex items-center gap-2 text-slate-400">
          <input
            type="checkbox"
            checked={withAction}
            onChange={(e) => setWithAction(e.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Include Undo action
        </label>
      </div>
    </div>
  );
};

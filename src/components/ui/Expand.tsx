import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode, SVGProps } from 'react';

interface ExpandProps {
  title: ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const ChevronIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export const Expand = ({
  title,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onToggle,
  disabled = false,
  className = '',
}: ExpandProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const [height, setHeight] = useState<number | 'auto'>(open ? 'auto' : 0);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const panelId = useId();

  const toggle = () => {
    if (disabled) return;
    const next = !open;
    if (!isControlled) setInternalOpen(next);
    onToggle?.(next);
  };

  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    if (reducedMotion) {
      setHeight(open ? 'auto' : 0);
      return;
    }

    if (open) {
      const target = node.scrollHeight;
      setHeight(target);
      const timer = setTimeout(() => setHeight('auto'), 220);
      return () => clearTimeout(timer);
    }

    if (height === 'auto') {
      setHeight(node.scrollHeight);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0));
      });
    } else {
      setHeight(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reducedMotion]);

  return (
    <div
      className={`overflow-hidden rounded-lg border border-slate-800 bg-slate-900/40 ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-expanded={open}
        aria-controls={panelId}
        className={`flex h-11 w-full items-center justify-between gap-2 px-4 text-left text-sm font-medium text-slate-200 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400 ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-slate-800/60'
        }`}
      >
        <span className="min-w-0 flex-1 truncate">{title}</span>
        <ChevronIcon
          className={`shrink-0 text-slate-400 transition-transform duration-200 motion-reduce:transition-none ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        id={panelId}
        role="region"
        style={{
          height: height === 'auto' ? 'auto' : height,
          transition: reducedMotion ? undefined : 'height 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="border-t border-slate-800 px-4 py-3 text-sm leading-relaxed text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
};

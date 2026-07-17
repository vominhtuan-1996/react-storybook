import { useEffect, useRef, useState } from 'react';
import type { SVGProps } from 'react';
import { createPortal } from 'react-dom';

export interface PreviewProps {
  src?: string;
  alt: string;
  aspectRatio?: string;
  zoomable?: boolean;
  className?: string;
}

type LoadStatus = 'loading' | 'success' | 'error';

const ImageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={28}
    height={28}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const AlertIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5" />
    <path d="M12 16h.01" />
  </svg>
);

const RetryIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M3 12a9 9 0 1 1 2.6 6.4" />
    <path d="M3 21v-6h6" />
  </svg>
);

const ZoomInIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
    <path d="M11 8v6" />
    <path d="M8 11h6" />
  </svg>
);

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
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

export const Preview = ({ src, alt, aspectRatio = '4 / 3', zoomable = true, className = '' }: PreviewProps) => {
  const [status, setStatus] = useState<LoadStatus>(src ? 'loading' : 'error');
  const [attempt, setAttempt] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isEmpty = !src;
  const resolvedSrc = src ? (attempt > 0 ? `${src}${src.includes('?') ? '&' : '?'}retry=${attempt}` : src) : undefined;

  useEffect(() => {
    if (!resolvedSrc) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    const image = new Image();
    image.onload = () => setStatus('success');
    image.onerror = () => setStatus('error');
    image.src = resolvedSrc;
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [resolvedSrc]);

  useEffect(() => {
    if (!zoomed) return;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [zoomed]);

  const openZoom = () => {
    if (zoomable && status === 'success') setZoomed(true);
  };

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 ${className}`}
        style={{ aspectRatio }}
      >
        {!isEmpty && status === 'success' && (
          <img
            src={resolvedSrc}
            alt={alt}
            className="h-full w-full object-cover opacity-100 transition-opacity duration-200"
          />
        )}

        {status === 'loading' && !isEmpty && (
          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-slate-800/60 ${reducedMotion ? '' : 'animate-pulse'}`}
          />
        )}

        {status === 'error' && !isEmpty && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-slate-500">
            <AlertIcon className="text-red-400" />
            <p className="text-center text-xs text-slate-400">Failed to load image</p>
            <button
              type="button"
              onClick={() => setAttempt((a) => a + 1)}
              className="mt-1 -m-2 flex h-9 cursor-pointer items-center gap-1.5 rounded-md px-3 text-xs font-medium text-emerald-400 transition-colors duration-150 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <RetryIcon />
              Retry
            </button>
          </div>
        )}

        {isEmpty && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-600">
            <ImageIcon />
            <p className="text-xs text-slate-500">No image</p>
          </div>
        )}

        {zoomable && status === 'success' && (
          <button
            ref={triggerRef}
            type="button"
            onClick={openZoom}
            aria-label="Zoom image"
            className="absolute bottom-2 right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-950/80 text-slate-200 opacity-0 backdrop-blur transition-opacity duration-150 hover:bg-slate-800 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 group-hover:opacity-100"
          >
            <ZoomInIcon />
          </button>
        )}
      </div>

      {zoomed &&
        resolvedSrc &&
        createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div
              aria-hidden="true"
              onClick={() => setZoomed(false)}
              className={`absolute inset-0 bg-slate-950/90 backdrop-blur-sm ${
                reducedMotion ? '' : 'animate-dialog-backdrop-in'
              }`}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              className={`relative max-h-full max-w-full ${reducedMotion ? '' : 'animate-dialog-panel-in'}`}
            >
              <img src={resolvedSrc} alt={alt} className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain" />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setZoomed(false)}
                aria-label="Close zoomed image"
                className="absolute -top-3 -right-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-slate-900 text-slate-200 shadow-lg transition-colors duration-150 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <CloseIcon />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

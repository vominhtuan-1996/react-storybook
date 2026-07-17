import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';

export type PopupPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export interface PopupWindowProps {
  open: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLElement>;
  placement?: PopupPlacement;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

interface Position {
  top: number;
  left: number;
  placement: PopupPlacement;
}

const GAP = 8;
const VIEWPORT_MARGIN = 8;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function computePosition(
  anchor: HTMLElement,
  panel: HTMLElement,
  placement: PopupPlacement,
): Position {
  const anchorRect = anchor.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const wantsTop = placement.startsWith('top');
  const wantsEnd = placement.endsWith('end');

  let top = wantsTop
    ? anchorRect.top - panelRect.height - GAP
    : anchorRect.bottom + GAP;
  let resolvedPlacement: PopupPlacement = placement;

  const fitsBelow = anchorRect.bottom + GAP + panelRect.height <= vh - VIEWPORT_MARGIN;
  const fitsAbove = anchorRect.top - GAP - panelRect.height >= VIEWPORT_MARGIN;

  if (wantsTop && !fitsAbove && fitsBelow) {
    top = anchorRect.bottom + GAP;
    resolvedPlacement = wantsEnd ? 'bottom-end' : 'bottom-start';
  } else if (!wantsTop && !fitsBelow && fitsAbove) {
    top = anchorRect.top - panelRect.height - GAP;
    resolvedPlacement = wantsEnd ? 'top-end' : 'top-start';
  }

  let left = wantsEnd ? anchorRect.right - panelRect.width : anchorRect.left;
  left = Math.min(
    Math.max(left, VIEWPORT_MARGIN),
    vw - panelRect.width - VIEWPORT_MARGIN,
  );
  top = Math.min(Math.max(top, VIEWPORT_MARGIN), vh - panelRect.height - VIEWPORT_MARGIN);

  return { top, left, placement: resolvedPlacement };
}

export const PopupWindow = ({
  open,
  onClose,
  anchorRef,
  placement = 'bottom-start',
  disabled = false,
  children,
  className = '',
}: PopupWindowProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerFocusRef = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  const recalculate = useCallback(() => {
    const anchor = anchorRef.current;
    const panel = panelRef.current;
    if (!anchor || !panel) return;
    setPosition(computePosition(anchor, panel, placement));
  }, [anchorRef, placement]);

  useLayoutEffect(() => {
    if (!open || disabled) {
      setPosition(null);
      return;
    }
    recalculate();
  }, [open, disabled, recalculate]);

  useEffect(() => {
    if (!open || disabled) return;

    triggerFocusRef.current = document.activeElement as HTMLElement;
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
      FOCUSABLE_SELECTOR,
    );
    (firstFocusable ?? panelRef.current)?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        anchorRef.current?.contains(target)
      ) {
        return;
      }
      onClose();
    };

    const handleReposition = () => recalculate();

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
      triggerFocusRef.current?.focus();
    };
  }, [open, disabled, onClose, anchorRef, recalculate]);

  if (!open || disabled) return null;

  const originClass = position?.placement.startsWith('top')
    ? 'origin-bottom'
    : 'origin-top';

  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      tabIndex={-1}
      className={`fixed z-[1000] min-w-[180px] rounded-lg border border-slate-800 bg-slate-900 p-2 shadow-xl shadow-black/40 outline-none transition-opacity duration-150 ${originClass} ${
        position ? 'animate-popup-in opacity-100' : 'opacity-0'
      } ${className}`}
      style={{
        top: position?.top ?? 0,
        left: position?.left ?? 0,
        visibility: position ? 'visible' : 'hidden',
      }}
    >
      {children}
    </div>,
    document.body,
  );
};

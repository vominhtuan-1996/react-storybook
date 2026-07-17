import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

const GAP_ABOVE_KEYBOARD = 12;

function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Lifts `elementRef` above the on-screen keyboard on mobile browsers while
 * `active` is true, using the VisualViewport API. Returns 0 when the
 * keyboard isn't covering the element, on desktop, or once inactive —
 * callers apply it as a translateY so the field animates back to its
 * original position on blur/keyboard dismiss.
 */
export function useKeyboardAvoidance(
  elementRef: RefObject<HTMLElement>,
  active: boolean,
): { offset: number; reducedMotion: boolean } {
  const [offset, setOffset] = useState(0);
  const reducedMotion = getPrefersReducedMotion();

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!active || !viewport) {
      setOffset(0);
      return;
    }

    const recalculate = () => {
      const el = elementRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const keyboardTop = viewport.height + viewport.offsetTop;
      const overlap = rect.bottom - keyboardTop;

      setOffset(overlap > 0 ? overlap + GAP_ABOVE_KEYBOARD : 0);
    };

    recalculate();
    viewport.addEventListener('resize', recalculate);
    viewport.addEventListener('scroll', recalculate);

    return () => {
      viewport.removeEventListener('resize', recalculate);
      viewport.removeEventListener('scroll', recalculate);
      setOffset(0);
    };
  }, [active, elementRef]);

  return { offset, reducedMotion };
}

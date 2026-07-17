import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

export type AnimationVariant = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'bounce';

export type AnimationEasingPreset = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'back' | 'anticipate';

export type AnimationEasing = AnimationEasingPreset | [number, number, number, number];

export type AnimationPhase = 'exited' | 'entering' | 'entered' | 'exiting';

export interface AnimationProps {
  show: boolean;
  children: ReactNode;
  variant?: AnimationVariant;
  duration?: number;
  easing?: AnimationEasing;
  exitDuration?: number;
  unmountOnExit?: boolean;
  onEntered?: () => void;
  onExited?: () => void;
  className?: string;
}

const easingPresets: Record<AnimationEasingPreset, string> = {
  linear: 'cubic-bezier(0, 0, 1, 1)',
  ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
  'ease-out': 'cubic-bezier(0, 0, 0.58, 1)',
  'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
  back: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  anticipate: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
};

function resolveEasing(easing: AnimationEasing): string {
  if (Array.isArray(easing)) {
    const [x1, y1, x2, y2] = easing;
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  }
  return easingPresets[easing];
}

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

const hiddenTransform: Record<AnimationVariant, string> = {
  fade: 'none',
  'slide-up': 'translateY(16px)',
  'slide-down': 'translateY(-16px)',
  'slide-left': 'translateX(16px)',
  'slide-right': 'translateX(-16px)',
  scale: 'scale(0.92)',
  bounce: 'scale(0.85)',
};

export const Animation = ({
  show,
  children,
  variant = 'fade',
  duration = 250,
  easing = 'ease-out',
  exitDuration,
  unmountOnExit = true,
  onEntered,
  onExited,
  className = '',
}: AnimationProps) => {
  const [phase, setPhase] = useState<AnimationPhase>(show ? 'entered' : 'exited');
  const reducedMotion = usePrefersReducedMotion();
  const rafRef = useRef<number>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const effectiveExitDuration = exitDuration ?? Math.round(duration * 0.7);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current ?? 0);
    clearTimeout(timeoutRef.current);

    if (reducedMotion) {
      setPhase(show ? 'entered' : 'exited');
      if (show) onEntered?.();
      else onExited?.();
      return;
    }

    if (show) {
      setPhase('entering');
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => {
          setPhase('entered');
        });
      });
      timeoutRef.current = setTimeout(() => onEntered?.(), duration);
    } else {
      setPhase((p) => (p === 'exited' ? 'exited' : 'exiting'));
      timeoutRef.current = setTimeout(() => {
        setPhase('exited');
        onExited?.();
      }, effectiveExitDuration);
    }

    return () => {
      cancelAnimationFrame(rafRef.current ?? 0);
      clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, reducedMotion]);

  if (phase === 'exited' && unmountOnExit) return null;

  const visible = phase === 'entered';
  const activeDuration = phase === 'exiting' ? effectiveExitDuration : duration;

  const style: CSSProperties = reducedMotion
    ? { opacity: show ? 1 : 0 }
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : hiddenTransform[variant],
        transition: `opacity ${activeDuration}ms ${resolveEasing(easing)}, transform ${activeDuration}ms ${resolveEasing(easing)}`,
      };

  return (
    <div
      className={className}
      style={style}
      data-animation-phase={phase}
      aria-hidden={phase === 'exited' || phase === 'exiting' ? true : undefined}
    >
      {children}
    </div>
  );
};

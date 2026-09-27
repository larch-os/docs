'use client';

import { useEffect, useRef, useState } from 'react';

type Direction = 'up' | 'left' | 'right';

const HIDDEN_TRANSFORM: Record<Direction, string> = {
  up: 'translate-y-6 opacity-0',
  left: '-translate-x-12 opacity-0',
  right: 'translate-x-12 opacity-0',
};

export function Reveal({
  children,
  delay = 0,
  duration = 420,
  direction = 'up',
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Visible by default: correct with no JS, and avoids a flash-hidden state
  // before hydration runs.
  const [visible, setVisible] = useState(true);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyInView) return;

    setAnimated(true);
    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${
        animated ? 'transition-[opacity,transform] ease-out' : ''
      } ${visible ? 'translate-x-0 translate-y-0 opacity-100' : HIDDEN_TRANSFORM[direction]} ${className ?? ''}`}
      style={animated ? { transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` } : undefined}
    >
      {children}
    </div>
  );
}

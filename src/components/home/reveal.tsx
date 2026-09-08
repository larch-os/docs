'use client';

import { useEffect, useRef, useState } from 'react';

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
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
        animated ? 'transition-[opacity,transform] duration-[420ms] ease-out' : ''
      } ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${className ?? ''}`}
      style={animated ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

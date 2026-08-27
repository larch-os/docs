'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export function useIntersection<T extends HTMLElement>(threshold = 0.25, once = true) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  const setRef = useCallback(
    (node: T | null) => {
      ref.current = node;
    },
    [],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visible && once) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once, visible]);

  return { ref: setRef, visible, innerRef: ref };
}

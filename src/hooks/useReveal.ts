import { useEffect, useRef, useState } from 'react';

type Options = { threshold?: number; once?: boolean };

/** Returns [ref, visible]. visible flips true when the element enters the viewport. */
export function useReveal<T extends HTMLElement>({ threshold = 0.2, once = true }: Options = {}) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    let gotCallback = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        gotCallback = true;
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold },
    );
    io.observe(el);
    // A working IO always delivers an initial callback. If none arrives
    // (hidden tab, prerender, broken embedder), reveal rather than stay blank.
    const fallback = window.setTimeout(() => { if (!gotCallback) setVisible(true); }, 1200);
    return () => { io.disconnect(); clearTimeout(fallback); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, visible] as const;
}

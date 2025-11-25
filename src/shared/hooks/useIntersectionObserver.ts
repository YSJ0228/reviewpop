import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [frozen, setFrozen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const frozenEntry = entry;

  useEffect(() => {
    const node = ref.current;
    const hasIOSupport = !!window.IntersectionObserver;
  });
}

import { MutableRefObject, useEffect, useRef } from 'react';

const useInfiniteScroll = (updatePageNumber: () => void): {
  containerRef: MutableRefObject<HTMLTableElement | null>;
  containerBottomRef: MutableRefObject<HTMLDivElement | null>;
} => {
  const containerRef = useRef<HTMLTableElement | null>(null);
  const containerBottomRef = useRef<HTMLDivElement | null>(null);

  // When user reaches the bottom of the table updatePageNumber() is called.
  useEffect(() => {
    if (containerRef.current) {
      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio > 0) {
            updatePageNumber();
          }
        },
        { rootMargin: '0px', threshold: [1] },
      );
      if (containerBottomRef.current) {
        intersectionObserver.observe(containerBottomRef.current as Element);
      }
      return () => {
        intersectionObserver.disconnect();
      };
    }
    return undefined;
  }, [containerBottomRef, containerRef, updatePageNumber]);

  return { containerRef, containerBottomRef };
};

export default useInfiniteScroll;

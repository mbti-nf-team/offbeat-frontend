import { useEffect, useMemo, useRef } from 'react';
import { IntersectionOptions, useInView } from 'react-intersection-observer';

import { InfiniteRefState } from '@/lib/types';
import { targetFalseThenValue } from '@/utils';

interface UseIntersectionObserverProps {
  intersectionOptions?: IntersectionOptions;
  isRoot?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
}

function useIntersectionObserver<T = Element>({
  intersectionOptions, isRoot, hasNextPage, fetchNextPage,
}: UseIntersectionObserverProps): InfiniteRefState<T> {
  const wrapperRef = useRef<T>(null);

  const checkRoot = targetFalseThenValue(isRoot);

  const { ref, inView } = useInView({
    ...intersectionOptions,
    skip: !hasNextPage,
    root: checkRoot(wrapperRef.current) as unknown as Element,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage?.();
    }
  }, [inView, hasNextPage]);

  return useMemo(() => ({
    lastItemRef: ref,
    wrapperRef: checkRoot(wrapperRef),
  }), []);
}

export default useIntersectionObserver;

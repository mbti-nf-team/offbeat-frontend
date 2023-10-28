import {
  RefObject, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import { checkNumber } from '@nf-team/core';
import { useThrottleCallback } from '@nf-team/react';

const DELAY_WHEN_LOAD = 300;

type UseHideOnScroll = {
  rootRef?: RefObject<HTMLDivElement | null>;
  delay?: number;
  disabled: boolean;
};

const useHideOnScroll = ({ rootRef, delay = 100, disabled }: UseHideOnScroll) => {
  const prevScrollTop = useRef<number>(0);
  const [hide, setHide] = useState<boolean>(false);
  const created = useRef<number>(Date.now());

  const getScrollState = useCallback(() => {
    if (rootRef?.current) {
      return {
        scrollTop: checkNumber(rootRef.current?.scrollTop),
        scrollHeight: rootRef.current.scrollHeight,
        clientHeight: rootRef.current.clientHeight,
      };
    }

    return {
      scrollTop: checkNumber(document.scrollingElement?.scrollTop),
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
    };
  }, [rootRef]);

  const onScroll = useThrottleCallback(
    () => {
      if (Date.now() - created.current < DELAY_WHEN_LOAD) {
        return;
      }

      const { clientHeight, scrollHeight, scrollTop } = getScrollState();

      if (scrollTop < 0 || scrollTop >= scrollHeight - clientHeight) {
        return;
      }

      const diff = Math.abs(prevScrollTop.current - scrollTop);

      if (diff <= 3) {
        prevScrollTop.current = scrollTop;
        return;
      }

      setHide(scrollTop > prevScrollTop.current && scrollTop > 8);
      prevScrollTop.current = scrollTop;
    },
    [getScrollState],
    delay,
  );

  useEffect(() => {
    if (!disabled || !rootRef?.current) {
      window.addEventListener('scroll', onScroll);
      setHide(false);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll, disabled, rootRef]);

  return useMemo(() => ({
    hide,
    onScroll,
  }), [hide, onScroll]);
};

export default useHideOnScroll;

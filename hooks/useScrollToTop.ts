import { useCallback, useEffect, useState } from 'react';

const useScrollToTop = ({
  visiblePageYOffset, top, defaultIsVisible = false,
} : { visiblePageYOffset?: number; top: number; defaultIsVisible?: boolean; }) => {
  const [isVisible, setIsVisible] = useState<boolean>(defaultIsVisible);

  const handleScroll = useCallback(() => {
    if (typeof visiblePageYOffset === 'undefined' || window.scrollY > visiblePageYOffset) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);
  }, [visiblePageYOffset]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }, [top]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { isVisible, scrollToTop };
};

export default useScrollToTop;

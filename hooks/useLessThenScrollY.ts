import { useCallback, useEffect, useState } from 'react';

function useLessThenScrollY(targetScrollY = 0): boolean {
  const [isLessThenScrollY, setIsLessThenScrollY] = useState<boolean>(true);

  const handleScrollAction = useCallback(
    () => setIsLessThenScrollY(window.scrollY <= targetScrollY),
    [targetScrollY],
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScrollAction);

    return () => window.removeEventListener('scroll', handleScrollAction);
  }, [handleScrollAction]);

  return isLessThenScrollY;
}

export default useLessThenScrollY;

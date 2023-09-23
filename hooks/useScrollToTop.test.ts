import { act, fireEvent, renderHook } from '@testing-library/react';

import useScrollToTop from './useScrollToTop';

describe('useScrollToTop', () => {
  window.scrollTo = jest.fn();

  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.resetAllMocks();
  });

  const useScrollToTopHook = () => renderHook(() => useScrollToTop({
    top: 0,
    defaultIsVisible: given.defaultIsVisible,
    visiblePageYOffset: given.visiblePageYOffset,
  }));

  describe('스크롤이 발생한다', () => {
    context('visiblePageYOffset값이 존재하지 않는 경우', () => {
      given('visiblePageYOffset', () => undefined);

      it('isVisible은 true가 되어야만 한다', () => {
        const { result } = useScrollToTopHook();

        fireEvent.scroll(window, { target: { scrollY: 200 } });

        expect(result.current.isVisible).toBeTruthy();
      });
    });

    context('현재 페이지의 스크롤 위치보다 visiblePageYOffset이 작은 경우', () => {
      given('visiblePageYOffset', () => 100);

      it('isVisible은 true가 되어야만 한다', () => {
        const { result } = useScrollToTopHook();

        fireEvent.scroll(window, { target: { scrollY: 200 } });

        expect(result.current.isVisible).toBeTruthy();
      });
    });

    context('현재 페이지의 스크롤 위치보다 visiblePageYOffset이 큰 경우', () => {
      given('visiblePageYOffset', () => 300);
      given('defaultIsVisible', () => true);

      it('isVisible은 true가 되어야만 한다', () => {
        const { result } = useScrollToTopHook();

        fireEvent.scroll(window, { target: { scrollY: 200 } });

        expect(result.current.isVisible).toBeFalsy();
      });
    });
  });

  describe('스크롤을 top 위치로 이동시킨다', () => {
    afterAll(() => {
      jest.clearAllMocks();
    });

    it('window.scrollTo이 호출되어야만 한다', () => {
      const { result } = useScrollToTopHook();

      act(() => {
        result.current.scrollToTop();
      });

      expect(window.scrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 0 });
    });
  });
});

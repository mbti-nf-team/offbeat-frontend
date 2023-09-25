import { RefObject } from 'react';

import { useActionKeyEvent } from '@nf-team/react';

function useSearchActionKeyEvent<U extends unknown[] = []>({
  inputRef, onActionEvent,
}: { inputRef: RefObject<HTMLInputElement>, onActionEvent: (...args: U) => void }) {
  const onKeyDown = useActionKeyEvent<HTMLButtonElement, U>(['Enter', 'NumpadEnter', 'ArrowDown', 'ArrowUp'], (e, ...args) => {
    if (e.code === 'ArrowDown') {
      (e.currentTarget?.nextElementSibling as HTMLElement)?.focus();
      return;
    }

    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      onActionEvent(...args);
      return;
    }

    const previousElementSibling = (e.currentTarget?.previousElementSibling as HTMLElement);

    if (previousElementSibling) {
      previousElementSibling?.focus({
        preventScroll: true,
      });
      return;
    }

    inputRef.current?.focus();
  });

  return onKeyDown;
}

export default useSearchActionKeyEvent;

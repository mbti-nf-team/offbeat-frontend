import { RefObject } from 'react';

export type ColorType =
  | 'highlight'
  | 'danger'
  | 'positive'
  | 'done'
  | 'active'
  | 'attention'
  | 'relate';

export interface InfiniteRefState<T> {
  lastItemRef: (node?: Element | null | undefined) => void;
  wrapperRef?: RefObject<T>;
}

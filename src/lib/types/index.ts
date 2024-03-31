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

export interface Pagination<T> {
  total_count: number;
  next_cursor: string;
  limit: number;
  items: T[];
}

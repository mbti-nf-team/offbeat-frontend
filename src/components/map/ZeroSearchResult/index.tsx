import { memo } from 'react';

import { useActionKeyEvent } from '@nf-team/react';
import { useGoogleMap } from '@react-google-maps/api';

import useTextSearch from '@/hooks/maps/useTextSearch';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  onInput: (value: string) => void;
};

function ZeroSearchResult({ keyword, onInput }: Props) {
  const map = useGoogleMap();
  const { onTextSearch } = useTextSearch(map);

  const onSubmit = () => {
    onTextSearch({
      query: keyword,
    });
    onInput(keyword);
  };

  const onKeyDownKeyword = useActionKeyEvent<HTMLDivElement>(['Enter', 'NumpadEnter'], onSubmit);

  return (
    <div
      className={styles.emptySearchTerm}
      tabIndex={0}
      role="menuitem"
      onKeyDown={onKeyDownKeyword}
      onClick={onSubmit}
    >
      <strong>{`‘${keyword}’`}</strong>
      &nbsp;
      <p>검색</p>
    </div>
  );
}

export default memo(ZeroSearchResult);

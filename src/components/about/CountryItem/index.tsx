import { memo } from 'react';

import { useRouter } from 'next/navigation';

import { useActionKeyEvent } from '@nf-team/react';

import styles from './index.module.scss';

type Props = {
  koreanName: string;
  emoji: string;
};

function CountryItem({ emoji, koreanName }: Props) {
  const router = useRouter();

  // TODO - 추후 변경
  const onClickCountryItem = () => router.push('/maps');

  const onKeyDown = useActionKeyEvent<HTMLLIElement, string[]>(['Enter', 'NumpadEnter'], onClickCountryItem);

  return (
    <li
      role="menuitem"
      tabIndex={0}
      onClick={onClickCountryItem}
      className={styles.countryItemWrapper}
      onKeyDown={onKeyDown}
    >
      <div>{emoji}</div>
      <div className={styles.word} dangerouslySetInnerHTML={{ __html: koreanName }} />
    </li>
  );
}

export default memo(CountryItem);

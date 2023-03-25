import { memo } from 'react';

import styles from './index.module.scss';

type Props = {
  koreanName: string;
  emoji: string;
};

function CountryItem({ emoji, koreanName }: Props) {
  return (
    <li
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      tabIndex={0}
      className={styles.countryItemWrapper}
    >
      <div>{emoji}</div>
      <div>{koreanName}</div>
    </li>
  );
}

export default memo(CountryItem);

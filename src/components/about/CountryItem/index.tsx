import { memo } from 'react';
import ga4 from 'react-ga4';

import { useRouter } from 'next/navigation';

import { useActionKeyEvent } from '@nf-team/react';

import { GA4_EVENT_ACTION, GA4_EVENT_NAME } from '@/constants/ga4';

import styles from './index.module.scss';

type Props = {
  koreanName: string;
  emoji: string;
  code: string;
};

function CountryItem({ emoji, koreanName, code }: Props) {
  const router = useRouter();

  const onClickCountryItem = (countryCode: string) => {
    ga4.event(GA4_EVENT_NAME.selected_country, {
      action: GA4_EVENT_ACTION.click,
      countryCode,
      countryName: koreanName,
    });

    router.push(`/maps?country=${countryCode}`);
  };

  const onKeyDown = useActionKeyEvent<HTMLLIElement, string[]>(['Enter', 'NumpadEnter'], (_, countryCode) => onClickCountryItem(countryCode));

  return (
    <li
      role="menuitem"
      tabIndex={0}
      onClick={() => onClickCountryItem(code)}
      className={styles.countryItemWrapper}
      onKeyDown={(e) => onKeyDown(e, code)}
    >
      <div>{emoji}</div>
      <div className={styles.word} dangerouslySetInnerHTML={{ __html: koreanName }} />
    </li>
  );
}

export default memo(CountryItem);

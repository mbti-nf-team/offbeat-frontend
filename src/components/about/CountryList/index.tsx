import {
  memo, useEffect, useMemo, useState,
} from 'react';

import clsx from 'clsx';
import Inko from 'inko';

import Label from '@/components/common/Label';
import useScrollToTop from '@/hooks/useScrollToTop';
import { ChevronUpIcon } from '@/lib/assets/icons';
import { Country } from '@/lib/types/country';

import CountryItem from '../CountryItem';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  countries: Country[];
  isFocused: boolean;
};

const inko = new Inko();

function CountryList({ keyword, countries, isFocused }: Props) {
  const unRankingCountries = useMemo(() => countries.filter(({
    ranking,
  }) => ranking === -1), [countries]);

  const rankingCountries = useMemo(
    () => [...countries.filter(({ ranking }) => ranking !== -1)]
      .sort((a, b) => a.ranking - b.ranking),
    [countries],
  );

  const [rankingCountriesState, setRankingCountriesState] = useState<Country[]>(rankingCountries);
  const [
    unRankingCountriesState, setUnRankingCountriesState,
  ] = useState<Country[]>(unRankingCountries);
  const { scrollToTop } = useScrollToTop({ top: 0, defaultIsVisible: true });

  const itemTitleClassName = clsx(styles.countryItemTitle, { [styles.isFocused]: isFocused });

  useEffect(() => {
    if (!keyword.trim()) {
      setUnRankingCountriesState(unRankingCountries);
      setRankingCountriesState(rankingCountries);
      return;
    }

    const replaceCountries = (
      filterCountries: Country[],
    ) => filterCountries.reduce((prevCountries: Country[], currentCountry) => {
      const { englishName, koreanName } = currentCountry;

      const englishKeywordRegExp = new RegExp(keyword, 'ig');

      if (englishKeywordRegExp.test(englishName)) {
        return [
          ...prevCountries,
          currentCountry,
        ];
      }

      const koreanKeyword = inko.en2ko(keyword);
      const koreanKeywordRegExp = new RegExp(koreanKeyword, 'ig');

      if (koreanKeywordRegExp.test(koreanName)) {
        return [
          ...prevCountries,
          {
            ...currentCountry,
            koreanName: koreanName.replaceAll(koreanKeywordRegExp, `<strong>${koreanKeyword}</strong>`),
          },
        ];
      }

      return prevCountries;
    }, []);

    setRankingCountriesState(replaceCountries(rankingCountries));
    setUnRankingCountriesState(replaceCountries(unRankingCountries));
  }, [keyword]);

  return (
    <ul className={styles.countryListWrapper}>
      {!keyword.trim() && (
        <div className={itemTitleClassName}>
          <Label color="done" size="medium" className={styles.fixedLabel}>
            BEST 10
          </Label>
        </div>
      )}
      <div className={styles.countryItemWrapper}>
        {rankingCountriesState.map(({ code, koreanName, emoji }) => (
          <CountryItem
            key={code}
            emoji={emoji}
            koreanName={koreanName}
          />
        ))}
      </div>
      {!keyword.trim() && (
        <div className={itemTitleClassName}>
          <Label
            color="done"
            size="medium"
            onClick={scrollToTop}
            prefixIcon={<ChevronUpIcon />}
            className={styles.fixedLabel}
          >
            BEST 10
          </Label>
        </div>
      )}
      <div className={styles.countryItemWrapper}>
        {unRankingCountriesState.map(({ code, koreanName, emoji }) => (
          <CountryItem
            key={code}
            emoji={emoji}
            koreanName={koreanName}
          />
        ))}
      </div>
    </ul>
  );
}

export default memo(
  CountryList,
  (prev, next) => prev.keyword === next.keyword && prev.isFocused === next.isFocused,
);

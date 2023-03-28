import {
  memo, useEffect, useMemo, useState,
} from 'react';

import clsx from 'clsx';
import { Country } from 'lib/types/country';

import CountryItem from '../countryItem';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  countries: Country[];
  isFocused: boolean;
};

function CountryList({ keyword, countries, isFocused }: Props) {
  const unRankingCountries = useMemo(() => countries.filter(({
    ranking,
  }) => ranking === -1), [countries]);

  const rankingCountries = useMemo(() => [...countries
    .filter(({ ranking }) => ranking !== -1)]
    .sort((a, b) => a.ranking - b.ranking), [countries]);

  const [rankingCountriesState, setRankingCountriesState] = useState<Country[]>(rankingCountries);
  const [
    unRankingCountriesState, setUnRankingCountriesState,
  ] = useState<Country[]>(unRankingCountries);

  const itemTitleClassName = clsx(styles.countryItemTitle, { [styles.isFocused]: isFocused });

  useEffect(() => {
    if (!keyword.trim()) {
      setUnRankingCountriesState(unRankingCountries);
      setRankingCountriesState(rankingCountries);
      return;
    }

    const filteredCountries = (
      filterCountries: Country[],
    ) => filterCountries.filter(({ englishName, koreanName }) => {
      const keywordRegExp = new RegExp(keyword, 'ig');

      if (keywordRegExp.test(englishName) || keywordRegExp.test(koreanName)) {
        return true;
      }

      return false;
    });

    setRankingCountriesState(filteredCountries(rankingCountries));
    setUnRankingCountriesState(filteredCountries(unRankingCountries));
  }, [keyword]);

  return (
    <ul className={styles.countryListWrapper}>
      <div className={itemTitleClassName}>BEST 10</div>
      {rankingCountriesState.map(({ code, koreanName, emoji }) => (
        <CountryItem
          key={code}
          emoji={emoji}
          koreanName={koreanName}
        />
      ))}
      <div className={itemTitleClassName}>그 외</div>
      {unRankingCountriesState.map(({ code, koreanName, emoji }) => (
        <CountryItem
          key={code}
          emoji={emoji}
          koreanName={koreanName}
        />
      ))}
    </ul>
  );
}

export default memo(
  CountryList,
  (prev, next) => prev.keyword === next.keyword && prev.isFocused === next.isFocused,
);

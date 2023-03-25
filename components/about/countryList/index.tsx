import {
  memo, useEffect, useMemo, useState,
} from 'react';

import { Country } from 'lib/types/country';

import CountryItem from '../countryItem';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  countries: Country[];
};

function CountryList({ keyword, countries }: Props) {
  const rankingCountries = useMemo(() => [...countries
    .filter(({ ranking }) => ranking !== -1)]
    .sort((a, b) => a.ranking - b.ranking), [countries]);

  const [state, setState] = useState<Country[]>(rankingCountries);

  useEffect(() => {
    if (!keyword.trim()) {
      setState(rankingCountries);
      return;
    }

    setState(countries.filter(({ englishName, koreanName }) => {
      const keywordRegExp = new RegExp(keyword, 'ig');

      if (keywordRegExp.test(englishName) || keywordRegExp.test(koreanName)) {
        return true;
      }

      return false;
    }));
  }, [keyword]);

  return (
    <ul className={styles.countryListWrapper}>
      {state.map(({ code, koreanName, emoji }) => (
        <CountryItem
          key={code}
          emoji={emoji}
          koreanName={koreanName}
        />
      ))}
    </ul>
  );
}

export default memo(CountryList, (prev, next) => prev.keyword === next.keyword);

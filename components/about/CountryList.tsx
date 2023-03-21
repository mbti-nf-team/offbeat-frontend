import {
  memo, useEffect, useMemo, useState,
} from 'react';

import { Country } from 'lib/types/country';
import styled from 'styled-components';

import CountryItem from './CountryItem';

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
    <CountryListWrapper>
      {state.map(({ code, koreanName, emoji }) => (
        <CountryItem
          key={code}
          emoji={emoji}
          koreanName={koreanName}
        />
      ))}
    </CountryListWrapper>
  );
}

export default memo(CountryList, (prev, next) => prev.keyword === next.keyword);

const CountryListWrapper = styled.ul`
  user-select: none;
  list-style: none;
  margin: 0;
  padding: 0;
`;

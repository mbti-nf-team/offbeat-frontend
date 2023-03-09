import { memo, useEffect, useState } from 'react';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Country } from 'lib/types/country';
import styled from 'styled-components';

import CountryItem from './CountryItem';

type Props = {
  keyword: string;
  countries: Country[];
};

function CountryList({ keyword, countries }: Props) {
  const [state, setState] = useState<Country[]>(countries);

  useEffect(() => {
    if (!keyword.trim()) {
      setState(countries);
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
    <LayoutGroup>
      <CountryListWrapper layout>
        <AnimatePresence>
          {state.map(({ code, koreanName, emoji }) => (
            <CountryItem
              key={code}
              emoji={emoji}
              koreanName={koreanName}
            />
          ))}
        </AnimatePresence>
      </CountryListWrapper>
    </LayoutGroup>
  );
}

export default memo(CountryList, (prev, next) => prev.keyword === next.keyword);

const CountryListWrapper = styled(motion.ul)`
  user-select: none;
  list-style: none;
  margin: 0;
  padding: 0;
`;

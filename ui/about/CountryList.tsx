import { memo, useEffect, useState } from 'react';

import {
  AnimatePresence, LayoutGroup, motion, Variants,
} from 'framer-motion';
import { Country } from 'lib/model/country';
import styled from 'styled-components';

type Props = {
  keyword: string;
  countries: Country[];
};

const countryItemVariants: Variants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 0.4,
      ease: [0, 0.71, 0.2, 1.01],
    },
  },
  exit: {
    opacity: 0,
  },
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
              role="button"
              tabIndex={0}
              key={code}
              layout
              variants={countryItemVariants}
              initial="closed"
              animate="open"
              exit="exit"
            >
              <div>{emoji}</div>
              <div>{koreanName}</div>
            </CountryItem>
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

const CountryItem = styled(motion.li)`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background: ${({ theme }) => theme.white};
  border-bottom: 1px solid ${({ theme }) => theme.black};
  gap: 16px;

  /* TODO - 폰트 정의 */
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  transition: background-color 0.1s ease-in-out;

  @media(hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ theme }) => theme.gray100};
    }
  }
`;

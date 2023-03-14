'use client';

import { useEffect, useState } from 'react';

import { motion, Variants } from 'framer-motion';
import useLessThenScrollY from 'hooks/useLessThenScrollY';
import { Country } from 'lib/types/country';
import styled from 'styled-components';
import { headlineFont } from 'styles/fontStyles';

import CountryList from './CountryList';

import SearchSvg from 'lib/assets/icons/search.svg';

type Props = {
  countries: Country[];
};

const logoVariants: Variants = {
  large: {
    width: 306,
    height: 64,
  },
  small: {
    width: 191.25,
    height: 40,
    transition: {
      type: 'spring',
      bounce: 0.5,
      stiffness: 400,
    },
  },
};

function SearchCountry({ countries }: Props) {
  const [keyword, setKeyword] = useState<string>('');
  const [isScrollTop, setIsScrollTop] = useState<boolean>(false);

  const isBodyScrollTop = useLessThenScrollY();

  const onChange = (nextKeyword: string) => setKeyword(nextKeyword);

  const onFocus = () => setIsScrollTop(true);

  useEffect(() => {
    if (isBodyScrollTop) {
      setIsScrollTop(false);
      return;
    }

    setIsScrollTop(true);
  }, [isBodyScrollTop]);

  return (
    <>
      <SearchCountryHeaderWrapper>
        <LogoWrapper>
          <motion.img
            alt="logo"
            src="/offbeat_logo_draft.png"
            variants={logoVariants}
            initial="large"
            animate={isScrollTop ? 'small' : 'large'}
          />
        </LogoWrapper>
        <SearchInputWrapper>
          <SearchIcon />
          <SearchCountryInput
            type="text"
            placeholder="찾는 장소가 어떤 나라인가요?"
            value={keyword}
            onFocus={onFocus}
            onChange={(e) => onChange(e.target.value)}
          />
        </SearchInputWrapper>
      </SearchCountryHeaderWrapper>
      <CountryList keyword={keyword} countries={countries} />
    </>
  );
}
export default SearchCountry;

const SearchCountryHeaderWrapper = styled.div`
  position: sticky;
  top: 0;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0px 16px 24px;
  background-color: ${({ theme }) => theme.gray100};
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  position: relative;

  &:focus-within {
    & > svg > path {
      fill: ${({ theme }) => theme.purple500};
    }
  }
`;

const SearchIcon = styled(SearchSvg)`
  cursor: pointer;
  position: absolute;
  top: 16px;
  left: 16px;
`;

const SearchCountryInput = styled.input`
  ${headlineFont({ fontWeight: 500 })};
  letter-spacing: -0.012em;

  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
  background-color: ${({ theme }) => theme.white};
  width: 100%;
  border-width: 1px 0px;
  border-style: solid;
  border-radius: 0;
  border-color: ${({ theme }) => theme.black};
  padding: 12px 16px 12px 56px;  
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.gray400};
  }

  &:focus {
    caret-color: ${({ theme }) => theme.purple500};
    border-width: 2px 0px;
  }
`;

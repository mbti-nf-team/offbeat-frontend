'use client';

import { useEffect, useState } from 'react';

import { motion, useScroll, Variants } from 'framer-motion';
import useDebounce from 'hooks/useDebounce';
import useLessThenScrollY from 'hooks/useLessThenScrollY';
import { Country } from 'lib/types/country';
import styled from 'styled-components';

import CountryList from './CountryList';

import SearchSvg from 'lib/assets/icons/search.svg';

type Props = {
  countries: Country[];
};

const logoVariants: Variants = {
  large: {
    // width: 306,
    // height: 64,
  },
  small: {
    // width: 191.25,
    // height: 40,
    transition: {
      type: 'spring',
      bounce: 0.5,
      stiffness: 400,
    },
  },
};

function SearchCountry({ countries }: Props) {
  const [keyword, setKeyword] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [scrollWith, setScrollWith] = useState(1);
  const { scrollYProgress, scrollY } = useScroll();

  const debounceKeyword = useDebounce(keyword, 200);

  const onChange = (nextKeyword: string) => setKeyword(nextKeyword);

  const onFocus = () => setIsFocused(true);

  const isBodyScrollTop = useLessThenScrollY();

  console.log(scrollYProgress);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const width = Math.max(0.625, 1 - 0.01 * window.scrollY);

      setScrollWith(width);
    });
  });

  useEffect(() => {
    if (isBodyScrollTop) {
      setIsFocused(false);
      return;
    }

    setIsFocused(true);
  }, [isBodyScrollTop]);

  console.log(scrollY);

  return (
    <>
      <SearchCountryHeaderWrapper>
        <LogoWrapper>
          <motion.img
            alt="logo"
            src="/offbeat_logo_draft.png"
            variants={logoVariants}
            initial="large"
            width={306 * scrollWith}
            height={64 * scrollWith}
            animate={scrollWith === 0.700 ? 'small' : 'large'}
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
      <CountryList keyword={debounceKeyword} countries={countries} />
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

  /* TODO - 추후 공통 변수로 적용 */
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.02em;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.gray400};
  }

  &:focus {
    caret-color: ${({ theme }) => theme.purple500};
    border-width: 2px 0px;
  }
`;

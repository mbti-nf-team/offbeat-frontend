'use client';

import { useState } from 'react';

import { motion, Variants } from 'framer-motion';
import { Country } from 'lib/types/country';

import CountryList from '../countryList';

import SearchIcon from 'lib/assets/icons/search.svg';

import styles from './index.module.scss';

type Props = {
  countries: Country[];
};

const logoVariants: Variants = {
  blur: {
    width: 306,
    height: 64,
  },
  focus: {
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
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onChange = (nextKeyword: string) => setKeyword(nextKeyword);

  const onFocus = () => setIsFocused(true);

  return (
    <>
      <div className={styles.searchCountryHeaderWrapper}>
        <div className={styles.logoWrapper}>
          <motion.img
            alt="logo"
            src="/offbeat_logo_draft.png"
            variants={logoVariants}
            initial="blur"
            animate={isFocused ? 'focus' : 'blur'}
          />
        </div>
        <div className={styles.searchInputWrapper}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="찾는 장소가 어떤 나라인가요?"
            value={keyword}
            onFocus={onFocus}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
      <CountryList keyword={keyword} countries={countries} isFocused={isFocused} />
    </>
  );
}

export default SearchCountry;

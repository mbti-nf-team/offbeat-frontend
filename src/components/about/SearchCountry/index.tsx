'use client';

import { useEffect, useState } from 'react';

import { motion, Variants } from 'framer-motion';

import Input from '@/components/common/Input';
import { Country } from '@/lib/types/country';

import CountryList from '../CountryList';

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

  const onChange = (nextKeyword: string) => setKeyword(nextKeyword.replace(/\\/g, ''));

  const onFocus = () => setIsFocused(true);

  useEffect(() => {
    if (!keyword) {
      setIsFocused(false);
      return;
    }

    setIsFocused(true);
  }, [keyword]);

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
        <Input
          type="text"
          placeholder="찾는 장소가 어떤 나라인가요?"
          value={keyword}
          onFocus={onFocus}
          onChange={(e) => onChange(e.target.value)}
          isFocused={isFocused}
          onRemove={() => onChange('')}
        />
      </div>
      <CountryList keyword={keyword} countries={countries} isFocused={isFocused} />
    </>
  );
}

export default SearchCountry;

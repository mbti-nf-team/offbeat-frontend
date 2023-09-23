import { useMemo } from 'react';

import SearchCountry from '@/components/about/SearchCountry';
import SearchCountryHeader from '@/components/about/SearchCountryHeader';
import ISO_3166_COUNTRY_CODES from '@/lib/assets/data/iso3166CountryCodes';
import { Country } from '@/lib/types/country';
import { codeToFlag } from '@/utils';

export const metadata = {
  title: 'offbeat',
};

function Page() {
  const topRankingCountries = ['KR', 'JP', 'US', 'TH', 'VN', 'HK', 'TW', 'PH', 'SG', 'FR'];

  const countries = useMemo(() => ISO_3166_COUNTRY_CODES
    .reduce((prev: Country[], curr) => [
      ...prev, {
        ...curr,
        emoji: codeToFlag(curr.code),
        ranking: topRankingCountries.findIndex((value) => value === curr.code),
      },
    ], []), []);

  return (
    <SearchCountryHeader>
      <SearchCountry countries={countries} />
    </SearchCountryHeader>
  );
}

export default Page;

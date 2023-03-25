import { useMemo } from 'react';

import ISO_3166_COUNTRY_CODES from 'lib/assets/data/iso3166CountryCodes';
import { Country } from 'lib/types/country';

import SearchCountry from 'components/about/searchCountry';
import { codeToFlag } from 'utils';

export const metadata = {
  title: 'About',
};

function Page() {
  const topRankingCountries = ['JP', 'US', 'TH', 'VN', 'HK', 'TW', 'PH', 'SG', 'FR'];

  const countries = useMemo(() => ISO_3166_COUNTRY_CODES
    .reduce((prev: Country[], curr) => [
      ...prev, {
        ...curr,
        emoji: codeToFlag(curr.code),
        ranking: topRankingCountries.findIndex((value) => value === curr.code),
      },
    ], []), []);

  return (
    <SearchCountry countries={countries} />
  );
}

export default Page;

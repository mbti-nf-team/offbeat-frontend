import { useMemo } from 'react';

import ISO_3166_COUNTRY_CODES from 'lib/assets/data/iso3166CountryCodes';
import { Country } from 'lib/model/country';
import SearchCountry from 'ui/about/SearchCountry';

import { codeToFlag } from 'utils';

export const metadata = {
  title: 'About',
};

function Page() {
  const countries = useMemo(() => ISO_3166_COUNTRY_CODES
    .reduce((prev: Country[], curr) => [
      ...prev, {
        ...curr,
        emoji: codeToFlag(curr.code),
      },
    ], []), []);

  return (
    <SearchCountry countries={countries} />
  );
}

export default Page;

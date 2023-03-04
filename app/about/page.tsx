import { useMemo } from 'react';

import ISO_3166_COUNTRY_CODES from 'lib/assets/data/iso3166CountryCodes';
import isoCountryCodeNames from 'lib/assets/data/isoCountryCodeNames';
import CountryList from 'ui/about/CountryList';

import { codeToFlag } from 'utils';

export const metadata = {
  title: 'About',
};

type Countries = {
  id: number;
  name: string;
  code: string;
  emoji: string;
};

function Page() {
  const countries = useMemo(() => ISO_3166_COUNTRY_CODES
    .reduce((prev: Countries[], curr, index) => [
      ...prev, {
        ...curr,
        id: index,
        name: isoCountryCodeNames[curr.code as keyof typeof isoCountryCodeNames][0],
        emoji: codeToFlag(curr.code),
      },
    ], []), []);

  return (
    <div>
      <CountryList countries={countries} />
    </div>
  );
}

export default Page;

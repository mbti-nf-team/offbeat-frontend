import { useMemo } from 'react';

import SearchCountry from '@/components/about/SearchCountry';
import SearchCountryHeader from '@/components/about/SearchCountryHeader';
import ISO_3166_COUNTRY_CODES from '@/lib/assets/data/iso3166CountryCodes';
import { Country } from '@/lib/types/country';
import { codeToFlag } from '@/utils';

const title = 'offbeat';
const description = '여행에서 ✌️진짜✌️ 로컬 여행지 찾기';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_ORIGIN),
  title,
  description,
  openGraph: {
    title,
    description,
    url: process.env.NEXT_PUBLIC_ORIGIN,
    images: ['./assets/logos/sns_share_thumbnail.png'],
  },
  twitter: {
    description,
    title,
    images: ['./assets/logos/sns_share_thumbnail.png'],
  },
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

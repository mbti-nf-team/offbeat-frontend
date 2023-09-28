import MainMap from '@/components/map/MainMap';

export const metadata = {
  title: 'offbeat-map',
};

type Props = {
  searchParams: { [key: string]: string | undefined; };
};

function Page({ searchParams }: Props) {
  return (
    <MainMap
      defaultCountryCode={searchParams?.country}
      defaultPlaceId={searchParams?.id}
      defaultPlaceName={searchParams?.name}
    />
  );
}

export default Page;

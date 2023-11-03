import { Metadata, ResolvingMetadata } from 'next';

import { Status } from '@googlemaps/google-maps-services-js';
import { checkEmpty } from '@nf-team/core';

import MainMap from '@/components/map/MainMap';
import { paramsSerializer } from '@/lib/apis';
import { fetchPlaceDetail } from '@/lib/apis/search';

import { metadata } from '../page';

const description = '이 장소는 ✌️진짜✌️ 로컬 여행지일까? 확인해보세요!';

type Props = {
  searchParams: { [key: string]: string | undefined; };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const defaultUrl = `${process.env.NEXT_PUBLIC_ORIGIN}/maps`;
  const defaultMetadata: Metadata = {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      url: defaultUrl,
    },
  };

  if (!searchParams?.id) {
    return defaultMetadata;
  }

  try {
    const placeDetail = await fetchPlaceDetail({ placeId: searchParams.id });
    const previousParent = await parent;

    if (placeDetail.status !== Status.OK || !placeDetail?.result) {
      return defaultMetadata;
    }

    const previousImages = checkEmpty(previousParent.openGraph?.images);
    const images = placeDetail.result?.thumbnail ? [
      {
        url: placeDetail.result.thumbnail,
        width: 800,
        height: 600,
      }, ...previousImages,
    ] : previousImages;
    const title = placeDetail.result?.name || metadata.title;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images,
        url: `${defaultUrl}?${paramsSerializer({
          country: searchParams?.country,
          id: placeDetail.result.place_id,
        })}`,
      },
      twitter: {
        title,
        description,
        images,
      },
    };
  } catch (error) {
    return defaultMetadata;
  }
}

function Page({ searchParams }: Props) {
  return (
    <MainMap
      defaultCountryCode={searchParams?.country}
      defaultPlaceId={searchParams?.id}
      defaultLocation={{
        lat: searchParams?.lat,
        lng: searchParams?.lng,
      }}
    />
  );
}

export default Page;

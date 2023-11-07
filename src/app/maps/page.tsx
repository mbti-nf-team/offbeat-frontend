import { Metadata, ResolvingMetadata } from 'next';

import { Language, Status } from '@googlemaps/google-maps-services-js';
import { checkEmpty } from '@nf-team/core';

import MainMap from '@/components/map/MainMap';
import { paramsSerializer } from '@/lib/apis';

import { getGooglePlaceDetails, getPlacePhotoUrl } from '../api/handler';
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
    const placeDetails = await getGooglePlaceDetails({
      place_id: searchParams.id,
      language: Language.ko,
      region: 'KR',
      fields: ['photos', 'name', 'place_id'],
    });

    if (placeDetails.status !== Status.OK || !placeDetails?.result) {
      return defaultMetadata;
    }

    const thumbnailPhotoUrl = getPlacePhotoUrl(placeDetails.result.photos?.[0].photo_reference);

    const previousParent = await parent;
    const previousImages = checkEmpty(previousParent.openGraph?.images);
    const images = thumbnailPhotoUrl ? [
      {
        url: thumbnailPhotoUrl,
        width: 800,
        height: 600,
      }, ...previousImages,
    ] : previousImages;
    const title = placeDetails.result?.name || metadata.title;

    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_ORIGIN),
      title,
      description,
      openGraph: {
        title,
        description,
        images,
        url: `${defaultUrl}?${paramsSerializer({
          country: searchParams?.country,
          id: placeDetails.result.place_id,
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

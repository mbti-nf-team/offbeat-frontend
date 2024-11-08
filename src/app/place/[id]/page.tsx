import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';

import { ensureArray } from '@nf-team/core';

import { getGooglePlaceDetails, getPlacePhotoUrl } from '@/app/api/handler';
import { metadata } from '@/app/page';
import PlacePage from '@/components/place/PlacePage';
import { getUser } from '@/lib/apis/auth';
import CookieNames from '@/lib/constants/cookies';

type Props = {
  params: {
    id?: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const description = '이 장소는 ✌️진짜✌️ 로컬 여행지일까? 확인해보세요!';
  const defaultUrl = `${process.env.NEXT_PUBLIC_ORIGIN}/place/${params.id}`;

  const defaultMetadata: Metadata = {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      url: defaultUrl,
    },
  };

  if (!params?.id) {
    return defaultMetadata;
  }

  try {
    const placeDetails = await getGooglePlaceDetails({
      place_id: params.id,
      language: 'ko',
      region: 'KR',
      fields: ['photos', 'name', 'place_id'],
    });

    if (placeDetails.status !== 'OK' || !placeDetails?.result) {
      return defaultMetadata;
    }

    const thumbnailPhotoUrl = getPlacePhotoUrl(
      placeDetails.result.photos?.[0].photo_reference,
      500,
    );

    const previousParent = await parent;
    const previousImages = ensureArray(previousParent.openGraph?.images);
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
      title: placeDetails.result?.name ? `${metadata.title} - ${placeDetails.result?.name}` : metadata.title,
      description,
      openGraph: {
        title,
        description,
        images,
        url: defaultUrl,
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

async function Page({ params }: Props) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get(CookieNames.ACCESS_TOKEN);

  const user = await getUser({ accessToken: accessToken?.value });

  return <PlacePage placeId={params?.id} user={user} />;
}

export default Page;

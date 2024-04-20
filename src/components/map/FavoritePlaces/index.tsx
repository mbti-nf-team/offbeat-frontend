import { Fragment } from 'react';

import { useSearchParams } from 'next/navigation';

import { checkNumber } from '@nf-team/core';

import Button from '@/components/common/Button';
import PlaceItem from '@/components/common/PlaceItem';
import Spinner from '@/components/common/Spinner';
import useRemoveFavoritePlaceMutation from '@/hooks/apis/mutations/useRemoveFavoritePlaceMutation';
import useInfiniteFavoritePlacesQuery from '@/hooks/apis/queries/useGetFavoritePlaces';

import styles from './index.module.scss';

type Props = {
  isMenu?: boolean;
};

function FavoritePlaces({ isMenu }: Props) {
  const searchParams = useSearchParams();

  const { data: favoritePlaces, isLoading } = useInfiniteFavoritePlacesQuery({
    country_code: searchParams?.get('country') || undefined,
  });
  const { mutate: removeFavoritePlaceMutate } = useRemoveFavoritePlaceMutation();

  if (isLoading) {
    return <Spinner color="black" isLoading size="large" />;
  }

  return (
    <div>
      <ul className={styles.savedPlacesWrapper}>
        {favoritePlaces?.pages?.map(({ items }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            {items.map(({
              google_place_id, photoUrls, country_code, name, rating, user_ratings_total,
            }) => (
              <PlaceItem
                key={google_place_id}
                onRemove={removeFavoritePlaceMutate}
                placeId={google_place_id}
                isSavedPlace
                photoUrls={photoUrls}
                address="address"
                distance="distance"
                nation={country_code}
                placeName={name}
                rating={rating}
                userRatingsTotal={user_ratings_total}
              />
            ))}
          </Fragment>
        ))}
      </ul>
      {isMenu && checkNumber(favoritePlaces?.pages?.[0].total_count) > 5 && (
        <div className={styles.buttonWrapper}>
          <Button href="/my/favorite-places" size="small" color="highlight">
            저장한 장소 더보기
          </Button>
        </div>
      )}
    </div>
  );
}

export default FavoritePlaces;

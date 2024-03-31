import { useSearchParams } from 'next/navigation';

import { checkNumber } from '@nf-team/core';

import Button from '@/components/common/Button';
import PlaceItem from '@/components/common/PlaceItem';
import useInfiniteFavoritePlacesQuery from '@/hooks/apis/queries/useGetFavoritePlaces';

import styles from './index.module.scss';

type Props = {
  isMenu?: boolean;
};

function FavoritePlaces({ isMenu }: Props) {
  const searchParams = useSearchParams();

  const { data: favoritePlaces } = useInfiniteFavoritePlacesQuery({
    country_code: searchParams?.get('country') || 'KR',
  });

  return (
    <div>
      <ul className={styles.savedPlacesWrapper}>
        {favoritePlaces?.pages?.map(({ items }) => (
          <>
            {items.map(({
              id, google_place_id, photoUrls, country_code, name, rating, user_ratings_total,
            }) => (
              <PlaceItem
                key={id}
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
          </>
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

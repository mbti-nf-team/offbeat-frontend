import { useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { checkNumber } from '@nf-team/core';

import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PlaceItem from '@/components/common/PlaceItem';
import Spinner from '@/components/common/Spinner';
import useRemoveFavoritePlaceMutation from '@/hooks/apis/mutations/useRemoveFavoritePlaceMutation';
import useInfiniteFavoritePlacesQuery from '@/hooks/apis/queries/useGetFavoritePlaces';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { targetFalseThenValue } from '@/utils';

import styles from './index.module.scss';

type Props = {
  isMenu?: boolean;
};

function FavoritePlaces({ isMenu }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: favoritePlaces,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteFavoritePlacesQuery({
    country_code: searchParams?.get('country') || undefined,
  });
  const { mutate: removeFavoritePlaceMutate } = useRemoveFavoritePlaceMutation();

  const onClickPlaceItem = useCallback((placeId: string) => {
    router.push(`/place/${placeId}`);
  }, []);

  const refState = useIntersectionObserver<HTMLUListElement>({
    isRoot: true,
    fetchNextPage,
    hasNextPage,
    intersectionOptions: {
      rootMargin: '80px',
      triggerOnce: true,
    },
  });

  if (isFetching) {
    return (
      <LoadingSpinner className={isMenu ? styles.spinnerWrapper : undefined} />
    );
  }

  return (
    <div>
      <ul ref={refState.wrapperRef} className={styles.savedPlacesWrapper}>
        {favoritePlaces?.pages.flatMap((page) => page.items)?.map(({
          google_place_id, photoUrls, country_code, name, rating, user_ratings_total,
        }, index, array) => (
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
            onClick={onClickPlaceItem}
            wrapperRef={
              targetFalseThenValue(
                !(array.length - 1 === index),
              )(refState.lastItemRef)
            }
            userRatingsTotal={user_ratings_total}
          />
        ))}
      </ul>
      {isFetchingNextPage && (
        <div className={styles.loadingWrapper}>
          <Spinner isLoading />
        </div>
      )}
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

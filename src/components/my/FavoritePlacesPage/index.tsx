'use client';

import { Suspense } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import FavoritePlaces from '@/components/map/FavoritePlaces';
import { NarrowArrowLeftIcon } from '@/lib/assets/icons';

import styles from './index.module.scss';

function FavoritePlacesPage() {
  const router = useRouter();

  return (
    <>
      <header className={styles.headerWrapper}>
        <Button
          type="button"
          color="ghost"
          size="medium"
          onClick={() => router.back()}
          hasPseudoSelectorStyle={false}
          onlyIcon={<NarrowArrowLeftIcon />}
        />
      </header>
      <Suspense fallback={<LoadingSpinner />}>
        <FavoritePlaces />
      </Suspense>
    </>
  );
}

export default FavoritePlacesPage;

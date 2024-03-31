'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
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
      <FavoritePlaces />
    </>
  );
}

export default FavoritePlacesPage;

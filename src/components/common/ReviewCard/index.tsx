import Image from 'next/image';

import clsx from 'clsx';

import StarRating from '../StarRating';

import styles from './index.module.scss';

type Props = {
  author: string;
  profileUrl: string;
  rating?: number;
  createdAt?: string;
  review: string;
  isKoreanReview: boolean;
  hasSeparator: boolean;
};

function ReviewCard({
  author, isKoreanReview, rating, review, createdAt, profileUrl, hasSeparator,
}: Props) {
  return (
    <div
      className={clsx(styles.reviewCardWrapper, hasSeparator && styles.separator)}
    >
      <div className={styles.authorInfoWrapper}>
        <div className={styles.authorInfo}>
          <div className={styles.thumbnailWrapper}>
            <Image
              className={styles.thumbnail}
              alt={author}
              src={profileUrl}
              width={48}
              height={48}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUFpSoBwABOAC9yb3dCAAAAABJRU5ErkJggg=="
              data-testid="profile"
            />
          </div>
          <div className={styles.authorReview}>
            <div className={styles.authorName}>{author}</div>
            <div className={styles.rating}>
              <StarRating size="small" rating={rating} type="detail" />
              <div className={styles.createdAt}>{createdAt}</div>
            </div>
          </div>
        </div>
        {isKoreanReview && (
          <div className={styles.koreanReview}>한국어 리뷰</div>
        )}
      </div>
      {review && (
        <div className={styles.review}>{review}</div>
      )}
    </div>
  );
}

export default ReviewCard;

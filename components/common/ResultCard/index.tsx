'use client';

import Image from 'next/image';

import styles from './index.module.scss';

type Props = {
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
};

function ResultCard({
  url, description, title, thumbnail,
}: Props) {
  return (
    <a
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      className={styles.resultCardWrapper}
    >
      <div className={styles.textWrapper}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      {thumbnail ? (
        <Image className={styles.thumbnail} alt={title} src={thumbnail} width={84} height={84} data-testid="thumbnail" />
      ) : (
        <div className={styles.thumbnail} data-testid="empty-thumbnail" />
      )}
    </a>
  );
}

export default ResultCard;

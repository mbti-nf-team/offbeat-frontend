'use client';

import { PropsWithChildren } from 'react';

import { useResizeViewportHeight } from '@nft-team/react';

import styles from './index.module.scss';

function Layout({ children }: PropsWithChildren) {
  useResizeViewportHeight();

  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.contentBox}>
        {children}
      </div>
    </div>
  );
}

export default Layout;

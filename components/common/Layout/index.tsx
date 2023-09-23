'use client';

import { PropsWithChildren } from 'react';

import { useResizeViewportHeight } from '@nf-team/react';

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

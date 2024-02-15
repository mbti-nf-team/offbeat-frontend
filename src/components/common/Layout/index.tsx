import { PropsWithChildren } from 'react';

import styles from './index.module.scss';

function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.contentBox}>
        {children}
      </div>
    </div>
  );
}

export default Layout;

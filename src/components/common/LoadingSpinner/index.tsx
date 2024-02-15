import Spinner from '../Spinner';

import styles from './index.module.scss';

function LoadingSpinner() {
  return (
    <div className={styles.loading}>
      <Spinner color="black" isLoading size="large" />
    </div>
  );
}

export default LoadingSpinner;

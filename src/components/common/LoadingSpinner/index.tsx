import clsx from 'clsx';

import Spinner from '../Spinner';

import styles from './index.module.scss';

type Props = {
  className?: string;
};

function LoadingSpinner({ className }: Props) {
  return (
    <div className={clsx(styles.loading, className)}>
      <Spinner color="black" isLoading size="large" />
    </div>
  );
}

export default LoadingSpinner;

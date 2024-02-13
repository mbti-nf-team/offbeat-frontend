import {
  CSSProperties, DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes,
} from 'react';

import clsx from 'clsx';

import {
  ArrowLeftIcon, MenuIcon, RemoveIcon, SearchIcon,
} from '@/lib/assets/icons';

import styles from './index.module.scss';

interface Props extends DetailedHTMLProps<
InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
> {
  value: string;
  placeholder: string;
  goBack?: () => void;
  onRemove: () => void;
  onToggleMenu?: () => void;
  showSearchIcon?: boolean;
  wrapperStyle?: CSSProperties;
  isVisibleMenuIcon?: boolean;
  visibleShadow?: boolean;
}

function Input({
  goBack,
  value,
  placeholder,
  onRemove,
  onToggleMenu,
  wrapperStyle,
  isVisibleMenuIcon,
  showSearchIcon,
  visibleShadow,
  ...rest
}: Props, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <div className={styles.inputWrapper} style={wrapperStyle}>
      <div className={styles.prefixIconWrapper}>
        {showSearchIcon ? (
          <SearchIcon className={styles.searchIcon} />
        ) : (
          <button type="button" onClick={goBack} className={styles.iconButton}>
            <ArrowLeftIcon />
          </button>
        )}
      </div>
      <input
        ref={ref}
        placeholder={placeholder}
        value={value}
        className={clsx(styles.input, {
          [styles.visibleShadow]: visibleShadow,
          [styles.blur]: !isVisibleMenuIcon && !value,
        })}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
      <div className={styles.suffixIconWrapper}>
        {value && (
          <button type="button" onClick={onRemove} className={styles.iconButton}>
            <RemoveIcon />
          </button>
        )}
        {isVisibleMenuIcon && (
          <button type="button" onClick={onToggleMenu} className={styles.iconButton}>
            <MenuIcon />
          </button>
        )}
      </div>
    </div>
  );
}

export default forwardRef<HTMLInputElement, Props>(Input);

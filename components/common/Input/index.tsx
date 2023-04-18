import {
  DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes,
} from 'react';

import clsx from 'clsx';

import ArrowLeftIcon from 'lib/assets/icons/arrow-left.svg';
import MenuIcon from 'lib/assets/icons/menu.svg';
import RemoveIcon from 'lib/assets/icons/remove-icon.svg';
import SearchIcon from 'lib/assets/icons/search.svg';

import styles from './index.module.scss';

interface Props extends DetailedHTMLProps<
InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
> {
  isFocused: boolean;
  value: string;
  placeholder: string;
  goBack: () => void;
  onRemove: () => void;
}

function Input({
  isFocused, goBack, value, placeholder, onRemove, ...rest
}: Props, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.prefixIconWrapper}>
        {!isFocused ? (
          <SearchIcon className={styles.searchIcon} />
        ) : (
          <ArrowLeftIcon onClick={goBack} />
        )}
      </div>
      <input
        ref={ref}
        placeholder={placeholder}
        value={value}
        className={clsx(styles.input, {
          [styles.visibleShadow]: !isFocused,
        })}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
      <div className={styles.suffixIconWrapper}>
        {(isFocused && value) && (
          <RemoveIcon onClick={onRemove} />
        )}
        {!isFocused && <MenuIcon />}
      </div>
    </div>
  );
}

export default forwardRef<HTMLInputElement, Props>(Input);

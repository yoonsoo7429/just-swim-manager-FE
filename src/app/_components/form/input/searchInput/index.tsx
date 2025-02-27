'use client';

import styles from './styles.module.scss';
import IconSearch from '@assets/icon_search.svg';

import { SearchInputProps } from '@types';
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

function _SearchInput(
  {
    value,
    onChange,
    placeholder = '검색',
  }: SearchInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className={styles.search}>
      <IconSearch className={styles.search_icon} />
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.searchInput}
      />
    </div>
  );
}

export default forwardRef(_SearchInput);

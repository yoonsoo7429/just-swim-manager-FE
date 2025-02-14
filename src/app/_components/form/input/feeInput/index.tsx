'use client';

import { FeeInputProps } from '@types';
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './styles.module.scss';
import { mergeRefs } from '@utils';

function _FeeInput(
  {
    name,
    valid = true,
    onChange = () => {},
    value = '',
    errorMessage = '',
    ...props
  }: FeeInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [fee, setFee] = useState<string>(String(value));
  const targetRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFee(String(value));
  }, [value]);

  const formatNumber = (num: string) => {
    let cleanValue = num.replace(/[^0-9]/g, '');
    if (!cleanValue) return '';

    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `₩${formattedValue}`;
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^0-9]/g, '');
    const formattedValue = formatNumber(rawValue);
    setFee(formattedValue);
    onChange({
      target: { name, value: rawValue },
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={styles.input_wrapper}>
      <input
        {...props}
        name={name}
        className={`${styles.text_input} ${!valid ? styles.invalid : ''}`}
        ref={mergeRefs(targetRef, ref)}
        type="text"
        value={fee}
        onChange={onChangeHandler}
      />

      {errorMessage && (
        <div className={styles.error_message}>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default forwardRef(_FeeInput);

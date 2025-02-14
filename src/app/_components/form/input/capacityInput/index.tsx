'use client';

import {
  ForwardedRef,
  forwardRef,
  useRef,
  InputHTMLAttributes,
  useState,
} from 'react';
import { CapacityInputProps } from '@types';

import styles from './styles.module.scss';
import { mergeRefs } from '@utils';

function _CapacityInput(
  {
    name,
    valid = true,
    value = '',
    onChange = () => {},
    errorMessage = '',
    ...props
  }: CapacityInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const targetRef = useRef<HTMLInputElement>(null);

  const [capacity, setCapacity] = useState(value);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^0-9]/g, '');
    setCapacity(newValue);
    onChange({
      target: { name, value: newValue },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={styles.input_wrapper}>
      <input
        {...props}
        name={name}
        className={`${styles.text_input} ${!valid ? styles.invalid : ''}`}
        ref={mergeRefs(targetRef, ref)}
        type="text"
        value={capacity}
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

export default forwardRef(_CapacityInput);

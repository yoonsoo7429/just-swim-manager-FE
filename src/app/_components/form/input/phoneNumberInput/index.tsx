'use client';

import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import { PhoneNumberInputProps } from '@types';

import styles from './styles.module.scss';

function _PhoneNumberInput(
  {
    name,
    errorMessage = '',
    onChange,
    value = '',
    ...props
  }: PhoneNumberInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [phoneParts, setPhoneParts] = useState({
    first: '',
    second: '',
    third: '',
  });

  useEffect(() => {
    if (value) {
      const [first, second, third] = String(value).split('-');
      setPhoneParts({
        first: first || '',
        second: second || '',
        third: third || '',
      });
    }
  }, [value]);

  useEffect(() => {
    const phoneNumber = `${phoneParts.first}-${phoneParts.second}-${phoneParts.third}`;
    onChange({
      target: {
        name: 'phoneNumber',
        value: phoneNumber,
      },
    } as ChangeEvent<HTMLInputElement>);
  }, [phoneParts, onChange]);

  const handleChange =
    (part: 'first' | 'second' | 'third') =>
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.replace(/\D/g, '');

      if (part === 'first' && value.length > 3) value = value.slice(0, 3);
      if ((part === 'second' || part === 'third') && value.length > 4)
        value = value.slice(0, 4);

      const newPhoneParts = { ...phoneParts, [part]: value };
      setPhoneParts(newPhoneParts);
    };

  return (
    <div className={styles.input_wrapper}>
      <div className={styles.phone_container}>
        <input
          {...props}
          type="tel"
          value={phoneParts.first}
          onChange={handleChange('first')}
          placeholder=""
          maxLength={3}
          className={styles.phone_input}
        />
        <span className={styles.hyphen}>-</span>
        <input
          type="tel"
          value={phoneParts.second}
          onChange={handleChange('second')}
          placeholder=""
          maxLength={4}
          className={styles.phone_input}
        />
        <span className={styles.hyphen}>-</span>
        <input
          type="tel"
          value={phoneParts.third}
          onChange={handleChange('third')}
          placeholder=""
          maxLength={4}
          className={styles.phone_input}
        />
      </div>
      {errorMessage && (
        <div className={styles.error_message}>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default forwardRef(_PhoneNumberInput);

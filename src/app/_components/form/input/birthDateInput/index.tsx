'use client';

import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import { BirhtDateInputProps } from '@types';

import styles from './styles.module.scss';

function _BirthDateInput({
  name,
  errorMessage = '',
  onChange,
  value = '',
  ...props
}: BirhtDateInputProps & InputHTMLAttributes<HTMLInputElement>) {
  const [birthParts, setBirthParts] = useState({
    year: '',
    month: '',
    date: '',
  });

  useEffect(() => {
    if (value) {
      const [year, month, date] = String(value).split('.');
      setBirthParts({ year: year || '', month: month || '', date: date || '' });
    }
  }, [value]);

  useEffect(() => {
    const birthDate = `${birthParts.year}.${birthParts.month}.${birthParts.date}`;
    onChange({
      target: {
        name: 'birthDate',
        value: birthDate,
      },
    } as ChangeEvent<HTMLInputElement>);
  }, [birthParts, onChange]);

  const handleChange =
    (part: 'year' | 'month' | 'date') =>
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.replace(/\D/g, '');

      if (part === 'year' && value.length > 4) value = value.slice(0, 4);
      if ((part === 'month' || part === 'date') && value.length > 2)
        value = value.slice(0, 2);

      const newBirthParts = { ...birthParts, [part]: value };
      setBirthParts(newBirthParts);
    };

  return (
    <div className={styles.input_wrapper}>
      <div className={styles.birth_container}>
        <input
          {...props}
          type="text"
          value={birthParts.year}
          onChange={handleChange('year')}
          placeholder="YYYY"
          maxLength={4}
          className={styles.birth_input}
        />
        <span className={styles.hyphen}>-</span>
        <input
          type="text"
          value={birthParts.month}
          onChange={handleChange('month')}
          placeholder="MM"
          maxLength={4}
          className={styles.birth_input}
        />
        <span className={styles.hyphen}>-</span>
        <input
          type="text"
          value={birthParts.date}
          onChange={handleChange('date')}
          placeholder="DD"
          maxLength={4}
          className={styles.birth_input}
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

export default forwardRef(_BirthDateInput);

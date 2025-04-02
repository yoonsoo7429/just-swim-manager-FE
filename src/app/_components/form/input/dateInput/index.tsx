'use client';

import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import { DateInputProps } from '@types';

import styles from './styles.module.scss';

function _dateInput(
  {
    name,
    errorMessage = '',
    onChange,
    value = '',
    ...props
  }: DateInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [dateParts, setDateParts] = useState({
    year: '',
    month: '',
    date: '',
  });

  useEffect(() => {
    if (value) {
      const [year, month, date] = String(value).split('.');
      setDateParts({ year: year || '', month: month || '', date: date || '' });
    }
  }, [value]);

  useEffect(() => {
    const { year, month, date } = dateParts;
    const dateData = year && month && date ? `${year}.${month}.${date}` : null;

    onChange({
      target: {
        name,
        value: dateData,
      },
    } as ChangeEvent<HTMLInputElement>);
  }, [dateParts, onChange]);

  const handleChange =
    (part: 'year' | 'month' | 'date') =>
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.replace(/\D/g, '');

      if (part === 'year' && value.length > 4) value = value.slice(0, 4);
      if ((part === 'month' || part === 'date') && value.length > 2)
        value = value.slice(0, 2);

      const newBirthParts = { ...dateParts, [part]: value };
      setDateParts(newBirthParts);
    };

  return (
    <div className={styles.input_wrapper}>
      <div className={styles.date_container}>
        <input
          {...props}
          type="text"
          value={dateParts.year}
          onChange={handleChange('year')}
          placeholder="YYYY"
          maxLength={4}
          className={styles.date_input}
        />
        <span className={styles.hyphen}>.</span>
        <input
          type="text"
          value={dateParts.month}
          onChange={handleChange('month')}
          placeholder="MM"
          maxLength={2}
          className={styles.date_input}
        />
        <span className={styles.hyphen}>.</span>
        <input
          type="text"
          value={dateParts.date}
          onChange={handleChange('date')}
          placeholder="DD"
          maxLength={2}
          className={styles.date_input}
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

export default forwardRef(_dateInput);

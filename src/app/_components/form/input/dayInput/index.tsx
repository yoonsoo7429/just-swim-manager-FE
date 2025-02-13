'use client';

import {
  DAY_ENG_TO_KOR,
  DAY_KOR_TO_ENG,
  WEEK_DAYS,
  WEEK_DAYS_TO_ENG,
} from '@data';
import { randomId } from '@utils';
import { DayInputProps, DayProps } from '@types';
import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './styles.module.scss';
import { mergeRefs } from '@utils';

const makeInitialValue = (
  defaultValue: string | number | readonly string[],
): DayProps => {
  const result = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  };

  const defaultValueString = Array.isArray(defaultValue)
    ? defaultValue.join('')
    : String(defaultValue);

  if (defaultValueString) {
    defaultValueString.split('').forEach((day) => {
      const englishDay = DAY_KOR_TO_ENG[day as keyof typeof DAY_KOR_TO_ENG];
      if (englishDay) {
        result[englishDay] = true;
      }
    });
  }

  return result;
};

const makeInputValue = (days: DayProps): string => {
  return WEEK_DAYS_TO_ENG.filter((day) => days[day])
    .map((day) => DAY_ENG_TO_KOR[day])
    .join(',');
};

function _DayInput(
  {
    name,
    valid,
    defaultValue = '',
    placeholder = '',
    errorMessage = '',
    onChange = () => {},
    ...props
  }: DayInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [days, setDays] = useState(makeInitialValue(defaultValue));

  const changeSelectedDay = (day: keyof typeof days) => {
    setDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  useEffect(() => {
    const inputValue = makeInputValue(days);
    if (onChange) {
      onChange({
        target: { name, value: inputValue },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  }, [days, onChange, name]);

  useEffect(() => {
    setDays(makeInitialValue(defaultValue));
  }, [defaultValue]);

  return (
    <div className={styles.input_wrapper}>
      {/* 요일 선택 버튼들 */}
      <div className={styles.day_buttons}>
        {WEEK_DAYS.map((day) => (
          <button
            key={day}
            className={`${styles.day_button} ${days[DAY_KOR_TO_ENG[day]] ? styles.selected : ''}`}
            onClick={() => changeSelectedDay(DAY_KOR_TO_ENG[day])}>
            <span>{day}</span>
          </button>
        ))}
      </div>

      <input
        {...props}
        name={name}
        ref={mergeRefs(inputRef, ref)}
        type="text"
        readOnly
        hidden
      />
    </div>
  );
}

export default forwardRef(_DayInput);

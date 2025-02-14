import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
  useRef,
} from 'react';
import { TimeInputProps } from '@types';
import { mergeRefs } from '@utils';
import IconClock from '@assets/icon_clock.svg';

import styled from './styles.module.scss';

const checkValue = (defalutValue: string) => {
  const regexp = /\d{2}:\d{2}-\d{2}:\d{2}$/g;
  return regexp.test(defalutValue);
};

const TimeBlock = ({
  selectedHour,
  selectedMinute,
  changeHour,
  changeMinute,
  placeholder = '',
  valid,
}: {
  selectedHour: string;
  selectedMinute: string;
  changeHour: (hour: string) => void;
  changeMinute: (minute: string) => void;
  placeholder?: string;
  valid: boolean;
}) => {
  const [isHourOpen, setIsHourOpen] = useState(false);
  const hourToggleDropdown = () => setIsHourOpen((prev) => !prev);
  const [isMinOpen, setIsMinOpen] = useState(false);
  const minToggleDropdown = () => setIsMinOpen((prev) => !prev);

  return (
    <div className={styled.input_wrapper}>
      <div className={`${styled.time_input} ${!valid && styled.invalid}`}>
        {/* Hour Select */}
        <div className={styled.select_wrapper}>
          <div className={styled.select_display} onClick={hourToggleDropdown}>
            {selectedHour}
          </div>
          {isHourOpen && (
            <ul className={styled.select_dropdown}>
              {Array.from({ length: 24 }, (_, i) => (
                <li
                  key={i}
                  className={styled.select_option}
                  onClick={() => {
                    changeHour(String(i).padStart(2, '0'));
                    setIsHourOpen(false);
                  }}>
                  {String(i).padStart(2, '0')}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span>:</span>
        {/* Minute Select */}
        <div className={styled.select_wrapper}>
          <div className={styled.select_display} onClick={minToggleDropdown}>
            {selectedMinute}
          </div>
          {isMinOpen && (
            <ul className={styled.select_dropdown}>
              {['00', '15', '30', '45'].map((minute) => (
                <li
                  key={minute}
                  className={styled.select_option}
                  onClick={() => {
                    changeMinute(minute);
                    setIsMinOpen(false);
                  }}>
                  {minute}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

function _TimeInput(
  {
    name,
    valid = true,
    defaultValue = '',
    defaultTimeValue = '06:00',
    errorMessage = '',
    ...props
  }: TimeInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const inputRef = useRef<HTMLInputElement>(null);

  const flag = checkValue(defaultValue);
  const defaultStartHour = flag ? defaultValue.slice(0, 2) : '06';
  const defaultStartMinute = flag ? defaultValue.slice(3, 5) : '00';
  const defaultEndHour = flag ? defaultValue.slice(6, 8) : '07';
  const defaultEndMinute = flag ? defaultValue.slice(9) : '00';

  const [startHour, setStartHour] = useState<string>(defaultStartHour);
  const [startMinute, setStartMinute] = useState<string>(defaultStartMinute);
  const [endHour, setEndHour] = useState<string>(defaultEndHour);
  const [endMinute, setEndMinute] = useState<string>(defaultEndMinute);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute(
        'value',
        `${startHour}:${startMinute}-${endHour}:${endMinute}`,
      );
      inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, [startHour, startMinute, endHour, endMinute]);

  return (
    <div className={styled.wrapper}>
      <TimeBlock
        selectedHour={startHour}
        selectedMinute={startMinute}
        changeHour={setStartHour}
        changeMinute={setStartMinute}
        placeholder="시작 시간"
        valid={valid}
      />
      <div className={styled.divider}>
        <span>~</span>
      </div>
      <TimeBlock
        selectedHour={endHour}
        selectedMinute={endMinute}
        changeHour={setEndHour}
        changeMinute={setEndMinute}
        placeholder="종료 시간"
        valid={valid}
      />
      {errorMessage && (
        <div className={styled.error_message}>
          <p>{errorMessage}</p>
        </div>
      )}
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

export default forwardRef(_TimeInput);

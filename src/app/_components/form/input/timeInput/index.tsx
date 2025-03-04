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
    defaultTimeValue = '06:00',
    errorMessage = '',
    onChange = () => {},
    ...props
  }: TimeInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const inputRef = useRef<HTMLInputElement>(null);

  const flag = checkValue(props.value as string);
  const defaultStartHour = flag ? (props.value as string).slice(0, 2) : '00';
  const defaultStartMinute = flag ? (props.value as string).slice(3, 5) : '00';
  const defaultEndHour = flag ? (props.value as string).slice(6, 8) : '00';
  const defaultEndMinute = flag ? (props.value as string).slice(9) : '00';

  const [startHour, setStartHour] = useState<string>(defaultStartHour);
  const [startMinute, setStartMinute] = useState<string>(defaultStartMinute);
  const [endHour, setEndHour] = useState<string>(defaultEndHour);
  const [endMinute, setEndMinute] = useState<string>(defaultEndMinute);

  const timeValue = `${startHour}:${startMinute}-${endHour}:${endMinute}`;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = timeValue;
    }
  }, [timeValue]);

  const handleChange = () => {
    if (inputRef.current) {
      inputRef.current.value = timeValue;
      onChange({ target: inputRef.current } as any);
    }
  };

  useEffect(() => {
    handleChange();
  }, [timeValue]);

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
        type="hidden"
        value={timeValue}
        readOnly
        onChange={handleChange}
      />
    </div>
  );
}

export default forwardRef(_TimeInput);

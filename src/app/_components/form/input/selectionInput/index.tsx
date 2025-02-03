'use client';

import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import { mergeRefs } from '@utils';

import styled from './styles.module.scss';
import { SelectionInputProps } from '@types';

function _SelectionInput(
  {
    name,
    options,
    valid,
    onChange = () => {},
    errorMessage = '',
    ...props
  }: SelectionInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [selection, setSelection] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelection = (value: string) => {
    setSelection(value);
    if (inputRef.current) {
      inputRef.current.value = value;
      inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  useEffect(() => {
    if (selection && inputRef.current) {
      onChange({ target: inputRef.current } as any);
    }
  }, [selection, onChange]);

  return (
    <div className={styled.input_wrapper}>
      <div className={styled.selection_buttons}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`${styled.selection_button} ${selection === option ? styled.selected : ''}`}
            onClick={() => handleSelection(option)}>
            {option}
          </button>
        ))}
      </div>
      <input
        {...props}
        name={name}
        ref={mergeRefs(inputRef, ref)}
        type="hidden"
        value={selection || ''}
        readOnly
      />
      {errorMessage && (
        <div className={styled.error_message}>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

/**
 * 상위 컴포넌트에서 SelectGenderInput 대한 className을 직접 설정하지 않도록 주의! (동작하지 않음)
 * @param {string} name input의 name
 * @param {string} errorMessage 에러 메시지
 * @param {import('react').MutableRefObject<HTMLInputElement>} ref input의 ref attribute에 연결할 target
 * @param {import('react').InputHTMLAttributes<HTMLInputElement>} attributes input에서 사용 가능한 모든 attributes
 */
export default forwardRef(_SelectionInput);

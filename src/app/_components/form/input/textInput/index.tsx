'use client';

import {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useRef,
} from 'react';

import { TextInputProps } from '@types';
import IconInputValid from '@assets/icon_input_valid.svg';
import { mergeRefs } from '@utils';

import styles from './styles.module.scss';

function _TextInput(
  {
    name,
    valid = true,
    onChange = () => {},
    errorMessage = '',
    ...props
  }: TextInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const targetRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <div className={styles.input_wrapper}>
      <input
        {...props}
        name={name}
        className={`${styles.text_input} ${!valid ? styles.invalid : ''}`}
        ref={mergeRefs(targetRef, ref)}
        type="text"
        onChange={onChangeHandler}
      />
      {valid && <IconInputValid width={18} height={18} fill="#3689FF" />}

      {errorMessage && (
        <div className={styles.error_message}>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

/**
 * 상위 컴포넌트에서 TextInput 대한 className을 직접 설정하지 않도록 주의! (동작하지 않음)
 * @param {string} name input의 name
 * @param {boolean} valid input이 유효한지 여부
 * @param {number} maxLength input의 최대 길이 (출력 용도, 유효성에는 영향 x)
 * @param {import('react').MutableRefObject<HTMLInputElement>} ref input의 ref attribute에 연결할 target
 * @param {import('react').InputHTMLAttributes<HTMLInputElement>} attributes input에서 사용 가능한 모든 attributes
 */
export default forwardRef(_TextInput);

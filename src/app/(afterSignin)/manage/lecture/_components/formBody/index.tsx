'use client';

import styles from './styles.module.scss';

import { HTMLAttributes, MouseEvent, useState } from 'react';
import { lectureSchema, LectureType } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LectureLevel } from '@types';

import { formAction } from './action';
import { FormButton, HistoryBackHeader } from '@components';
import TextInput from '@/_components/form/input/textInput';
import SelectionInput from '@/_components/form/input/selectionInput';
import DayInput from '@/_components/form/input/dayInput';
import TimeInput from '@/_components/form/input/timeInput';
import FeeInput from '@/_components/form/input/feeInput';
import CapacityInput from '@/_components/form/input/capacityInput';

import IconCheckboxInvalid from '@assets/icon_checkbox_invalid.svg';

function InputWrapper({
  children,
  name,
  required = false,
  ...props
}: {
  children?: React.ReactNode;
  name: string;
  required?: boolean;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={styles.fieldset} {...props}>
      <div className={styles.fieldset_title}>
        <p>{name}</p>
        {required && <span>{'(필수)'}</span>}
      </div>
      {children}
    </div>
  );
}

export function FormBody({
  type = 'add',
  id = '',
  lecture,
}: {
  type?: 'add' | 'modify';
  id?: string;
  lecture?: LectureType;
}) {
  const isModify = type === 'modify';

  const [serverErrors, setServerErrors] = useState<{
    duplicate: string;
  }>({ duplicate: '' });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LectureType>({
    resolver: zodResolver(lectureSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async (input: LectureType) => {
    // 요금 처리
    const getRawValue = () => {
      return input.lectureFee.replace(/[^0-9]/g, '');
    };

    const data = {
      ...input,
      lectureFee: getRawValue(),
      lectureCapacity: Number(input.lectureCapacity),
    };

    const result = await formAction(data, type, id);

    setServerErrors({
      ...result,
    });
  });

  const onValid = async () => {
    await onSubmit();
  };

  const clearDuplicateError = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setServerErrors((s) => ({
      ...s,
      duplicate: '',
    }));
  };

  return (
    <div className={styles.container}>
      <HistoryBackHeader
        title={type === 'add' ? '수업 정보 입력' : '수업 정보 수정하기'}
      />
      <form action={onValid} className={styles.content_container}>
        <div className={styles.left_container}>
          {/* 수업명 */}
          <InputWrapper
            name="수업명"
            required={true}
            onClick={clearDuplicateError}>
            <TextInput
              {...register('lectureTitle')}
              placeholder="수업명을 입력해주세요"
              valid={!errors.lectureTitle}
              value={lecture?.lectureTitle}
              errorMessage={errors.lectureTitle?.message}
              defaultValue={isModify ? lecture?.lectureTitle : ''}
            />
          </InputWrapper>

          {/* 급수 */}
          <InputWrapper
            name="급수"
            required={true}
            onClick={clearDuplicateError}>
            <SelectionInput
              options={[
                LectureLevel.BEGGINER_LEVEL,
                LectureLevel.INTERMEDIATE_LEVEL,
                LectureLevel.ADVANCED_LEVEL,
                LectureLevel.MASTER_LEVEL,
              ]}
              {...register('lectureLevel')}
              placeholder="급수를 선택해주세요"
              value={lecture?.lectureLevel}
              valid={!errors.lectureLevel}
              errorMessage={errors.lectureLevel?.message}
              defaultValue={isModify ? lecture?.lectureLevel : ''}
            />
          </InputWrapper>

          {/* 수업 요일 */}
          <InputWrapper
            name="수업 요일"
            required={true}
            onClick={clearDuplicateError}>
            <DayInput
              {...register('lectureDays')}
              valid={!errors.lectureDays}
              value={lecture?.lectureDays || ''}
              errorMessage={errors.lectureDays?.message}
              defaultValue={isModify ? lecture?.lectureDays : ''}
            />
          </InputWrapper>
        </div>

        <div className={styles.right_container}>
          {/* 수업 시간 */}
          <InputWrapper
            name="수업 시간"
            required={true}
            onClick={clearDuplicateError}>
            <TimeInput
              {...register('lectureTime')}
              valid={!errors.lectureTime}
              value={lecture?.lectureTime}
              errorMessage={errors.lectureTime?.message}
              defaultValue={isModify ? lecture?.lectureTime : ''}
            />
          </InputWrapper>

          {/* 수업료 */}
          <InputWrapper
            name="수업료"
            required={true}
            onClick={clearDuplicateError}>
            <FeeInput
              {...register('lectureFee')}
              placeholder="수업료"
              valid={!errors.lectureFee}
              value={lecture?.lectureFee}
              errorMessage={errors.lectureFee?.message}
              defaultValue={isModify ? lecture?.lectureFee : ''}
            />
          </InputWrapper>

          {/* 수용 가능 인원 */}
          <InputWrapper
            name="인원수"
            required={true}
            onClick={clearDuplicateError}>
            <CapacityInput
              {...register('lectureCapacity')}
              placeholder="인원수를 입력해주세요"
              valid={!errors.lectureCapacity}
              value={lecture?.lectureCapacity}
              errorMessage={errors.lectureCapacity?.message}
              defaultValue={isModify ? lecture?.lectureCapacity : ''}
            />
          </InputWrapper>

          <div className={styles.button_container}>
            <FormButton
              text="확인"
              active={isValid && !serverErrors.duplicate}
            />
          </div>
        </div>
      </form>
      {serverErrors.duplicate && (
        <div className={styles.error_container}>
          {serverErrors.duplicate && (
            <div className={styles.error_message}>
              <IconCheckboxInvalid />
              <p>{serverErrors.duplicate}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

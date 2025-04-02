'use client';

import styles from './styles.module.scss';
import IconCheckboxInvalid from '@assets/icon_checkbox_invalid.svg';

import { HTMLAttributes, MouseEvent, useEffect, useState } from 'react';
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
import DateInput from '@/_components/form/input/dateInput';

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
    title: string;
    duplicate: string;
  }>({ title: '', duplicate: '' });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LectureType>({
    resolver: zodResolver(lectureSchema),
    mode: 'onChange',
  });

  const watchValues = watch();
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (isModify && lecture) {
      const hasChanged = Object.keys(watchValues).some(
        (key) =>
          watchValues[key as keyof LectureType] !==
          lecture[key as keyof LectureType],
      );
      setIsChanged(hasChanged);
    } else {
      setIsChanged(true);
    }
  }, [watchValues, lecture, isModify]);

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

  const clearTitleError = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setServerErrors((s) => ({
      ...s,
      title: '',
    }));
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
          <InputWrapper name="수업명" required={true} onClick={clearTitleError}>
            <TextInput
              {...register('lectureTitle')}
              placeholder="수업명을 입력해주세요"
              valid={!errors.lectureTitle && !serverErrors.title}
              value={isModify ? lecture?.lectureTitle : ''}
              errorMessage={errors.lectureTitle?.message}
            />
          </InputWrapper>

          {/* 급수 */}
          <InputWrapper
            name="급수"
            required={true}
            onClick={clearDuplicateError}>
            <SelectionInput
              options={Object.values(LectureLevel)}
              {...register('lectureLevel')}
              placeholder="급수를 선택해주세요"
              value={isModify ? lecture?.lectureLevel : ''}
              valid={!errors.lectureLevel}
              errorMessage={errors.lectureLevel?.message}
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
              value={isModify ? lecture?.lectureDays : ''}
              errorMessage={errors.lectureDays?.message}
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
              value={isModify ? lecture?.lectureTime : ''}
              errorMessage={errors.lectureTime?.message}
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
              value={isModify ? lecture?.lectureFee : ''}
              errorMessage={errors.lectureFee?.message}
            />
          </InputWrapper>

          {/* 수용 가능 인원 */}
          <InputWrapper
            name="수업 인원"
            required={true}
            onClick={clearDuplicateError}>
            <CapacityInput
              {...register('lectureCapacity')}
              placeholder="수업 인원"
              valid={!errors.lectureCapacity}
              value={isModify ? lecture?.lectureCapacity : ''}
              errorMessage={errors.lectureCapacity?.message}
            />
          </InputWrapper>

          {/* 수업 날짜 */}
          <InputWrapper name="수업 날짜" onClick={clearDuplicateError}>
            <DateInput
              {...register('lectureDate')}
              placeholder="수업 날짜"
              valid={!errors.lectureDate}
              value={isModify ? (lecture?.lectureDate ?? undefined) : undefined}
              errorMessage={errors.lectureDate?.message}
            />
          </InputWrapper>

          <div className={styles.button_container}>
            <FormButton
              text="확인"
              active={isValid && isChanged && !serverErrors.duplicate}
            />
          </div>
        </div>
      </form>
      {(serverErrors.title || serverErrors.duplicate) && (
        <div className={styles.error_container}>
          {serverErrors.title && (
            <div className={styles.error_message}>
              <IconCheckboxInvalid />
              <p>{serverErrors.title}</p>
            </div>
          )}
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

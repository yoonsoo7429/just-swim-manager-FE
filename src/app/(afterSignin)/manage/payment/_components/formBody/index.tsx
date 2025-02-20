'use client';

import styles from './styles.module.scss';

import { HTMLAttributes, MouseEvent, useEffect, useState } from 'react';
import { paymentSchema, PaymentType } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formAction } from './action';
import { FormButton, HistoryBackHeader } from '@components';
import TextInput from '@/_components/form/input/textInput';
import SelectionInput from '@/_components/form/input/selectionInput';
import DayInput from '@/_components/form/input/dayInput';
import TimeInput from '@/_components/form/input/timeInput';
import FeeInput from '@/_components/form/input/feeInput';
import CapacityInput from '@/_components/form/input/capacityInput';

import IconCheckboxInvalid from '@assets/icon_checkbox_invalid.svg';
import { LectureProps, PaymentProps } from '@types';
import { getLecturesInfo, getPaymentsInfo } from '@apis';

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
  payment,
}: {
  type?: 'add' | 'modify';
  id?: string;
  payment?: PaymentType;
}) {
  const isModify = type === 'modify';

  const [serverErrors, setServerErrors] = useState<{
    duplicate: string;
  }>({ duplicate: '' });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<PaymentType>({
    resolver: zodResolver(paymentSchema),
    mode: 'onChange',
  });

  console.log(watch());

  const [lectures, setLectures] = useState<LectureProps[]>([]);
  const [selectedLecture, setSelectedLecture] = useState<LectureProps | null>(
    null,
  );
  const [payments, setPayments] = useState<PaymentProps[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentProps | null>(
    null,
  );

  useEffect(() => {
    async function fetchLectures() {
      const lectureList = await getLecturesInfo();
      setLectures(lectureList);
    }
    fetchLectures();
  }, []);

  const handleCourseSelect = async (lecture: LectureProps) => {
    setSelectedLecture(lecture);
    const paymentList = await getPaymentsInfo(lecture.courseId);
    setPayments(paymentList);
    // 오른쪽 영역 초기화
    setSelectedPayment(null);
    setInputPaymentFee('');
    setInputPaymentDate('');
  };

  const onSubmit = handleSubmit(async (input: PaymentType) => {
    // 요금 처리
    const getRawValue = () => {
      return input.paymentFee.replace(/[^0-9]/g, '');
    };

    const data = {
      ...input,
      paymentFee: getRawValue(),
      paymentCapacity: Number(input.paymentCapacity),
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
          <h3>수업 리스트</h3>
          <ul>
            {lectures.map((lecture) => (
              <li
                key={lecture.lectureId}
                onClick={() => handleCourseSelect(lecture)}
                className={
                  selectedCourse?.lectureId === lecture.lectureId
                    ? styles.active
                    : ''
                }>
                {lecture.lectureTitle} ({lecture.lectureFee})
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.right_container}>
          {/* 수업 시간 */}
          <InputWrapper
            name="수업 시간"
            required={true}
            onClick={clearDuplicateError}>
            <TimeInput
              {...register('paymentTime')}
              valid={!errors.paymentTime}
              value={payment?.paymentTime}
              errorMessage={errors.paymentTime?.message}
              defaultValue={isModify ? payment?.paymentTime : ''}
            />
          </InputWrapper>

          {/* 수업료 */}
          <InputWrapper
            name="수업료"
            required={true}
            onClick={clearDuplicateError}>
            <FeeInput
              {...register('paymentFee')}
              placeholder="수업료"
              valid={!errors.paymentFee}
              value={payment?.paymentFee}
              errorMessage={errors.paymentFee?.message}
              defaultValue={isModify ? payment?.paymentFee : ''}
            />
          </InputWrapper>

          {/* 수용 가능 인원 */}
          <InputWrapper
            name="인원수"
            required={true}
            onClick={clearDuplicateError}>
            <CapacityInput
              {...register('paymentCapacity')}
              placeholder="인원수를 입력해주세요"
              valid={!errors.paymentCapacity}
              value={payment?.paymentCapacity}
              errorMessage={errors.paymentCapacity?.message}
              defaultValue={isModify ? payment?.paymentCapacity : ''}
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

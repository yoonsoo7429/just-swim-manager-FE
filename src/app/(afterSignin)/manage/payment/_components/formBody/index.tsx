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
import { LectureProps, MemberInfoForLectureProps } from '@types';
import { getLecturesInfo, getMembersInfo } from '@apis';

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
  const [members, setMembers] = useState<MemberInfoForLectureProps[]>([]);
  const [selectedMember, setSelectedMember] =
    useState<MemberInfoForLectureProps | null>(null);

  useEffect(() => {
    async function fetchLectures() {
      const lectureList = await getLecturesInfo();
      setLectures(lectureList);
    }
    fetchLectures();
  }, []);

  const handleLectureSelect = async (lecture: LectureProps) => {
    setSelectedLecture(lecture);

    const memberList = await getMembersInfo(lecture.lectureId);
    setMembers(memberList);

    setSelectedMember(null);
  };

  const onSubmit = handleSubmit(async (input: PaymentType) => {
    const data = {
      ...input,
      lectureId: selectedLecture?.lectureId,
      customerId: selectedMember?.customerId,
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

  const paymentFee = selectedLecture?.lectureFee || payment?.paymentFee || '';
  const paymentDate =
    payment?.paymentDate ||
    new Date().toLocaleDateString('ko-KR').replace(/\./g, '.');

  return (
    <div className={styles.container}>
      <HistoryBackHeader
        title={type === 'add' ? '결제 정보 입력' : '결제 정보 수정하기'}
      />
      <form action={onValid} className={styles.content_container}>
        <div className={styles.left_container}>
          <h3>수업 리스트</h3>
          <ul>
            {lectures.map((lecture) => (
              <li
                key={lecture.lectureId}
                onClick={() => handleLectureSelect(lecture)}
                className={
                  selectedLecture?.lectureId === lecture.lectureId
                    ? styles.active
                    : ''
                }>
                {lecture.lectureTitle} ({lecture.lectureFee})
              </li>
            ))}
          </ul>

          {/* 고객 선택 */}
          {/* {selectedLecture && (
            <InputWrapper name="고객 선택" required>
              <SelectionInput
                options={customers.map((customer) => ({
                  label: customer.name,
                  value: customer.customerId,
                }))}
                onChange={(e) => setSelectedCustomer(customers.find((c) => c.customerId === e.target.value))}
                value={selectedCustomer?.customerId}
                errorMessage={errors.paymentCustomer?.message}
              />
            </InputWrapper>
          )} */}
        </div>

        <div className={styles.right_container}>
          <div className={styles.button_container}>
            <FormButton
              text="확인"
              active={isValid && !serverErrors.duplicate}
            />
          </div>
        </div>
      </form>
      {/* {(serverErrors.title || serverErrors.duplicate) && (
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
      )} */}
    </div>
  );
}

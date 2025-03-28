'use client';

import styles from './styles.module.scss';
import IconCheckboxInvalid from '@assets/icon_checkbox_invalid.svg';

import { HTMLAttributes, MouseEvent, useEffect, useState } from 'react';
import { paymentSchema, PaymentType } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formAction } from './action';
import { FormButton, HistoryBackHeader } from '@components';
import FeeInput from '@/_components/form/input/feeInput';
import DateInput from '@/_components/form/input/dateInput';
import { LectureProps, MemberProps, UserProps } from '@types';
import { getLecturesInfo, getMembersInfo } from '@apis';
import { dateFormate } from '@utils';

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
    setValue,
    watch,
  } = useForm<PaymentType>({
    resolver: zodResolver(paymentSchema),
    mode: 'onChange',
  });

  const [lectures, setLectures] = useState<LectureProps[]>([]);
  const [selectedLecture, setSelectedLecture] = useState<LectureProps | null>(
    null,
  );
  const [members, setMembers] = useState<MemberProps[]>([]);
  const [registrationUser, setRegistrationUser] = useState<UserProps[]>([]);
  const [selectedMember, setSelectedMember] = useState<MemberProps | null>(null);

  useEffect(() => {
    async function fetchLectures() {
      const lectureList = await getLecturesInfo();
      setLectures(lectureList);
    }
    fetchLectures();
  }, []);

  useEffect(() => {
    if (isModify && payment) {
      setValue('paymentDate', payment.paymentDate || null);
      setValue('paymentFee', payment.paymentFee);
      setValue('lectureId', payment.lectureId);
      setValue('userId', payment.userId);

      // @ts-ignore
      setSelectedLecture(payment.lecture);
      // @ts-ignore
      setSelectedMember(payment.user);

      // @ts-ignore
      setLectures([payment.lecture]);
      // @ts-ignore
      setRegistrationUser([payment.user]);
    }
  }, [isModify, payment, setValue]);

  const handleLectureSelect = async (lecture: LectureProps) => {
    if (isModify) return;

    setSelectedLecture(lecture);

    const memberList = await getMembersInfo(lecture.lectureId);
    setMembers(memberList);
    setSelectedMember(null);
  };

  const handleMemberSelect = async (member: MemberProps) => {
    if (isModify) return;
    setSelectedMember(member);
  };

  const onSubmit = handleSubmit(async (input: PaymentType) => {
    const data = {
      ...input,
      // @ts-ignore
      lectureId: parseInt(selectedLecture?.lectureId),
      userId:
        // @ts-ignore
        parseInt(selectedMember?.userId) ||
        // @ts-ignore
        parseInt(selectedLecture?.member.user.userId),
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
        title={type === 'add' ? '결제 정보 입력' : '결제 정보 수정하기'}
      />
      <form action={onValid} className={styles.content_container}>
        <div className={styles.left_container}>
          <h3>수업 선택</h3>
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
        </div>

        {/* 고객 선택 */}
        <div className={styles.mid_container}>
          <h3>고객 선택</h3>
          <ul>
            {isModify && registrationUser.length > 0
              ? registrationUser.map((user) => (
                  <li key={user.userId} className={styles.active}>
                    {user.name} ({user.birth})
                  </li>
                ))
              : members.map((member) => (
                  <li
                    key={member.memberId}
                    onClick={() => handleMemberSelect(member)}
                    className={
                      selectedMember?.memberId === member.memberId
                        ? styles.active
                        : ''
                    }>
                    {member.user.name} ({member.user.birth})
                  </li>
                ))}
          </ul>
        </div>

        <div className={styles.right_container}>
          {/* 결제 금액 */}
          <InputWrapper
            name="결제 금액"
            required={true}
            onClick={clearDuplicateError}>
            <FeeInput
              {...register('paymentFee')}
              placeholder="결제 금액"
              valid={!errors.paymentFee}
              value={watch('paymentFee')}
              errorMessage={errors.paymentFee?.message}
            />
          </InputWrapper>

          {/* 결제 날짜 */}
          <InputWrapper
            name="결제 날짜"
            required={true}
            onClick={clearDuplicateError}>
            <DateInput
              {...register('paymentDate')}
              valid={!errors.paymentDate}
              value={watch('paymentDate') || ''}
              errorMessage={errors.paymentDate?.message}
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

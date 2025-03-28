'use client';

import styles from './styles.module.scss';

import { HTMLAttributes, MouseEvent, useEffect, useState } from 'react';
import { customerSchema, CustomerType } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomerGender, CustomerProgress } from '@types';

import { formAction } from './action';
import { FormButton, HistoryBackHeader } from '@components';
import TextInput from '@/_components/form/input/textInput';
import SelectionInput from '@/_components/form/input/selectionInput';
import PhoneNumberInput from '@/_components/form/input/phoneNumberInput';
import DateInput from '@/_components/form/input/dateInput';

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
  customer,
}: {
  type?: 'add' | 'modify';
  id?: string;
  customer?: CustomerType;
}) {
  const isModify = type === 'modify';

  const [serverErrors, setServerErrors] = useState<{
    duplicate: string;
  }>({ duplicate: '' });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CustomerType>({
    resolver: zodResolver(customerSchema),
    mode: 'onChange',
  });

  const watchValues = watch();
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (isModify && customer) {
      const hasChanged = Object.keys(watchValues).some(
        (key) =>
          watchValues[key as keyof CustomerType] !==
          customer[key as keyof CustomerType],
      );
      setIsChanged(hasChanged);
    } else {
      setIsChanged(true);
    }
  }, [watchValues, customer, isModify]);

  const onSubmit = handleSubmit(async (input: CustomerType) => {
    const data = {
      ...input,
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
        title={type === 'add' ? '고객 정보 입력' : '고객 정보 수정하기'}
      />
      <form action={onValid} className={styles.content_container}>
        <div className={styles.left_container}>
          {/* 이름 */}
          <InputWrapper
            name="이름"
            required={true}
            onClick={clearDuplicateError}>
            <TextInput
              {...register('name')}
              placeholder="이름을 입력해주세요"
              valid={!errors.name}
              value={isModify ? customer?.name : ''}
              errorMessage={errors.name?.message}
            />
          </InputWrapper>

          {/* 성별 */}
          <InputWrapper
            name="성별"
            required={true}
            onClick={clearDuplicateError}>
            <SelectionInput
              options={Object.values(CustomerGender)}
              {...register('gender')}
              placeholder="성별을 선택해주세요"
              value={isModify ? customer?.gender : ''}
              valid={!errors.gender}
              errorMessage={errors.gender?.message}
            />
          </InputWrapper>

          {/* 전화 번호 */}
          <InputWrapper
            name="전화 번호"
            required={true}
            onClick={clearDuplicateError}>
            <PhoneNumberInput
              {...register('phoneNumber')}
              valid={!errors.phoneNumber}
              value={isModify ? customer?.phoneNumber : ''}
              errorMessage={errors.phoneNumber?.message}
            />
          </InputWrapper>

          {/* 생년 월일 */}
          <InputWrapper
            name="생년월일"
            required={true}
            onClick={clearDuplicateError}>
            <DateInput
              {...register('birthDate')}
              valid={!errors.birthDate}
              value={isModify ? customer?.birthDate : ''}
              errorMessage={errors.birthDate?.message}
            />
          </InputWrapper>
        </div>

        <div className={styles.right_container}>
          {/* 주소 */}
          <InputWrapper
            name="주소"
            required={true}
            onClick={clearDuplicateError}>
            <TextInput
              {...register('address')}
              placeholder="주소를 입력해주세요"
              valid={!errors.address}
              value={isModify ? customer?.address : ''}
              errorMessage={errors.address?.message}
            />
          </InputWrapper>

          {/* 진도 */}
          <InputWrapper
            name="진도"
            required={true}
            onClick={clearDuplicateError}>
            <SelectionInput
              options={Object.values(CustomerProgress)}
              {...register('progress')}
              placeholder="진도를 선택해주세요"
              value={isModify ? customer?.progress : ''}
              valid={!errors.progress}
              errorMessage={errors.progress?.message}
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

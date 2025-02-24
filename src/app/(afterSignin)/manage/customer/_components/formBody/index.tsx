'use client';

import styles from './styles.module.scss';

import { HTMLAttributes, MouseEvent, useState } from 'react';
import { customerSchema, CustomerType } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomerGender } from '@types';

import { formAction } from './action';
import { FormButton, HistoryBackHeader } from '@components';
import TextInput from '@/_components/form/input/textInput';
import SelectionInput from '@/_components/form/input/selectionInput';
import PhoneNumberInput from '@/_components/form/input/phoneNumberInput';
import BirthDateInput from '@/_components/form/input/birthDateInput';

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
    formState: { errors, isValid },
  } = useForm<CustomerType>({
    resolver: zodResolver(customerSchema),
    mode: 'onChange',
    defaultValues: customer,
  });

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
              value={customer?.name}
              errorMessage={errors.name?.message}
            />
          </InputWrapper>

          {/* 성별 */}
          <InputWrapper
            name="성별"
            required={true}
            onClick={clearDuplicateError}>
            <SelectionInput
              options={[CustomerGender.Man, CustomerGender.Woman]}
              {...register('gender')}
              placeholder="성별을 선택해주세요"
              value={customer?.gender}
              valid={!errors.gender}
              errorMessage={errors.gender?.message}
              defaultValue={isModify ? customer?.gender : ''}
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
              value={customer?.phoneNumber}
              errorMessage={errors.phoneNumber?.message}
              defaultValue={isModify ? customer?.phoneNumber : ''}
            />
          </InputWrapper>
        </div>

        <div className={styles.right_container}>
          {/* 생년 월일 */}
          <InputWrapper
            name="생년월일"
            required={true}
            onClick={clearDuplicateError}>
            <BirthDateInput
              {...register('birthDate')}
              valid={!errors.birthDate}
              value={customer?.birthDate}
              errorMessage={errors.birthDate?.message}
              defaultValue={isModify ? customer?.birthDate : ''}
            />
          </InputWrapper>

          {/* 주소 */}
          <InputWrapper
            name="주소"
            required={true}
            onClick={clearDuplicateError}>
            <TextInput
              {...register('address')}
              placeholder="주소를 입력해주세요"
              valid={!errors.address}
              value={customer?.address}
              errorMessage={errors.address?.message}
              defaultValue={isModify ? customer?.address : ''}
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

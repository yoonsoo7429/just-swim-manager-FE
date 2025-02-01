'use client';

import styles from './styles.module.scss';

import { HTMLAttributes, MouseEvent, useState } from 'react';
import { customerSchema, CustomerType } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formAction } from './action';
import { HistoryBackHeader } from '@components';
import TextInput from '@/_components/form/input/textInput';

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
      <HistoryBackHeader title={'고객 정보 입력'} />
      <div className={styles.content_container}>
        <div className={styles.left_container}>
          <InputWrapper
            name="이름"
            required={true}
            onClick={clearDuplicateError}>
            <TextInput
              {...register('name')}
              placeholder="이름을 입력해주세요"
              valid={!errors.name}
              errorMessage={errors.name?.message}
              defaultValue={isModify ? customer?.name : ''}
            />
          </InputWrapper>
          <InputWrapper
            name="성별"
            required={true}
            onClick={clearDuplicateError}></InputWrapper>
          <InputWrapper
            name="전화 번호"
            required={true}
            onClick={clearDuplicateError}></InputWrapper>
        </div>
        <div className={styles.right_container}>
          <InputWrapper
            name="생년월일"
            required={true}
            onClick={clearDuplicateError}></InputWrapper>
          <InputWrapper
            name="주소"
            required={true}
            onClick={clearDuplicateError}>
            <TextInput
              {...register('address')}
              placeholder="주소를 입력해주세요요"
              valid={!errors.address}
              errorMessage={errors.address?.message}
              defaultValue={isModify ? customer?.address : ''}
            />
          </InputWrapper>
        </div>
      </div>
    </div>
  );
}

'use client';

import styles from './styles.module.scss';

import { HTMLAttributes, MouseEvent, useState } from 'react';
import { customerSchema, CustomerType } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formAction } from './action';
import { HistoryBackHeader } from '@/_components';

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
    </div>
  );
}

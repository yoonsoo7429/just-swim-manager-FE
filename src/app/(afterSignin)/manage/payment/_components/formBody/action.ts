import { createPayment, getPaymentsInfo, updatePayment } from '@apis';
import { PaymentBasicProps } from '@types';
import { notFound, redirect } from 'next/navigation';

export async function formAction(
  data: PaymentBasicProps,
  type: 'add' | 'modify',
  id: string,
) {
  const payments = await getPaymentsInfo();

  const errors = {
    title: '',
    duplicate: '',
  };

  let valid = true;

  for (const payment of payments) {
    if (data.paymentTitle === payment.paymentTitle) {
      valid = false;
      errors.title = '중복된 강의명이 존재합니다.';
    }
  }

  if (!valid) {
    return errors;
  }

  if (type === 'modify') {
    const result = await updatePayment(data, id);

    if (result.status) {
      redirect('/manage/payment');
    } else {
      return notFound();
    }
  } else {
    const result = await createPayment(data);

    if (result.status) {
      redirect('/manage/payment');
    } else {
      return notFound();
    }
  }
}

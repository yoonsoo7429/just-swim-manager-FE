import { createPayment, getPaymentsInfo, updatePayment } from '@apis';
import { PaymentBasicProps } from '@types';
import { notFound, redirect } from 'next/navigation';

export async function formAction(
  data: PaymentBasicProps,
  type: 'add' | 'modify',
  id: string,
) {
  const errors = {
    duplicate: '',
  };

  let valid = true;

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

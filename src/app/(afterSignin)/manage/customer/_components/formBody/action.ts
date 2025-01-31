import { createCustomer, getCustomersInfo, updateCustomer } from '@apis';
import { CustomerBasicProps } from '@types';
import { notFound, redirect } from 'next/navigation';

export async function formAction(
  data: CustomerBasicProps,
  type: 'add' | 'modify',
  id: string,
) {
  const customers = await getCustomersInfo();

  const errors = {
    duplicate: '',
  };

  let valid = true;

  const duplicateCustomer = customers.find(
    (customer) =>
      customer.phoneNumber === data.phoneNumber && customer.name === data.name,
  );

  if (duplicateCustomer) {
    valid = false;
    errors.duplicate = '이미 존재하는 고객입니다.';
  }

  if (!valid) {
    return errors;
  }

  if (type === 'modify') {
    const result = await updateCustomer(data, id);

    if (result.status) {
      redirect('/customer');
    } else {
      return notFound();
    }
  } else {
    const result = await createCustomer(data);

    if (result.status) {
      redirect('/customer');
    } else {
      return notFound();
    }
  }
}

'use client';

import { getPaymentDetail } from '@apis';
import { FormBody } from '../../_components';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PaymentForDashboardProps } from '@types';

export default function PaymentEditPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);
  const [paymentDetail, setPaymentDetail] = useState<
    PaymentForDashboardProps | undefined
  >(undefined);

  useEffect(() => {
    if (!id) return;

    getPaymentDetail(id).then((data) => setPaymentDetail(data));
  }, [id]);

  return (
    <>
      <FormBody type="modify" id={id} payment={paymentDetail} />
    </>
  );
}

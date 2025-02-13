'use client';

import { getCustomerDetail } from '@apis';
import { FormBody } from '../../_components';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CustomerDetailProps } from '@types';

export default function CustomerEditPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);
  const [customerDetail, setCustomerDetail] =
    useState<CustomerDetailProps | null>(null);

  useEffect(() => {
    if (!id) return;

    getCustomerDetail(id).then((data) => setCustomerDetail(data));
  }, [id]);

  return (
    <>
      <FormBody type="modify" id={id} customer={customerDetail?.customer} />
    </>
  );
}

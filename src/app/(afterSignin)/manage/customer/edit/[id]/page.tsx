import { getCustomerDetail } from '@apis';
import { FormBody } from '../../_components';

export default async function CustomerEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const customerDetail = await getCustomerDetail(parseInt(param.id));

  return (
    <>
      {customerDetail && (
        <FormBody
          type="modify"
          id={param.id}
          customer={customerDetail?.customer}
        />
      )}
    </>
  );
}

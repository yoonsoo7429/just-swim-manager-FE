import { getCustomerDetail } from '@apis';
import { FormBody } from '../../_components';

export default async function CustomerEidtPage({
  params,
}: {
  params: { id: string };
}) {
  const customerDetail = await getCustomerDetail(params.id);

  return (
    <>
      <FormBody
        type="modify"
        id={params.id}
        customer={customerDetail.customer}
      />
    </>
  );
}

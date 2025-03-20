import { getPaymentDetail } from '@apis';
import { FormBody } from '../../_components';

export default async function PaymentEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const paymentDetail = await getPaymentDetail(parseInt(param.id));
  const payment = {
    lectureId: parseInt(paymentDetail.lecture.lectureId),
    userId: parseInt(paymentDetail.user.userId),
    ...paymentDetail,
  };

  return (
    <>
      {paymentDetail && (
        <FormBody type="modify" id={param.id} payment={payment} />
      )}
    </>
  );
}

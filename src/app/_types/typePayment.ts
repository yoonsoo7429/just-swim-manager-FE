export interface PaymentProps {
  paymentId: string;
  customerId: string;
  lectureId: string;
  paymentFee: string;
  paymentDate: string;
  paymentCreatedAt: string;
  paymentUpdatedAt: string;
  paymentDeletedAt: string | null;
}

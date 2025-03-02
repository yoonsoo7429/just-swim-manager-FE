import { z } from 'zod';

export const paymentSchema = z.object({
  lectureId: z.string().min(1, '수업을 선택해주세요.'),
  customerId: z.string().min(1, '결제할 수강생을 선택해주세요.'),
  paymentFee: z.string().min(1, '결제한 요금을 넣어주세요.'),
  paymentDate: z.string().min(1, '결제한 날짜를 넣어주세요.'),
});

export type PaymentType = z.infer<typeof paymentSchema>;

import { z } from 'zod';

export const paymentSchema = z.object({
  paymentFee: z.string().min(1, '결제한 요금을 넣어주세요.'),
  paymentDate: z.string().min(1, '결제한 날짜를 넣어주세요.'),
});

export type PaymentType = z.infer<typeof paymentSchema>;

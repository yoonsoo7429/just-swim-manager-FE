import { CustomerGender, CustomerProgress } from '@types';
import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다.'),
  gender: z.nativeEnum(CustomerGender, {
    errorMap: () => ({ message: "성별은 '남자' 또는 '여자'만 가능합니다." }),
  }),
  phoneNumber: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, '전화번호 형식은 010-XXXX-XXXX 여야 합니다.'),
  birthDate: z
    .string()
    .regex(/^\d{4}\.\d{2}\.\d{2}$/, '생년월일은 YYYY.MM.DD 형식이어야 합니다.'),
  address: z.string().min(5, '주소는 최소 5자 이상 입력해야 합니다.'),
  progress: z.nativeEnum(CustomerProgress, {
    errorMap: () => ({ message: '수강생 레벨에 맞는 진도를 선택해주세요.' }),
  }),
});

export type CustomerType = z.infer<typeof customerSchema>;

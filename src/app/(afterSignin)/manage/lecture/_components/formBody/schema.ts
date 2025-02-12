import { LectureLevel } from '@types';
import { z } from 'zod';

export const lectureSchema = z.object({
  lectureTitle: z.string().min(1, '수업명을 입력해주세요. '),
  lectureLevel: z.nativeEnum(LectureLevel, {
    errorMap: () => ({
      message: "급수는 '초급', '중급', '상급' 또는 '마스터즈'만 가능합니다.",
    }),
  }),
  lectureDays: z.string().min(1, '수업 요일을 선택해주세요.'),
  lectureTime: z.string(),
  lectureFee: z.string().min(1, '수업료를 넣어주세요.'),
  lectureCapacity: z.number(),
});

export type LectureType = z.infer<typeof lectureSchema>;

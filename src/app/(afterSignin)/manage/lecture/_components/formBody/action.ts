import { createLecture, getLecturesInfo, updateLecture } from '@apis';
import { LectureBasicProps } from '@types';
import { notFound, redirect } from 'next/navigation';

export async function formAction(
  data: LectureBasicProps,
  type: 'add' | 'modify',
  id: string,
) {
  const lectures = await getLecturesInfo();

  const errors = {
    title: '',
    duplicate: '',
  };

  let valid = true;

  const [inputStart, inputEnd] = data.lectureTime
    .split('-')
    .map((t) => parseInt(t.split(':').join('')));

  for (const lecture of lectures) {
    if (data.lectureTitle === lecture.lectureTitle) {
      valid = false;
      errors.title = '중복된 강의명이 존재합니다.';
    }

    const [targetStart, targetEnd] = lecture.lectureTime
      .split('-')
      .map((t) => parseInt(t.split(':').join('')));

    for (const day of data.lectureDays) {
      if (
        lecture.lectureDays.includes(day) &&
        ((inputStart >= targetStart && inputStart <= targetEnd) ||
          (inputEnd >= targetStart && inputEnd <= targetEnd))
      ) {
        valid = false;
        errors.duplicate = '같은 일정으로 등록된 수업이 있습니다.';
      }
    }
  }

  if (!valid) {
    return errors;
  }

  if (type === 'modify') {
    const result = await updateLecture(data, id);

    if (result.status) {
      redirect('/manage/lecture');
    } else {
      return notFound();
    }
  } else {
    const result = await createLecture(data);

    if (result.status) {
      redirect('/manage/lecture');
    } else {
      return notFound();
    }
  }
}

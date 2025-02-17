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

  for (const lecture of lectures) {
    if (data.lectureTitle === lecture.lectureTitle) {
      valid = false;
      errors.title = '중복된 강의명이 존재합니다.';
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

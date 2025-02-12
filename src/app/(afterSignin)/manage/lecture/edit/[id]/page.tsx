'use client';

import { getLectureDetail } from '@apis';
import { FormBody } from '../../_components';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LectureForDashboardProps } from '@types';

export default function LectureEidtPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);
  const [lectureDetail, setLectureDetail] =
    useState<LectureForDashboardProps | null>(null);

  useEffect(() => {
    if (!id) return;

    getLectureDetail(id).then((data) => setLectureDetail(data));
  }, [id]);

  return (
    <>
      <FormBody type="modify" id={id} lecture={lectureDetail} />
    </>
  );
}

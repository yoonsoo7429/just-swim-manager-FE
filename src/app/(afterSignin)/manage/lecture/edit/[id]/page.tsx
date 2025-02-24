import { getLectureDetail } from '@apis';
import { FormBody } from '../../_components';

export default async function LectureEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const lectureDetail = await getLectureDetail(parseInt(param.id));

  return (
    <>
      {lectureDetail && (
        <FormBody type="modify" id={param.id} lecture={lectureDetail} />
      )}
    </>
  );
}

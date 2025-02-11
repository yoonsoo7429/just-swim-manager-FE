import { MemberInfoForLectureProps, MemberProps } from './typeMember';

export interface LectureProps {
  lectureId: string;
  lectureTitle: string;
  lectureLevel: string;
  lectureDays: string;
  lectureTime: string;
  lectureFee: string;
  lectureCapacity: string;
  lectureCreatedAt: string;
  lectureUpdatedAt: string;
  lectureDeletedAt: string | null;
}

export interface LectureForDashboardProps extends LectureProps {
  member: MemberInfoForLectureProps[];
}

export interface LectrueBasicProps {
  lectureTitle: string;
  lectureLevel: string;
  lectureDays: string;
  lectureTime: string;
  lectureFee: string;
  lectureCapacity: string;
}

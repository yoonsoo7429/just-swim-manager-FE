import { MemberProps } from './typeMember';

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

export interface LectureForBashboardProps extends LectureProps {
  member: MemberProps[];
}

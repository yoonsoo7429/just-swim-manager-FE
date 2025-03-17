import { MouseEvent } from 'react';
import { LectureDetailProps } from './typeLecture';
import { PaymentForDashboardProps } from './typePayment';
import { MemberProps } from './typeMember';

export interface ModalBodyProps {
  children?: React.ReactNode;
  hideModal: (event: MouseEvent<HTMLElement>) => void;
}

export interface CustomerDetailInfoModalProps extends ModalBodyProps {
  detailInfo: MemberProps;
}

export interface LectureDetailInfoModalProps extends ModalBodyProps {
  detailInfo: LectureDetailProps;
}

export interface PaymentDetailInfoModalProps extends ModalBodyProps {
  detailInfo: PaymentForDashboardProps;
}

export interface excelModalProps {
  onClose: () => void;
  lecture?: LectureDetailProps;
}

export interface ConfirmModalProps extends ModalBodyProps {
  message: string;
  confirmCallback: (event: MouseEvent<HTMLButtonElement>) => void;
}

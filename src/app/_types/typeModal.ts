import { MouseEvent } from 'react';
import { CustomerDetailProps } from './typeCustomer';
import { LectureForDashboardProps } from './typeLecture';

export interface ModalBodyProps {
  children?: React.ReactNode;
  hideModal: (event: MouseEvent<HTMLElement>) => void;
}

export interface CustomerDetailInfoModalProps extends ModalBodyProps {
  detailInfo: CustomerDetailProps;
}

export interface LectureDetailInfoModalProps extends ModalBodyProps {
  detailInfo: LectureForDashboardProps;
}

export interface UploadExcelModalProps {
  onClose: () => void;
}

export interface ConfirmModalProps extends ModalBodyProps {
  message: string;
  confirmCallback: (event: MouseEvent<HTMLButtonElement>) => void;
}

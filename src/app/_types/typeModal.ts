import { MouseEvent } from 'react';
import { CustomerDetailProps } from './typeCustomer';

export interface ModalBodyProps {
  children?: React.ReactNode;
  hideModal: (event: MouseEvent<HTMLElement>) => void;
}

export interface detailInfoModalProps extends ModalBodyProps {
  detailInfo: CustomerDetailProps;
}

export interface UploadExcelModalProps {
  onClose: () => void;
}

export interface ConfirmModalProps extends ModalBodyProps {
  message: string;
  confirmCallback: (event: MouseEvent<HTMLButtonElement>) => void;
}

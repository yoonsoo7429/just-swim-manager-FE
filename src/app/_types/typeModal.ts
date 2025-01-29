import { MouseEvent } from 'react';
import { CustomerDetailProps } from './typeCustomer';

export interface ModalBodyProps {
  children?: React.ReactNode;
  hideModal: (event: MouseEvent<HTMLElement>) => void;
}

export interface detailInfoModalProps extends ModalBodyProps {
  detailInfo: CustomerDetailProps;
}

export interface TextInputProps {
  name: string;
  valid?: boolean;
  link?: boolean;
  errorMessage: string | undefined;
}

export interface SelectionInputProps {
  name: string;
  options: string[];
  valid?: boolean;
  errorMessage?: string | undefined;
  onChange?: (event: { target: HTMLInputElement }) => void;
}

export interface PhoneNumberInputProps {
  name: string;
  valid?: boolean;
  errorMessage?: string | undefined;
  onChange: (event: { target: HTMLInputElement }) => void;
}

export interface BirhtDateInputProps {
  name: string;
  valid?: boolean;
  errorMessage?: string | undefined;
  onChange: (event: { target: HTMLInputElement }) => void;
}

export interface DayInputProps {
  name: string;
  valid?: boolean;
  errorMessage?: string | undefined;
  onChange?: (event: { target: HTMLInputElement }) => void;
}

export interface TimeInputProps {
  name: string;
  valid?: boolean;
  errorMessage: string | undefined;
  defaultValue?: string;
  defaultTimeValue?: string;
}

export interface FormButtonProps {
  text: string;
  loading?: string;
  active?: boolean;
}

export interface EditButtonProps {
  id: string;
}

export interface ConfirmButtonProps {
  text: string;
  kind: 'confirm' | 'confirm-sub' | 'cancel' | 'cancel-sub' | 'normal';
  border?: boolean;
  loading?: string;
  active?: boolean;
}

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

export interface DateInputProps {
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

export interface FeeInputProps {
  name: string;
  valid?: boolean;
  link?: boolean;
  errorMessage: string | undefined;
}

export interface CapacityInputProps {
  name: string;
  valid?: boolean;
  link?: boolean;
  onChange?: (event: { target: HTMLInputElement }) => void;
  errorMessage: string | undefined;
}

export interface SearchInputProps {
  value: string;
  onChange?: (event: { target: HTMLInputElement }) => void;
  placeholder?: string;
}

export interface FormButtonProps {
  text: string;
  loading?: string;
  active?: boolean;
}

export interface EditButtonProps {
  type: string;
  id: string;
}

export interface PaymentButtonProps {
  type: string;
  id: string;
  disabled: boolean;
}

export interface ConfirmButtonProps {
  text: string;
  kind: 'confirm' | 'confirm-sub' | 'cancel' | 'cancel-sub' | 'normal';
  border?: boolean;
  loading?: string;
  active?: boolean;
}

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

export interface FormButtonProps {
  text: string;
  loading?: string;
  active?: boolean;
}

export interface EditButtonProps {
  id: string;
}

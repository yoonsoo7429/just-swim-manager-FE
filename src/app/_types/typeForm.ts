export interface TextInputProps {
  name: string;
  valid?: string;
  link?: boolean;
  errorMessage: string | undefined;
}

export interface SelectionInputProps {
  name: string;
  options: string[];
  valid?: string;
  errorMessage?: string | undefined;
  onChange?: (event: { target: HTMLInputElement }) => void;
}

export interface PhoneNumberInputProps {
  name: string;
  valid?: string;
  errorMessage?: string | undefined;
  onChange: (event: { target: HTMLInputElement }) => void;
}

export interface BirhtDateInputProps {
  name: string;
  valid?: string;
  errorMessage?: string | undefined;
  onChange: (event: { target: HTMLInputElement }) => void;
}

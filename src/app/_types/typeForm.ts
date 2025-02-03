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
  errorMessage?: string;
  onChange?: (event: { target: HTMLInputElement }) => void;
}

export interface PhoneNumberInputProps {
  name: string;
  valid?: boolean;
  errorMessage?: string;
  onChange: (event: { target: HTMLInputElement }) => void;
}

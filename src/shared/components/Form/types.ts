export type FormDataType = {
  name: string;
  phoneNumber: string;
  blogAddress: string;
  message?: string;
};

export interface FormProps {
  onClick?: (v: FormDataType) => void;
  showTextArea?: boolean;
  buttonText?: string;
}

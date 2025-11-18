export interface LabeledInputProps {
  label: string;
  placeholder?: string;
  isText?: boolean;
  isButton?: boolean;
  text: string;
  setText: (v: string) => void;
  inputType: 'name' | 'url' | 'phone';
}

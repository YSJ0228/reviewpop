export interface TextAreaProps {
  label: string;
  maxTextCount: number;
  placeholder: string;
  text: string;
  setText: (v: string) => void;
}

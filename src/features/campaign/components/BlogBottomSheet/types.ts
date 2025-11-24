export type InputType = {
  value: string;
  setValue: (v: string) => void;
  error: string;
};

export interface BlogBottomSheetProps {
  opened: boolean;
  onClose: () => void;
  input: InputType;
  setBlogAddress: (v: string) => void;
}

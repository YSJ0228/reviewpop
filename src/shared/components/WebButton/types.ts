export type TButtonType = 'copy' | 'edit' | 'connect';

export interface WebButtonProps {
  label: string;
  isConnected?: boolean;
  buttonType: TButtonType;
  onClick: () => void;
  text?: string;
}

export type TButtonType = 'copy' | 'edit' | 'connect';

export interface WebButtonType {
  label: string;
  isConnected?: boolean;
  buttonType: TButtonType;
  onClick: () => void;
  text?: string;
}

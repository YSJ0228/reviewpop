export type TButtonType = 'copy' | 'edit' | 'connect';

export interface WebButtonProps {
  label: string;
  isConnected?: boolean;
  buttonType: TButtonType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text?: string;
}

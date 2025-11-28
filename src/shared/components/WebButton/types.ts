export type ButtonType = 'copy' | 'edit' | 'connect';

export interface WebButtonProps {
  label: string;
  isConnected?: boolean;
  buttonType: ButtonType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text?: string;
}

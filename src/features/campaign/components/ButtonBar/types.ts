export interface ButtonBarProps {
  variant: 'primary' | 'secondary' | 'outline' | 'text' | 'warning';
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

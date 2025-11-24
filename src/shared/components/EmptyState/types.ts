export interface EmptyStateProps {
  variant: EmptyStateVariant;
}

export type EmptyStateVariant =
  | 'no-selected'
  | 'no-registered'
  | 'no-applied'
  | 'no-completed'
  | 'no-opened';

export type EmptyStateConfig = {
  title?: string;
  description: string;
  showButton: boolean;
  buttonText?: string;
};

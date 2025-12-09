export interface EmptyStateProps {
  description?: string;
  variant?: EmptyStateVariant;
  title?: string;
  buttonText?: string;
  buttonLink?: string;
}

export type EmptyStateVariant =
  | 'no-selected'
  | 'no-registered'
  | 'no-applied'
  | 'no-completed'
  | 'no-opened';

export interface EmptyStateConfig {
  title?: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface ISharedCampaignCardProps {
  thumbnail: string;
  brand: string;
  title: string;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  statusLabel?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  contentClassName?: string;
  brandClassName?: string;
  titleClassName?: string;
  topSectionClassName?: string;
}

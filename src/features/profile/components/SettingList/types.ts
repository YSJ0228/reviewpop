export interface SettingListProps {
  title: string;
  titleColor?: string;
  isIcon?: boolean;
  path?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

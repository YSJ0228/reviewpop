import { PropsWithChildren } from 'react';
import Image from 'next/image';

import { SharedCampaignCard } from '@shared/components';
import { handleNaverMapClick } from '@shared/lib/naverMap';

import styles from './style.module.scss';

// 1. Main Container
function Main({ children }: PropsWithChildren) {
  return <div className={styles.CampaignInfoList}>{children}</div>;
}

// 2. Header (Campaign Card)
interface HeaderProps {
  thumbnail: string;
  brand: string;
  title: string;
}

function Header({ thumbnail, brand, title }: HeaderProps) {
  return (
    <SharedCampaignCard
      thumbnail={thumbnail}
      brand={brand}
      title={title}
      titleClassName={styles.CampaignInfoList__CardTitle}
      className={styles.CampaignInfoList__Card}
      contentClassName={styles.CampaignInfoList__CardContent}
      brandClassName={styles.CampaignInfoList__CardBrand}
      topSectionClassName={styles.CampaignInfoList__CardHeader}
    />
  );
}

// 3. Generic Item
interface ItemProps extends PropsWithChildren {
  label: string;
  isLast?: boolean;
}

function Item({ label, children, isLast = false }: ItemProps) {
  return (
    <div className={`${styles.CampaignInfoList__Content} ${!isLast ? styles.BorderBottom : ''}`}>
      <span>{label}</span>
      {children}
    </div>
  );
}

// 4. Address Item (Specialized)
interface AddressItemProps {
  address: string;
}

function AddressItem({ address }: AddressItemProps) {
  return (
    <div className={`${styles.CampaignInfoList__Address} ${styles.BorderBottom}`}>
      <span>주소</span>
      <div className={styles.CampaignInfoList__Address__Detail}>
        <p>{address}</p>
        <button
          type="button"
          onClick={() => handleNaverMapClick(address)}
          aria-label="네이버 지도에서 위치 보기"
        >
          <Image src="/images/NaverMap.png" alt="네이버 맵" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}

export const CampaignInfoList = {
  Main,
  Header,
  Item,
  AddressItem,
};

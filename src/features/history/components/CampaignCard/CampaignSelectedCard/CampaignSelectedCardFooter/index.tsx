import { useDisclosure } from '@mantine/hooks';

import { ReservationBeforeCard } from '../ReservationBeforeCard';
import { ReservationScheduledCard } from '../ReservationScheduledCard';

import type { CampaignSelectedCardFooterProps } from './types';

import styles from './style.module.scss';

/**
 * 선정된 체험 카드의 액션 영역 컴포넌트 (footer용 - 방문 전, 방문 예정에 따른 분기)
 * visitStatus에 따라 적절한 하위 컴포넌트를 렌더링하는 라우터 역할
 * @param campaign - 캠페인 정보
 * @param visitStatus - 방문 상태 (before: 방문 전, scheduled: 방문 예정)
 */
export function CampaignSelectedCardFooter({
  campaign,
  visitStatus,
}: CampaignSelectedCardFooterProps) {
  const [, { open }] = useDisclosure(false);

  // TODO: 방문 날짜 설정 버튼 클릭 핸들러
  const handleReservationClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    open();
  };

  return (
    <footer className={styles.CampaignSelectedCardFooter__Wrapper}>
      {visitStatus === 'before' && (
        <ReservationBeforeCard onReservationClick={handleReservationClick} />
      )}
      {visitStatus === 'scheduled' && <ReservationScheduledCard campaign={campaign} />}
    </footer>
  );
}

import { Button } from '@shared/components';
import { useUserInfo } from '@entities/user/hooks/useUserInfo';

import styles from './style.module.scss';

export default function CampaignCTA() {
  const { data: user } = useUserInfo();

  if (!user) return null;

  return (
    <div className={styles.CTA__Container}>
      <span>🎉 체험단에 선정되었어요!</span>

      <div className={styles.CTA__ButtonWrapper}>
        <Button fullWidth variant="secondary" className={styles.CTA}>
          CTA입니다
        </Button>
        <Button fullWidth variant="outline" className={styles.CTA}>
          CTA입니다
        </Button>
      </div>
    </div>
  );
}

/*

if 모집 중 {
  신청 pending return 체험단 신청 취소하기
  return 체험단 신청하기
} else {
  if selected {
    체험단에 선정되었어요~~
  } else if !Reservation?.isvisited {
    예약 취소
    !예약 당일 && 예약 날짜 변경
  } else if Reservation?.isvisited {
    체험 후기 등록
  }
  else {아쉽지만 종료된 체험이에요}
}     

*/

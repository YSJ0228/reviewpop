import styles from './style.module.scss';

interface CampaignAppliedCardProps {
  announcementStatus: string;
}

export default function CampaignAppliedCard({ announcementStatus }: CampaignAppliedCardProps) {
  const handleCancelApplication = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // TODO: API 연동 필요
    console.warn('신청 취소 기능 미구현:', announcementStatus);
    // 임시로 기능이 준비 중임을 알림
    alert('신청 취소 기능은 준비 중입니다.');
  };

  return (
    <div className={styles.CampaignAppliedTitle} aria-label="신청 탭 개별 카드 타이틀">
      <p className={styles.CampaignAppliedTitle__Text}>{announcementStatus}</p>
      <button
        className={styles.CampaignAppliedTitle__Button}
        onClick={handleCancelApplication}
        aria-label="체험 신청 취소"
      >
        신청취소
      </button>
    </div>
  );
}

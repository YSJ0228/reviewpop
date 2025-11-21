import styles from './style.module.scss';

export default function CampaignAppliedCard({ announcementTitle }: { announcementTitle: string }) {
  const handleCancelApplication = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: API 연동 필요 - 신청 취소 API 호출
    // Issue: #XX (이슈 번호 추가)
    console.log('신청 취소:', announcementTitle);

    // 임시: 사용자에게 알림
    if (window.confirm('정말 신청을 취소하시겠습니까?')) {
      alert('API 연동 후 구현 예정입니다.');
    }
  };

  return (
    <div className={styles.CampaignAppliedTitle} aria-label="신청 탭 개별 카드 타이틀">
      <p className={styles.CampaignAppliedTitle__Text}>{announcementTitle}</p>
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

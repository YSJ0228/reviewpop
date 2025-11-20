import styles from './style.module.scss';

export default function CampaignAppliedCard({ announcementTitle }: { announcementTitle: string }) {
  const handleCancelApplication = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('신청취소');
  };

  return (
    <div className={styles.CampaignAppliedTitle}>
      <p className={styles.CampaignAppliedTitle__Text}>{announcementTitle}</p>
      <button className={styles.CampaignAppliedTitle__Button} onClick={handleCancelApplication}>
        신청취소
      </button>
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@shared/components';

import styles from './style.module.scss';

export function ReserveCompleteActions({ campaignId }: { campaignId: string }) {
  return (
    <div className={styles.ReserveComplete__Buttons}>
      <Link href={`/campaign/${campaignId}`}>
        <Button fullWidth variant="outline" size="large">
          체험 상세 보기
        </Button>
      </Link>
    </div>
  );
}

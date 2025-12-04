import Link from 'next/link';
import { Button } from '@shared/components';

import styles from './ReserveCompleteAction.module.scss';

export function ReserveCompleteAction({ campaignId }: { campaignId: string }) {
  return (
    <div>
      <Link href={`/campaign/${campaignId}`}>
        <Button
          fullWidth
          variant="outline"
          size="large"
          className={styles.ReserveCompleteAction__Button}
        >
          체험 상세 보기
        </Button>
      </Link>
    </div>
  );
}

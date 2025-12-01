import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@shared/components/Button';
import { Gnb } from '@shared/components/Gnb';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.NotFound}>
      <Gnb setting={true} />
      <div className={styles.NotFoundContent}>
        <Image
          src={'/images/icons/IcoNotFound.svg'}
          width={128}
          height={60}
          alt="404아이콘"
          aria-hidden
        />
        <p>
          찾으시는 페이지가 없어요. <br />
          원하시는 곳으로 다시 안내할게요.
        </p>
        <Link href="/">
          <Button variant="secondary" size="small" className={styles.NotFound__Button}>
            홈으로 이동
          </Button>
        </Link>
      </div>
    </div>
  );
}

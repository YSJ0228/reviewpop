import Image from 'next/image';
import Favicon from '@app/favicon.ico';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.HomeContainer}>
      <div className={styles.HomeContents}>
        <Image
          className={styles.logo}
          src={Favicon}
          alt="Next.js logo"
          width={20}
          height={20}
          priority
        />
        <h1>
          체험단 리뷰 플랫폼, <span>리뷰팝</span>
        </h1>
      </div>
    </main>
  );
}

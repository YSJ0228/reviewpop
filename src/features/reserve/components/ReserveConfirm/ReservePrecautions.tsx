import Image from 'next/image';
import styles from './ReservePrecautions.module.scss';

interface ReservePrecautionsProps {
  precautions: string[];
}

export function ReservePrecautions({ precautions }: ReservePrecautionsProps) {
  return (
    <div className={styles.ReservePrecautions}>
      <div className={styles.ReservePrecautions__Title}>
        <Image src="/images/CheckCircle.svg" alt="체크" width={18} height={18} />
        <h3>예약 유의 사항</h3>
      </div>

      <ul className={styles.ReservePrecautions__Text}>
        {precautions.map((precaution, index) => (
          <li key={index}>{precaution}</li>
        ))}
      </ul>
    </div>
  );
}

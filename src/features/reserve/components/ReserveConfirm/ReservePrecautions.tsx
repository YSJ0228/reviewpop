import styles from './ReservePrecautions.module.scss';
import { IconCheckCircle } from '@pop-ui/foundation';
import { ColorAqua500 } from '@pop-ui/foundation';

interface ReservePrecautionsProps {
  precautions: string[];
}

export function ReservePrecautions({ precautions }: ReservePrecautionsProps) {
  return (
    <div className={styles.ReservePrecautions}>
      <div className={styles.ReservePrecautions__Title}>
        <IconCheckCircle size={24} color={ColorAqua500} />
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

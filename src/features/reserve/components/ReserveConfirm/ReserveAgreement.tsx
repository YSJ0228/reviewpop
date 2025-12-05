import { Button } from '@shared/components/Button';

import styles from './ReserveAgreement.module.scss';

interface ReserveAgreementProps {
  onConfirm: () => void;
  disabled?: boolean;
}

export function ReserveAgreement({ onConfirm, disabled }: ReserveAgreementProps) {
  return (
    <div className={styles.ReserveAgreement}>
      <Button
        fullWidth
        size="large"
        onClick={onConfirm}
        disabled={disabled}
        className={styles.ReserveAgreement__Button}
      >
        동의하고 예약하기
      </Button>
      <p>
        {'버튼을 클릭하면 '}
        <ins>{'예약 유의사항, '}</ins>
        <ins>{'개인정보 수집 이용 동의, '}</ins>
        {'개인정보 제3자 (판매자) 제공에 동의하시는 것입니다.'}
      </p>
    </div>
  );
}

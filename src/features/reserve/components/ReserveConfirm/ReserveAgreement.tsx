import styles from './ReserveAgreement.module.scss';

interface ReserveAgreementProps {
  onConfirm: () => void;
}

export function ReserveAgreement({ onConfirm }: ReserveAgreementProps) {
  return (
    <div className={styles.ReserveAgreement}>
      <button onClick={onConfirm}>동의하고 예약하기</button>
      <p>
        {'버튼을 클릭하면 '}
        <ins>{'예약 유의사항, '}</ins>
        <ins>{'개인정보 수집 이용 동의, '}</ins>
        {'개인정보 제3자 (판매자) 제공에 동의하시는 것입니다.'}
      </p>
    </div>
  );
}

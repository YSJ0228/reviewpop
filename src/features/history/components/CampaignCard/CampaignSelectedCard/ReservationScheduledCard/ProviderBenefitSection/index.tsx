import styles from './style.module.scss';
import { ProviderBenefitSectionProps } from './types';

/**
 * 제공 혜택 섹션 컴포넌트
 * @param providedItem - 제공 혜택 제목
 * @param description - 제공 혜택 설명
 */
export function ProviderBenefitSection({ providedItem, description }: ProviderBenefitSectionProps) {
  return (
    <section aria-label="제공 혜택 내용" className={styles.ProviderBenefitSection}>
      <div className={styles.ProviderBenefitSection__SectionContent}>
        <h3>제공 혜택</h3>
        <p className={styles.ProviderBenefitSection__SectionItem}>
          {providedItem || '제공 혜택 정보가 없습니다.'}
        </p>
      </div>
      {description && <p className={styles.ProviderBenefitSection__Description}>{description}</p>}
    </section>
  );
}

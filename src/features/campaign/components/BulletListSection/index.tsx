'use client';

import styles from './style.module.scss';

export interface BulletListSectionProps {
  /** 섹션 제목 */
  title: string;
  /** 불릿 포인트 목록 */
  items: string[];
  /** 하단 구분선 표시 여부 (기본값: true) */
  showDivider?: boolean;
  /** 배경색 (CSS 변수 또는 색상 값, 기본값: var(--color-white)) */
  backgroundColor?: string;
  /** 패딩 제거 여부 (기본값: false) */
  noPadding?: boolean;
  /** 텍스트 색상 (CSS 변수 또는 색상 값, 기본값: var(--color-gray-900)) */
  textColor?: string;
  /** 커스텀 클래스명 */
  className?: string;
}

/**
 * 불릿 포인트 리스트 섹션 컴포넌트
 *
 * 제목과 불릿 포인트 리스트를 표시하는 재사용 가능한 컴포넌트입니다.
 * 당첨 조건, 후기 미션 등 다양한 곳에서 사용할 수 있습니다.
 *
 * @example
 * ```tsx
 * <BulletListSection
 *   title="당첨 조건"
 *   items={['사진 3장 이상', '150자 이상 작성', '5점 평가']}
 * />
 * ```
 */
export function BulletListSection({
  title,
  items,
  showDivider = true,
  backgroundColor,
  noPadding = false,
  textColor,
  className = '',
}: BulletListSectionProps) {
  if (!items?.length) {
    return null;
  }

  const containerClassName = [
    styles.BulletListSection,
    showDivider && styles['BulletListSection--WithDivider'],
    noPadding && styles['BulletListSection--NoPadding'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerStyle = backgroundColor ? { backgroundColor } : undefined;
  const textStyle = textColor ? { color: textColor } : undefined;

  return (
    <div className={containerClassName} style={containerStyle}>
      <h2 className={styles.Title} style={textStyle}>
        {title}
      </h2>
      <ul className={styles.List}>
        {items.map((item, index) => (
          <li key={index} className={styles.Item} style={textStyle}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

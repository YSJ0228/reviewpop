'use client';

import styles from './style.module.scss';

export interface CampaignAdditionalNoticeProps {
  content: string | string[];
}

/**
 * 체험 추가 안내사항 섹션 컴포넌트
 * - 재사용 가능한 추가 안내사항 섹션
 * - 내용은 문자열 또는 문자열 배열로 받을 수 있음
 */
export function CampaignAdditionalNotice({ content }: CampaignAdditionalNoticeProps) {
  if (!content || (Array.isArray(content) && content.length === 0)) {
    return null;
  }

  // 문자열 배열로 정규화 (빈 문자열 및 공백만 있는 줄 제거)
  const contentLines = Array.isArray(content)
    ? content.filter((line) => line.trim())
    : content.split('\n').filter((line) => line.trim());

  // 정규화 후에도 빈 배열이면 렌더링하지 않음
  if (contentLines.length === 0) {
    return null;
  }

  return (
    <div className={styles.CampaignAdditionalNotice}>
      <h2 className={styles.Title}>추가 안내사항</h2>
      <div className={styles.Content}>
        {contentLines.map((line, index) => (
          <p key={index} className={styles.ContentLine}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

import { ReactNode } from 'react';

export interface BottomSheetProps {
  /** 바텀시트 열림/닫힘 상태 */
  opened: boolean;
  /** 바텀시트를 닫을 때 호출되는 콜백 함수 */
  onClose: () => void;
  /** 바텀시트 상단에 표시될 제목 (선택사항) */
  title?: string;
  /** 바텀시트 내부에 렌더링될 컨텐츠 */
  children?: ReactNode;
  /** 제목 폰트 크기 (기본값: 20px) */
  titleSize?: number;
  /** 바텀시트 전체 높이 (기본값: 560px) */
  height?: number;
  /** 닫기 버튼 표시 여부 (기본값: true) */
  withCloseButton?: boolean;
}

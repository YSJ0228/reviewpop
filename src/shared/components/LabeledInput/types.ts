export interface LabeledInputProps {
  /** 입력 필드의 레이블 텍스트 */
  label: string;
  /** 입력 필드의 placeholder 텍스트 */
  placeholder?: string;
  /** 입력값 미리보기 표시 여부 (예: blog.naver.com/아이디) */
  showPreview?: boolean;
  /** URL 확인 버튼 표시 여부 */
  showButton?: boolean;
  /** 현재 입력값 */
  value: string;
  /** 입력값 변경 핸들러 */
  setValue: (value: string) => void;
  /** 에러 메세지 */
  errorMsg: string;
  /** 버튼 클릭 시 동작(블로그 주소에만 사용) */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼 클릭 후 주소 유효함을 확인하는 메세지 */
  confirmMsg?: string;
}

export interface GnbProps {
  /**
   * 알림 개수
   * - 음수는 0으로 처리됨
   * - 소수점은 내림 처리됨
   * - 10개 이상일 때 "9+"로 표시됨
   * @default 0
   */
  notification?: number;
}

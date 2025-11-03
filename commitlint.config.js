/**
 * Commitlint 설정 파일
 *
 * 커밋 메시지 컨벤션을 강제합니다.
 * Conventional Commits 스펙을 따릅니다.
 *
 * 커밋 메시지 형식: <type>: <subject>
 *
 * 사용 가능한 타입:
 * - feat: 새로운 기능 추가
 * - fix: 버그 수정
 * - docs: 문서 수정
 * - style: 코드 포맷팅 (코드 동작에 영향 없음)
 * - refactor: 코드 리팩토링
 * - test: 테스트 코드 추가/수정
 * - chore: 빌드, 패키지 매니저 설정 등
 * - perf: 성능 개선
 * - ci: CI/CD 설정 변경
 *
 * @see https://www.conventionalcommits.org/
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type은 항상 소문자
    'type-case': [2, 'always', 'lower-case'],
    // type은 비워둘 수 없음
    'type-empty': [2, 'never'],
    // subject는 비워둘 수 없음
    'subject-empty': [2, 'never'],
    // subject는 마침표로 끝나면 안됨
    'subject-full-stop': [2, 'never', '.'],
    // header(첫 줄)는 최대 100자
    'header-max-length': [2, 'always', 100],
  },
};

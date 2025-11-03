/**
 * User 관련 타입 정의
 */

/**
 * 사용자 정보
 */
export interface User {
  /** 사용자 ID */
  id: number;
  /** 이메일 */
  email: string;
  /** 이름 */
  name: string;
  /** 프로필 이미지 URL */
  profileImage: string | null;
  /** 생성일 */
  createdAt: string;
}

/**
 * 로그인 요청 데이터
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * 로그인 응답 데이터
 */
export interface LoginResponse {
  user: User;
  token: string;
}

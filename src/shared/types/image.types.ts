/**
 * Image (이미지) 관련 타입 정의
 */

/**
 * 이미지 업로드 응답
 */
export interface ImageUploadResponse {
  /** 업로드된 이미지 URL */
  url: string;
  /** 파일명 */
  filename: string;
  /** 파일 크기 (bytes) */
  size: number;
  /** 이미지 너비 (pixels) */
  width?: number;
  /** 이미지 높이 (pixels) */
  height?: number;
  /** MIME 타입 */
  mimeType: string;
  /** 업로드 시각 (ISO 8601) */
  uploadedAt: string;
}

/**
 * 이미지 업로드 제약 조건
 */
export const IMAGE_CONSTRAINTS = {
  /** 최대 파일 크기 (5MB) */
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  /** 허용된 MIME 타입 */
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  /** 허용된 확장자 */
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
  /** 최대 이미지 너비 */
  MAX_WIDTH: 4000,
  /** 최대 이미지 높이 */
  MAX_HEIGHT: 4000,
} as const;

/**
 * 이미지 유효성 검증
 */
export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  // 파일 크기 검증
  if (file.size > IMAGE_CONSTRAINTS.MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `파일 크기는 ${IMAGE_CONSTRAINTS.MAX_FILE_SIZE / 1024 / 1024}MB 이하여야 합니다.`,
    };
  }

  // MIME 타입 검증
  if (!IMAGE_CONSTRAINTS.ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `지원하지 않는 파일 형식입니다. (허용: ${IMAGE_CONSTRAINTS.ALLOWED_EXTENSIONS.join(', ')})`,
    };
  }

  return { valid: true };
}

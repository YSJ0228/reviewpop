import { useState } from 'react';

// 정규식을 상수로 분리
const VALIDATION_PATTERNS = {
  url: /^[a-z0-9-_]{5,30}$/,
  blogUrl: /^https:\/\/blog\.naver\.com\/[a-zA-Z0-9-_]{3,30}\/\d{1,12}$/,
  name: /^[가-힣a-zA-Z\s]{1,20}$/,
  phone: /^01\d{8,9}$/,
} as const;

const ERROR_MESSAGES = {
  url: '블로그 아이디는 소문자 영문, 숫자, -, _ 만 사용 가능하며 5~30자여야 합니다.',
  blogUrl:
    '올바른 네이버 블로그 포스트 URL 형식이 아닙니다. (https://blog.naver.com/아이디/게시글번호)',
  name: '이름을 확인해주세요',
  phone: '전화번호를 확인해주세요',
} as const;

type InputType = keyof typeof VALIDATION_PATTERNS;

export function getValidationError(type: InputType, value: string): string {
  const pattern = VALIDATION_PATTERNS[type];
  if (!pattern.test(value.trim())) {
    return ERROR_MESSAGES[type];
  }

  return '';
}

export function useInputValidate(type: InputType, initial?: string) {
  const [value, setValue] = useState<string>(initial ?? '');
  const errorMsg = getValidationError(type, value);
  return { value, setValue, errorMsg };
}

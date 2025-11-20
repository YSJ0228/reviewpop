import { useState } from 'react';

// 정규식을 상수로 분리
const VALIDATION_PATTERNS = {
  url: /^[a-z0-9-_]{5,30}$/,
  name: /^[가-힣a-zA-Z\s]{1,20}$/,
  phone: /^01\d{8,9}$/,
} as const;

const ERROR_MESSAGES = {
  url: '블로그 아이디는 소문자 영문, 숫자, -, _ 만 사용 가능하며 5~30자여야 합니다.',
  name: '이름은 한글과 영문, 공백만 사용 가능하며 1~20자여야 합니다.',
  phone: '전화번호는 숫자만 사용 가능하며 01로 시작하는 10-11자여야 합니다.',
  required: '필수 입력 항목입니다.',
} as const;

type InputType = keyof typeof VALIDATION_PATTERNS;

export function getValidationError(type: InputType, value: string): string {
  if (!value.trim()) {
    return ERROR_MESSAGES.required;
  }
  const pattern = VALIDATION_PATTERNS[type];
  if (!pattern.test(value)) {
    return ERROR_MESSAGES[type];
  }

  return '';
}

export function useInputValidate(type: InputType) {
  const [value, setValue] = useState<string>('');

  const error = getValidationError(type, value);

  return { value, setValue, error };
}

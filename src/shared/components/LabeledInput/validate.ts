export function isValid(type: 'name' | 'phone' | 'url', value: string): string {
  if (type === 'url') {
    const regex = /^[a-z0-9-_]{5,30}$/; //블로그 아이디는 소문자 영문, 숫자, -, _ 만 사용 가능하며 5~30자여야 합니다.
    if (!regex.test(value))
      return '블로그 아이디는 소문자 영문, 숫자, -, _ 만 사용 가능하며 5~30자여야 합니다.';
    return '';
  } else if (type === 'name') {
    const regex = /^[가-힣a-zA-Z\s]{1,20}$/;
    if (!regex.test(value)) return '이름은 한글과 영문, 공백만 사용 가능하며 1~20자여야 합니다.';
    return '';
  } else if (type === 'phone') {
    const regex = /^01\d{8}$/;
    if (!regex.test(value)) return '전화번호는 숫자만 사용 가능하며 01로 시작하는 10자여야 합니다.';
    return '';
  }
  return '';
}

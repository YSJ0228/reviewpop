# Shared Lib (공유 라이브러리)

## 📌 이 폴더는 무엇인가요?

프로젝트 전체에서 사용하는 **유틸리티 함수**와 **헬퍼 함수**를 모아둔 폴더입니다.

## 📁 폴더 구조

```
lib/
├── date.ts          # 날짜 관련 유틸
├── format.ts        # 포맷팅 유틸
├── validation.ts    # 유효성 검증
└── storage.ts       # localStorage 헬퍼
```

## 🎯 포함되는 것들

- 날짜 포맷 함수
- 텍스트 변환 함수
- 유효성 검증 함수
- localStorage 래퍼
- 공통 계산 로직

## 📝 사용 예시

### 1. 날짜 포맷팅

```typescript
import { formatDate } from '@shared/lib/date';

const date = new Date('2024-03-15');
console.log(formatDate(date, 'YYYY-MM-DD')); // "2024-03-15"
console.log(formatDate(date, 'YYYY년 MM월 DD일')); // "2024년 03월 15일"
```

### 2. 텍스트 포맷팅

```typescript
import { formatPhoneNumber, formatPrice } from '@shared/lib/format';

console.log(formatPhoneNumber('01012345678')); // "010-1234-5678"
console.log(formatPrice(10000)); // "10,000원"
```

### 3. 유효성 검증

```typescript
import { isValidEmail, isValidPassword } from '@shared/lib/validation';

if (!isValidEmail(email)) {
  alert('올바른 이메일을 입력하세요');
}

if (!isValidPassword(password)) {
  alert('비밀번호는 8자 이상이어야 합니다');
}
```

### 4. localStorage 사용

```typescript
import { storage } from '@shared/lib/storage';

// 저장
storage.set('user', { name: '홍길동' });

// 불러오기
const user = storage.get('user');

// 삭제
storage.remove('user');
```

## 💡 개발 팁

- **순수 함수**: 외부 상태에 의존하지 않는 순수 함수로 작성
- **테스트**: 유틸 함수는 테스트하기 쉬우므로 단위 테스트 작성 권장
- **타입 안정성**: TypeScript 제네릭 활용
- **문서화**: 복잡한 함수는 JSDoc 주석 추가

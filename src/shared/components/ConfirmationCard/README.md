# ConfirmationCard (확인 카드)

## 📌 컴포넌트 설명

체험단 방문 예약/ 신청 완료 상태를 나타내는 확인 카드 컴포넌트입니다.
체크 아이콘과 함께 메인 메시지와 날짜/시간을 자동으로 포맷팅하여 표시합니다.

## 🎯 주요 기능

- 체크 아이콘 표시 (Aqua 색상)
- 타입별 메시지 자동 표시
- 날짜/시간 자동 포맷팅
- 타입별 다른 날짜 형식 지원

## 🔧 사용 예시

### 예약 완료

```typescript
import { ConfirmationCard } from '@shared/components/ConfirmationCard';

// 표시: "체험단 방문 예약이 완료 되었어요!"
// "9월 18일 수요일 오후 1:00" (파란색 색상)
// 카드 타입: reservation(예약 완료) || application(신청 완료)
<ConfirmationCard
  date={reservationDate}
  type="reservation"
/>

// 아래와 같이 API에서 넘겨 받는 값 (DateInput 타입)
<ConfirmationCard
  date={new Date('2024-09-18T00:00:00Z')}
  type="reservation"
/>
```

### 체험단 신청

```typescript
import { ConfirmationCard } from '@shared/components/ConfirmationCard';

// 표시: "체험단 신청이 완료되었어요!"
// "12월 23일 목요일" (파란색) "에 선정 결과가 발표돼요" (검정색)
<ConfirmationCard
  date={mockCampaigns[0].startDate}
  type="application"
/>

```

### 타입

```typescript
interface ConfirmationCardProps {
  // 날짜 객체 또는 문자열 (DateInput 타입)
  date: DateInput;
  // 카드 타입: 'reservation' (예약 완료) 또는 'application' (신청 완료)
  type: 'reservation' | 'application';
}
```

## 📋 타입별 동작

### `type="reservation"` (예약 완료)

- 메시지: "체험단 방문 예약이 완료 되었어요!"
- 날짜 형식: "9월 18일 수요일 오후 1:00"
- 색상: 전체 파란색

### `type="application"` (신청 완료)

- 메시지: "체험단 신청이 완료되었어요!"
- 날짜 형식: "12월 23일 목요일에 선정 결과가 발표돼요"
- 색상: 날짜 부분 -> 파란색, "에 선정 결과가 발표돼요" -> gray-900

## 🎨 스타일

- 너비: 260px (고정)
- 정렬: 가운데 정렬
- 메인 메시지: 20px, Bold, gray-900
- 서브 메시지: 16px, Semi Bold, blue-500 (날짜 부분)

## 🔗 사용 위치

- 예약 완료 페이지 (`/campaign/[id]/reserve/complete`)
- 신청 완료 페이지 (`/campaign/[id]/apply/complete`)

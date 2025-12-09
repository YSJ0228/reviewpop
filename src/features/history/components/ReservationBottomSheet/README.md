# ReservationBottomSheet 컴포넌트

## 개요

`ReservationBottomSheet`는 예약 관리 기능을 제공하는 BottomSheet 컴포넌트입니다. 예약 날짜 변경 및 예약 취소 기능을 제공하며, 예약일이 당일인 경우 날짜 변경 기능을 비활성화합니다.

## 주요 기능

- 예약 날짜 변경 기능 제공 (당일이 아닐 때만 활성화)
- 예약 취소 기능 제공 (확인 모달 포함)
- 예약일이 당일인 경우 경고 메시지 표시
- 예약일 상태에 따른 BottomSheet 높이 자동 조정

## 사용 방법

```typescript
import { ReservationBottomSheet } from '@features/history/components/ReservationBottomSheet';

<ReservationBottomSheet
  appliedAt={['2024-12-25', '14:00']}
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onDateChange={() => {
    // 날짜 변경 로직
  }}
  onCancel={async () => {
    // 예약 취소 로직
  }}
/>
```

## Props

| Prop           | Type                  | Required | 설명                             |
| -------------- | --------------------- | -------- | -------------------------------- |
| `appliedAt`    | `[string, string]`    | ❌       | 예약 날짜 및 시간 `[날짜, 시간]` |
| `isOpen`       | `boolean`             | ✅       | BottomSheet 열림/닫힘 상태       |
| `onClose`      | `() => void`          | ✅       | BottomSheet 닫기 핸들러          |
| `onDateChange` | `() => void`          | ✅       | 날짜 변경 버튼 클릭 핸들러       |
| `onCancel`     | `() => Promise<void>` | ✅       | 예약 취소 확인 핸들러            |

## 동작 방식

- **예약일이 당일이 아닌 경우**: 날짜 변경 버튼과 예약 취소 버튼 모두 표시
- **예약일이 당일인 경우**: 날짜 변경 버튼 숨김, 예약 취소 버튼만 표시, 경고 메시지 표시
- **예약 취소**: `Modal` 컴포넌트를 통한 확인 절차 후 `onCancel` 핸들러 실행

## 관련 컴포넌트

- [BottomSheet](../../../../shared/components/BottomSheet/README.md) - 공통 BottomSheet 컴포넌트
- [Modal](../../../../shared/components/Modal/README.md) - 확인 모달 컴포넌트

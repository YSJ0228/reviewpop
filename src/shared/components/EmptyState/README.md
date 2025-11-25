# EmptyState (빈 상태 표시)

## 📌 컴포넌트 설명

데이터가 없을 때 사용자에게 표시하는 빈 상태 컴포넌트입니다. variant에 따라 다른 메시지와 버튼을 표시하며, 버튼이 있는 경우 타이틀 없이 description만, 버튼이 없는 경우 타이틀과 description을 함께 표시합니다.

## 🎯 주요 기능

- `variant`에 따른 메시지 및 버튼 프리셋
- 버튼 유무에 따른 레이아웃 자동 조정
  - 버튼 있음: 타이틀 없음, description + 버튼
  - 버튼 없음: 타이틀 + description
- 버튼 클릭 시 홈(`/`)으로 이동 (`next/link` 사용)
- `text-align: center`로 모든 요소 중앙 정렬

## 🔧 사용 예시

### 기본 사용 (버튼 있음)

```typescript
import { EmptyState } from '@shared/components';

function MyCampaignList() {
  return (
    <EmptyState variant="no-applied" />
  );
}
```

### 타이틀만 표시 (버튼 없음)

```typescript
<EmptyState variant="no-opened" />
```

### variant별 자동 매핑

```typescript
// MyCampaignStatus를 EmptyStateVariant로 자동 매핑
import { STATUS_EMPTY_MAP } from '@entities/history/types/myCampaign.types';

<EmptyState variant={STATUS_EMPTY_MAP[status]} />
```

## 📝 Props

```typescript
interface EmptyStateProps {
  variant: EmptyStateVariant; // 'no-selected' | 'no-registered' | 'no-applied' | 'no-completed' | 'no-opened'
}
```

## 📋 Variant별 세부 정보

### 버튼이 있는 variant (타이틀 없음)

- **no-selected**: "아직 선정된 체험이 없네요. 좋은 결과가 있을 거예요."
- **no-registered**: "아직 작성한 체험이 없네요. 지금 진행중인 체험을 구경해보세요."
- **no-applied**: "아직 신청한 체험이 없네요. 지금 진행중인 체험을 구경해보세요."
- **no-completed**: "아직 완료한 체험이 없네요. 지금 진행중인 체험을 구경해보세요."

버튼 텍스트: "진행중인 체험 보러가기" (클릭 시 홈으로 이동)

### 버튼이 없는 variant (타이틀 있음)

- **no-opened**:
  - 타이틀: "지금은 모집중인 체험이 없어요"
  - Description: "지난 체험들을 구경해보세요"

## 🎨 스타일

- 모든 요소 중앙 정렬 (`text-align: center`)
- 버튼이 있는 경우: `position: absolute`로 상단에서 25vh 위치에 배치 (부모 요소에 `position: relative` 필요)
- 버튼이 없는 경우: 일반 레이아웃으로 표시 (상하 패딩 16px)
- Description의 줄바꿈(`\n`)은 `white-space: pre-line`으로 처리
- variant에 따라 stateType 클래스명 사용 (`EmptyState--WithButton`, `EmptyState--NoButton`)

## 📋 동작 방식

- `variant`에 따라 `EMPTY_STATE_MAP`에서 설정을 가져옵니다.
- `showButton`이 `true`인 경우 타이틀을 표시하지 않고 description과 버튼만 표시합니다.
- `showButton`이 `false`인 경우 타이틀과 description을 함께 표시합니다.
- 버튼이 있는 variant는 자동으로 홈(`/`)으로 이동하는 링크를 포함합니다.

## 🔗 사용 위치

- 체험 목록이 비어있을 때 (`CampaignList`)
- 사용자의 신청/선정/완료 내역이 없을 때
- 모집중인 체험이 없을 때
- 기타 데이터가 없는 상태를 표시해야 하는 곳

# EmptyState (빈 상태 표시)

## 📌 컴포넌트 설명

데이터가 없을 때 사용자에게 표시하는 빈 상태 컴포넌트입니다. `variant`에 따라 프리셋 메시지와 버튼을 표시하며, Props > Variant > Default 우선순위로 설정을 병합합니다. 기본값은 `EMPTY_STATE_MAP.default`에서 관리합니다.

## 🎯 주요 기능

- `variant`에 따른 메시지 및 버튼 프리셋
- **버튼 자동 표시**: `buttonText`가 있으면 자동으로 버튼 표시
- Props를 통한 유연한 커스터마이징 (title, description, buttonText, buttonLink 개별 설정 가능)
- 버튼 클릭 시 지정된 링크로 이동 (기본값: `/`)
- `text-align: center`로 모든 요소 중앙 정렬

## 🔧 사용 예시

### 기본 사용 (variant만 지정)

```typescript
import { EmptyState } from '@shared/components';

function MyCampaignList() {
  return (
    <EmptyState variant="no-applied" />
  );
}
```

### Props로 커스터마이징

```typescript
// variant 설정을 덮어쓰기
<EmptyState
  variant="no-applied"
  description="아직 신청한 캠페인이 없어요"
  buttonText="캠페인 둘러보기"
  buttonLink="/campaigns"
/>

// variant 없이 직접 설정
<EmptyState
  title="검색 결과가 없어요"
  description="다른 키워드로 검색해보세요"
/>
```

### variant별 자동 매핑

```typescript
// MyCampaignStatus를 EmptyStateVariant로 자동 매핑
import { STATUS_EMPTY_MAP } from '@entities/history/types/myCampaign.types';

<EmptyState variant={STATUS_EMPTY_MAP[status]} />
```

## 📝 Props & 타입

```typescript
export interface EmptyStateProps {
  description?: string;
  variant?: EmptyStateVariant;
  title?: string;
  buttonText?: string;
  buttonLink?: string;
}

export type EmptyStateVariant =
  | 'no-selected'
  | 'no-registered'
  | 'no-applied'
  | 'no-completed'
  | 'no-opened';

// variant가 없으면 'default' 프리셋 사용
export const EMPTY_STATE_MAP: Record<EmptyStateVariant | 'default', EmptyStateConfig>;
```

## 📋 Variant 및 병합 우선순위

### 버튼이 있는 variant

- **no-selected**: "아직 선정된 체험이 없네요.\n좋은 결과가 있을 거예요."
- **no-registered**: "아직 작성한 체험이 없네요.\n지금 진행중인 체험을 구경해보세요."
- **no-applied**: "아직 신청한 체험이 없네요.\n지금 진행중인 체험을 구경해보세요."
- **no-completed**: "아직 완료한 체험이 없네요.\n지금 진행중인 체험을 구경해보세요."

버튼 텍스트: "진행중인 체험 보러가기" (클릭 시 홈으로 이동)

### 버튼이 없는 variant

- **no-opened**:
  - 타이틀: "지금은 모집중인 체험이 없어요"
  - Description: "지난 체험들을 구경해보세요"

## 🎨 스타일

- 모든 요소 중앙 정렬 (`text-align: center`)
- 버튼이 있는 경우: `position: absolute`로 상단에서 25vh 위치에 배치 (부모 요소에 `position: relative` 필요)
- 버튼이 없는 경우: 일반 레이아웃으로 표시 (상하 패딩 16px)
- Description의 줄바꿈(`\n`)은 `white-space: pre-line`으로 처리
- `buttonText` 유무에 따라 클래스명 자동 적용 (`EmptyState--hasButton`)

## 🔄 설정 병합 우선순위

컴포넌트는 다음 우선순위로 최종 설정을 결정합니다:

1. **Props**: 직접 전달된 props (최우선)
2. **Variant**: variant에 정의된 설정
3. **Default**: `EMPTY_STATE_MAP.default` 값 (description: 안내 메시지, buttonLink: '')

```typescript
// 예시: Props가 Variant를 덮어씀
<EmptyState
  variant="no-applied"           // description: "아직 신청한 체험이..."
  description="커스텀 메시지"     // ✅ 이 값이 최종 적용됨
/>
```

## 🛠️ 내부 구조

컴포넌트는 아래와 같이 설정을 병합합니다:

```typescript
const variantConfig = EMPTY_STATE_MAP[props.variant ?? 'default'];
const config = {
  title: props.title ?? variantConfig.title,
  description: props.description ?? variantConfig.description,
  buttonText: props.buttonText ?? variantConfig.buttonText,
  buttonLink: props.buttonLink ?? variantConfig.buttonLink ?? '',
};
```

Props > Variant > Default 우선순위가 보장됩니다.

## 🔗 사용 위치

- 체험 목록이 비어있을 때 (`CampaignList`)
- 사용자의 신청/선정/완료 내역이 없을 때
- 모집중인 체험이 없을 때
- 검색 결과가 없을 때
- 기타 데이터가 없는 상태를 표시해야 하는 곳

## 💡 팁

- **간단한 사용**: variant만 지정하면 프리셋 메시지 자동 적용
- **커스터마이징**: 필요한 props만 덮어써서 유연하게 사용
- **버튼 표시**: `buttonText`만 넘기면 자동으로 버튼 표시 (showButton prop 불필요)
- **타입 안전성**: TypeScript로 모든 타입이 보장되어 안전하게 사용 가능

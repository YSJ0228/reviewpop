# Error Boundary

## 📌 이 컴포넌트는 무엇인가요?

React 컴포넌트에서 발생하는 **JavaScript 에러를 잡아내는 안전망**입니다.
에러가 발생해도 앱이 완전히 깨지는 것을 방지하고, 사용자에게 친절한 에러 메시지를 보여줍니다.

## 🎯 왜 필요한가요?

### ❌ Error Boundary 없이

```typescript
function ProductCard({ product }) {
  // product가 undefined면 앱 전체가 하얗게 깨짐!
  return <div>{product.name}</div>
}
```

### ✅ Error Boundary 있으면

```typescript
<ErrorBoundary>
  <ProductCard product={product} />
</ErrorBoundary>
```

에러가 발생해도:

- 폴백 UI를 보여줌
- 나머지 앱은 정상 작동
- 에러 로그 수집 가능

## 📝 사용 방법

### 1. 기본 사용

```typescript
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### 2. 커스텀 폴백 UI

```typescript
<ErrorBoundary
  fallback={
    <div>
      <h1>커스텀 에러 메시지</h1>
      <p>문제가 발생했습니다.</p>
    </div>
  }
>
  <MyComponent />
</ErrorBoundary>
```

### 3. 여러 곳에 적용

```typescript
function App() {
  return (
    <div>
      {/* 전체 앱을 감싸기 */}
      <ErrorBoundary>
        <Header />

        {/* 특정 섹션만 감싸기 */}
        <ErrorBoundary>
          <ProductList />
        </ErrorBoundary>

        <ErrorBoundary>
          <ReviewList />
        </ErrorBoundary>

        <Footer />
      </ErrorBoundary>
    </div>
  );
}
```

## 💡 언제 사용하나요?

### ✅ 사용하면 좋은 곳

- 외부 API로부터 받은 데이터를 표시하는 컴포넌트
- 복잡한 계산이나 변환이 있는 컴포넌트
- 서드파티 라이브러리를 사용하는 컴포넌트
- 동적으로 로드되는 컴포넌트

### 예시

```typescript
// 외부 API 데이터
<ErrorBoundary>
  <ProductList />
</ErrorBoundary>

// 복잡한 차트 라이브러리
<ErrorBoundary>
  <Chart data={data} />
</ErrorBoundary>
```

## 🚨 주의사항

Error Boundary는 다음 에러는 **잡지 못합니다**:

- ❌ 이벤트 핸들러 내부의 에러
- ❌ 비동기 코드의 에러 (setTimeout, Promise 등)
- ❌ 서버 사이드 렌더링 에러
- ❌ Error Boundary 자체에서 발생한 에러

### 이벤트 핸들러 에러는 try-catch 사용

```typescript
function MyComponent() {
  const handleClick = () => {
    try {
      // 에러가 발생할 수 있는 코드
      doSomethingRisky();
    } catch (error) {
      console.error('이벤트 핸들러 에러:', error);
    }
  };

  return <button onClick={handleClick}>클릭</button>;
}
```

## 🔧 개발 팁

### 1. 개발 환경에서는 에러 상세 정보가 표시됩니다

프로덕션에서는 사용자 친화적인 메시지만 표시됩니다.

### 2. 나중에 Sentry 연동 가능

```typescript
// ErrorBoundary.tsx 내부
componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  // Sentry에 에러 전송
  Sentry.captureException(error, {
    contexts: { react: errorInfo }
  });
}
```

### 3. 다시 시도 기능

기본 Error Boundary에는 "다시 시도" 버튼이 있습니다.
클릭하면 에러 상태가 초기화됩니다.

## 📚 추가 자료

- [React 공식 문서 - Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

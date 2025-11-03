/**
 * Error Boundary 컴포넌트
 *
 * React 컴포넌트 트리에서 발생하는 JavaScript 에러를 잡아내고
 * 앱이 완전히 깨지는 것을 방지합니다.
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */

'use client';

import { Component, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
  /** 에러 발생 시 표시할 폴백 UI (선택사항) */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * 에러가 발생하면 이 메서드가 호출됩니다
   */
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * 에러 정보를 로그로 기록합니다
   * 나중에 Sentry 같은 에러 트래킹 서비스와 연동할 수 있습니다
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary가 에러를 감지했습니다:', error, errorInfo);

    // TODO: 나중에 Sentry 등 에러 트래킹 서비스에 전송
    // Sentry.captureException(error, { contexts: { react: errorInfo } });
  }

  /**
   * 에러 상태를 초기화하고 재시도합니다
   */
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // 커스텀 폴백 UI가 제공되면 사용
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 기본 에러 UI
      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <h2 className={styles.title}>앗, 문제가 발생했어요!</h2>
            <p className={styles.message}>
              일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
            </p>

            {/* 개발 환경에서만 에러 상세 정보 표시 */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className={styles.details}>
                <summary>개발자 정보 (프로덕션에서는 표시되지 않음)</summary>
                <pre className={styles.errorDetails}>
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <button className={styles.button} onClick={this.handleReset}>
              다시 시도
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

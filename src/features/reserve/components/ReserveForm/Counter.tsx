'use client';

import { useState } from 'react';
import { counterHelpers } from './utils';
import styles from './Counter.module.scss';
import { IconMinus, IconPlus } from '@pop-ui/foundation';

interface CounterProps {
  title: string;
  maxCount: number;
  subtitle?: string;
  onChange?: (value: number) => void;
  initialValue?: number;
}

export function Counter({ title, maxCount, subtitle, onChange, initialValue = 1 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const handleCountChange = (newCount: number) => {
    setCount(newCount);
    onChange?.(newCount);
  };

  const handleDecrement = () => {
    handleCountChange(counterHelpers.decrement(count));
  };

  const handleIncrement = () => {
    handleCountChange(counterHelpers.increment(count, maxCount));
  };

  const displayText = `${title} ${count}${title === '인원' ? '명' : ''}`;

  return (
    <div className={styles.Counter}>
      <div className={styles.Counter__Header}>
        <span className={styles.Counter__Title}>{displayText}</span>
        <div className={styles.Counter__Controls}>
          <button
            onClick={handleDecrement}
            disabled={count === 1}
            className={styles.Counter__Button}
            aria-label="감소"
          >
            <IconMinus size={16} />
          </button>
          <span className={styles.Counter__Value}>{count}</span>
          <button
            onClick={handleIncrement}
            disabled={count === maxCount}
            className={styles.Counter__Button}
            aria-label="증가"
          >
            <IconPlus size={16} />
          </button>
        </div>
      </div>

      {subtitle && <p className={styles.Counter__Subtitle}>{subtitle}</p>}
    </div>
  );
}

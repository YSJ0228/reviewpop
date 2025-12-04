'use client';

import { useState } from 'react';
import styles from './Counter.module.scss';

interface CounterProps {
  title: string;
  maxCount: number;
  subtitle?: string;
  onChange?: (value: number) => void;
  initialValue?: number;
}

export function Counter({ title, maxCount, subtitle, onChange, initialValue = 1 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const handleDecrement = () => {
    const newCount = Math.max(1, count - 1);
    setCount(newCount);
    onChange?.(newCount);
  };

  const handleIncrement = () => {
    const newCount = Math.min(maxCount, count + 1);
    setCount(newCount);
    onChange?.(newCount);
  };

  return (
    <div className={styles.Counter}>
      {/* Title and Counter Controls */}
      <div className={styles.Counter__Header}>
        <span className={styles.Counter__Title}>
          {title} {count}
          {title === '인원' ? '명' : ''}
        </span>
        <div className={styles.Counter__Controls}>
          <button
            onClick={handleDecrement}
            disabled={count === 1}
            className={styles.Counter__Button}
          >
            -
          </button>
          <span className={styles.Counter__Value}>{count}</span>
          <button
            onClick={handleIncrement}
            disabled={count === maxCount}
            className={styles.Counter__Button}
          >
            +
          </button>
        </div>
      </div>

      {/* Subtitle */}
      {subtitle && <p className={styles.Counter__Subtitle}>{subtitle}</p>}
    </div>
  );
}

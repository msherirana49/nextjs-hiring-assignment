"use client";

import { useEffect, useState } from "react";

export function useDebounce<TValue>(value: TValue, delay = 250): TValue {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => window.clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

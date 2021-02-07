import { useEffect } from 'react';

export default function useInterval(
  callback: (...args: any[]) => void,
  interval: number,
  deps: React.DependencyList | undefined,
  condition: boolean = true
) {
  // Effect for autosliding
  useEffect(() => {
    let id: number;

    if (condition) {
      id = (setInterval(callback, interval) as unknown) as number;
    }

    return () => {
      if (id) clearInterval(id);
    };
  }, deps);
}

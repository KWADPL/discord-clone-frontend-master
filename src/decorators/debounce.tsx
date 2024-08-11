/**
 * Debouncing – opóźnia wykonanie funkcji, aż minie określony czas od ostatniego wywołania.
 * @param fn Funkcja do debouncingu
 * @param ms Liczba milisekund do debouncingu
 * @returns Funkcja, która wywołuje debounced funkcję
 */
const Debounce = <T extends (...args: any[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
      if (timeoutId) {
          clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
          fn(...args);
      }, ms);
  };
};

export default Debounce;

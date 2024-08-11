/**
 * Opóźnia wykonanie funkcji o określoną liczbę milisekund.
 * @param fn Funkcja do opóźnienia
 * @param ms Liczba milisekund do opóźnienia
 * @returns Funkcja, która wywołuje opóźnioną funkcję
 */
const Delay = <T extends (...args: any[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void => {
  return (...args: Parameters<T>) => {
      setTimeout(() => {
          fn(...args);
      }, ms);
  };
};

export default Delay;

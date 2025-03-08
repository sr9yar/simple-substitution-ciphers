
/**
 * Modulo operation
 * In JS % is not the modulo operator. It's the remainder operator.
 * In JS: -1%5=-1
 * Hence, to get the expected outcome we must use this
 * @param dividend
 * @param divisor
 * @returns 
 */
export function modulo(dividend: number, divisor: number): number {
  const m = ((dividend % divisor) + divisor) % divisor;
  return m;
}

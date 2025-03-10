import {
  NUMBER_SUBSCRIPT,
  NUMBER_SUPERSCRIPT,
} from "./constants";

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



/**
 * Ensure index is a positive number (modulo)
 * @param index 
 */
export function ensurePositive(index: number, divisor: number): number {
  return modulo(index < 0 ? index + divisor : index, divisor);
}



/**
 * Ensure positive return of the modulo operation
 * @param dividend 
 * @param divisor 
 */
export function moduloPositive(dividend: number, divisor: number): number {
  return ensurePositive(modulo(dividend, divisor), divisor);
}



/**
 * Simplified Euclidean algorithm
 * @param a 
 * @param b 
 * @returns 
 */
export function gcd(a: number, b: number): number {
  if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
}



/**
 * Split string to array
 * @param str Array | string 
 * @returns Array
 */
export function stringToArray(str: Array<string> | string): string[] {

  if (Array.isArray(str)) {
    return str;
  }

  return Array.from(
    new Set(
      str
        .toLowerCase()
        .split('')
    )
  );
}



/**
 * String to map to create a map for alphabet
 * @param str 
 * @returns 
 */
export function stringToMap(str: Array<string> | string): Map<string, number> {
  const arr = stringToArray(str);
  const m = new Map(arr.map((value: string, index: number) => [value, index]));
  return m;
}

/**
 * Convert number symbol to subscript (for logging)
 * @param num 
 */
export function sub(num: number): string {
  const symbol = NUMBER_SUBSCRIPT.get(num);
  return symbol ?? '';

}

/**
 * Convert number symbol to superscript (for logging)
 * @param num 
 */
export function sup(num: number): string {
  const symbol = NUMBER_SUPERSCRIPT.get(num);
  return symbol ?? '';
}



/**
 * Integer division
 * @param dividend
 * @param divisor
 * @returns 
 */
export function integerDivision(dividend: number, divisor: number): number {
  return Math.floor(dividend / divisor);
}



/**
 * Check whether two number are co prime
 * @param a 
 * @param b 
 * @returns 
 */
export function areCoprime(a: number, b: number): boolean {
  return gcd(a, b) === 1;
}


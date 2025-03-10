import { stringToArray, stringToMap } from "../lib/utility";

/**
 * Abstract class
 */
export abstract class Cipher {

  private verbose: boolean = true;

  protected alphabet: string[];
  protected alphabetMap: Map<string, number>;

  abstract encrypt(): string;
  abstract decrypt(): string;

  /**
   * Set print to console
   * @param value 
   */
  setVerbose(value: boolean): void {
    this.verbose = value;
  }

  /**
   * Print a log
   * @param value 
   * @returns 
   */
  log(message: any, ...optionalParams: any[]): void {
    if (!this.verbose) {
      return;
    }
    let color: any = 'white';
    const colorOptionIndex = optionalParams.findIndex((o: any) => o.toString().startsWith('color:'));
    if (colorOptionIndex !== -1) {
      color = optionalParams[colorOptionIndex].split(':')[1];
      optionalParams.splice(colorOptionIndex, 1);
    }
    optionalParams.pop();
    console.log(`%c ${message}`, `color:${color};`, ...optionalParams);
  }

  /**
   * Print a warn
   * @param value 
   * @returns 
   */
  warn(message: any): void {
    if (!this.verbose) {
      return;
    };
    console.warn(`${message}`);
  }


  /**
   * Setting alphabet
   * @param alphabet 
   * @returns 
   */
  setAlphabet(alphabet: Array<string> | string): void {
    this.alphabet = stringToArray(alphabet)
    this.alphabetMap = stringToMap(alphabet);
  }


  /**
   * Alphabet length
   */
  get mod(): number {
    return this.alphabet.length;
  }
}
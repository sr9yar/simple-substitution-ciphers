import { stringToArray, stringToMap } from "../lib/utility";

/**
 * Abstract class
 */
export abstract class Cipher {

  private verbose: boolean = true;

  public alphabet: string[] = [];
  public alphabetMap: Map<string, number> = new Map();

  abstract encrypt(): string;
  abstract decrypt(): string;

  logs: string[] = [];

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
    let color: any = 'white';
    const colorOptionIndex = optionalParams.findIndex((o: any) => o.toString().startsWith('color:'));
    if (colorOptionIndex !== -1) {
      color = optionalParams[colorOptionIndex].split(':')[1];
      optionalParams.splice(colorOptionIndex, 1);
    }
    optionalParams.pop();
    const messageString = `${message}`;

    this.logs.push(messageString);

    if (!this.verbose) {
      return;
    }
    console.log(`%c ${messageString}`, `color:${color};`, ...optionalParams);
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
   * Reset logs
   */
  clearLogs(): void {
    this.logs?.splice(0, this.logs.length);
  }

  /**
   * Alphabet length
   */
  get mod(): number {
    return this.alphabet.length;
  }
}
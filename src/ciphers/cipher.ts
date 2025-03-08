/**
 * Abstract class
 */
export abstract class Cipher {

  private verbose: boolean = true;

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
  log(value: string): void {
    if (!this.verbose) {
      return;
    }
    console.log(value);
  }
}
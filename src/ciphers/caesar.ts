import { modulo } from "src/common";
import { Cipher } from "./cipher";

/**
 * Caesar cipher class
 */
export class Caesar extends Cipher {

  private shift: number = -3;
  // 'abcdefghijklmnopqrstuvwxyz'
  // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  private alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  // private plaintext: string = 'CRYptography';
  private plaintext: string[] = 'cryptography'.split('');

  private ciphertext: string[] = 'zovmqldoxmev'.split('');



  /**
   * Plain text string representation
   */
  get plaintextString(): string {
    return this.plaintext.join('')
  }



  /**
   * Cipher text string representation
   */
  get ciphertextString(): string {
    return this.ciphertext.join('')
  }



  /**
   * Setting shift
   * @param shift 
   */
  setShift(shift: number): void {
    this.shift = shift;
  }



  /**
   * Set plaintext
   * @param text 
   */
  setPlaintext(text: string): void {
    this.plaintext = this.stringToArray(text)
  }



  /**
   * Set ciphertext
   * @param text 
   */
  setCiphertext(text: string | string[]): void {
    this.ciphertext = this.stringToArray(text)
  }



  /**
   * Setting alphabet
   * @param alphabet 
   * @returns 
   */
  setAlphabet(alphabet: Array<string> | string): void {
    this.alphabet = this.stringToArray(alphabet)
  }



  /**
   * Encrypt
   */
  encrypt(): string {
    this.log(`Encrypting: ${this.plaintextString}`);

    const encrypted: string[] = [];

    for (let i = 0; i < this.plaintext.length; i++) {
      const currentLetter = this.plaintext[i];
      const currentIndex = this.alphabet.indexOf(currentLetter);
      if (currentIndex === -1) {
        encrypted.push(currentLetter);
        continue;
      }
      const shiftedIndex = this.ensurePositive(currentIndex + this.shift);
      const encryptedLetter = this.alphabet[shiftedIndex];
      this.log(`${currentLetter} (${currentIndex})\t→  ${encryptedLetter} (${shiftedIndex}) `)
      encrypted.push(encryptedLetter);
    }

    this.setCiphertext(encrypted);
    this.log(`Encryption result: ${this.ciphertextString}\n`);

    return encrypted.join('');
  }



  /**
   * Decrypt
   */
  decrypt(text?: string): string {

    const ciphertext = text ? this.stringToArray(text) : this.ciphertext;

    this.log(`Decrypting: ${this.ciphertextString}`);

    const decrypted: string[] = [];
    for (let i = 0; i < ciphertext.length; i++) {
      const currentLetter = ciphertext[i];
      const currentIndex = this.alphabet.indexOf(currentLetter);
      if (currentIndex === -1) {
        decrypted.push(currentLetter);
        continue;
      }
      const shiftedIndex = this.ensurePositive(currentIndex + -(this.shift));
      const decryptedLetter = this.alphabet[shiftedIndex];
      this.log(`${currentLetter} (${currentIndex})\t→  ${decryptedLetter} (${shiftedIndex}) `)
      decrypted.push(decryptedLetter);
    }

    const decryptionResult = decrypted.join('');
    this.log(`Decryption result: ${decryptionResult}\n`);

    return decryptionResult;
  }

  /**
   * Split string to array
   * @param str Array | string 
   * @returns Array
   */
  private stringToArray(str: Array<string> | string): string[] {

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
   * Ensure index is a positive number
   * @param index 
   */
  private ensurePositive(index: number): number {
    return modulo(index < 0 ? index + this.alphabet.length : index, this.alphabet.length);
  }
}



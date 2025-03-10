import { ALPHABET_ENGLISH } from '../lib/constants';
import {
  ensurePositive,
} from '../lib/utility';
import { Cipher } from './cipher';

/**
 * Caesar cipher class
 */
export class Caesar extends Cipher {

  private characterShift: number = -3;

  // private plaintext: string = 'CRYptography';
  private plaintext: string[] = 'cryptography'.split('');

  private ciphertext: string[] = 'zovmqldoxmev'.split('');



  /**
   * Constructor
   */
  constructor() {
    super();
    this.setAlphabet(ALPHABET_ENGLISH);
  }



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
   * Character shift
   */
  get shift(): number {
    return this.characterShift;
  }


  /**
   * Setting shift
   * @param shift 
   */
  set shift(value: number) {
    if (value > this.mod) {
      this.characterShift = this.mod;
      this.warn(`Shift cannnot exceed alphabet size. Provided value ${value}.`);
      return;
    }
    if (value < -this.mod) {
      this.characterShift = -this.mod;
      this.warn(`Shift cannnot exceed alphabet size. Provided value ${value}.`);
      return;
    }
    this.characterShift = value;
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
    this.clearLogs();

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
    this.clearLogs();

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
    return ensurePositive(index, this.alphabet.length);
  }
}



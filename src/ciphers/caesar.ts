import { ALPHABET_ENGLISH } from '../lib/constants';
import {
  ensurePositive,
  stringToArray,
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
    this.plaintext = stringToArray(text)
  }



  /**
   * Set ciphertext
   * @param text 
   */
  setCiphertext(text: string | string[]): void {
    this.ciphertext = stringToArray(text)
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
      const currentIndex = this.alphabetMap.get(currentLetter);
      if (currentIndex === undefined) {
        encrypted.push(currentLetter);
        this.log(`${currentLetter} (${currentIndex ?? '-'})\t→  ${currentLetter} (not in the alphabet) `)
        continue;
      }
      const shiftedIndex = ensurePositive(currentIndex + this.shift, this.mod);
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

    const ciphertext = text ? stringToArray(text) : this.ciphertext;

    const decrypted: string[] = [];
    for (let i = 0; i < ciphertext.length; i++) {

      const currentLetter = ciphertext[i];

      const currentIndex = this.alphabetMap.get(currentLetter);

      if (currentIndex === undefined) {
        decrypted.push(currentLetter);
        this.log(`${currentLetter} (${currentIndex ?? '-'})\t→  ${currentLetter} not in the alphabet (not encrypted) `);
        continue;
      }
      const shiftedIndex = ensurePositive(currentIndex + -(this.shift), this.mod);
      const decryptedLetter = this.alphabet[shiftedIndex];
      this.log(`${currentLetter} (${currentIndex})\t→  ${decryptedLetter} (${shiftedIndex}) `)
      decrypted.push(decryptedLetter);
    }

    const decryptionResult = decrypted.join('');
    this.log(`Decryption result: ${decryptionResult}\n`);

    return decryptionResult;
  }


}



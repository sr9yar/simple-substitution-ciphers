import { EuclideanAlgorithm } from 'src/lib/euclidean-algorithm';
import { ALPHABET_RUSSIAN } from '../lib/constants';
import {
  areCoprime,
  ensurePositive,
  moduloPositive,
  stringToArray,
  sub,
} from '../lib/utility';
import { Cipher } from './cipher';



/**
 * Affine cipher class
 */
export class Affine extends Cipher {

  // private alphabetMap: Map<string, number> = stringToMap(alphabetEnglish);
  //private alphabetMap: Map<string, number> = stringToMap(alphabetRussian);

  // private plaintext: string[] = 'cryptography'.split('');
  private plaintext: string[] = 'в феврале'.split('');

  private ciphertext: string[] = 'ы ьпыбаяп'.split('');

  private α: number = 7;

  private β: number = 14; // ключ k



  /**
   * Constructor
   */
  constructor() {
    super();
    this.setAlphabet(ALPHABET_RUSSIAN);
  }



  /**
   * α
   */
  get a(): number {
    return this.α;
  }

  /**
   * β
   */
  get b(): number {
    return this.β;
  }



  /**
    * α
    */
  set a(value: number) {
    if (!areCoprime(value, this.mod)) {
      throw Error(`α₂ must be coprime with ${this.mod}`);
    }
    this.α = value;
  }

  /**
   * β
   */
  set b(value: number) {
    this.β = value;
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
    this.log(`Encrypting (y = (α * x + β) mod n): ${this.plaintextString}`);

    const encrypted: string[] = [];

    for (let i = 0; i < this.plaintext.length; i++) {
      const currentLetter = this.plaintext[i];

      const currentIndex = this.alphabetMap.get(currentLetter);
      if (currentIndex === undefined) {
        encrypted.push(currentLetter);
        this.log(`y${sub(i)} = ${currentLetter} (is not in the alphabet)`);
        continue;
      }
      const encryptedIndex = this.encryptLetter(currentLetter, i);

      let encryptedLetter: string;
      if (encryptedIndex === null) {
        encryptedLetter = currentLetter;
      } else {
        encryptedLetter = this.alphabet[encryptedIndex];
      }

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

    const ciphertext = text ? stringToArray(text) : this.ciphertext;

    this.log(`Decrypting (y = α⁻¹(y-β) mod n): ${this.ciphertextString}`);

    const decrypted: string[] = [];

    const e = new EuclideanAlgorithm();
    const result = e.calc(this.α, this.mod);

    this.log(`\n`);
    e.printResults();
    this.log(`\n`);

    // α⁻¹
    const aInverse = ensurePositive(result[1], this.mod);

    this.log(`α⁻¹ mod n = ${this.α}⁻¹ mod ${this.mod} = ${aInverse}`);

    for (let i = 0; i < ciphertext.length; i++) {
      const currentLetter = ciphertext[i];
      const decryptedIndex = this.decryptLetter(currentLetter, aInverse, i);

      let decryptedLetter: string;
      if (decryptedIndex === null) {
        decryptedLetter = currentLetter;
      } else {
        decryptedLetter = this.alphabet[decryptedIndex];
      }

      decrypted.push(decryptedLetter);
    }

    const decryptionResult = decrypted.join('');

    this.log(`Decryption result: ${decryptionResult}\n`);

    return decryptionResult;
  }



  /**
   * Decrypt a letter
   * @param letter 
   */
  decryptLetter(letter: string, aInverse: number = 1, i: number | undefined = undefined): number | null {
    // y
    const letterIndex = this.alphabetMap.get(letter);
    if (letterIndex === undefined) {
      this.log(`y${sub(i)} = ${letter} (is not in the alphabet)`);
      return null;
    }
    const index = moduloPositive(aInverse * (letterIndex - this.β), this.mod);
    const decrytedLetter = this.alphabet[index];
    this.log(`y${sub(i)} = α⁻¹(y${sub(i)} - β) mod n = ${aInverse}(${letterIndex} - ${this.β}) mod ${this.mod} = ${decrytedLetter} (${index})`);
    return index;
  }



  /**
   * Encrypt a letter
   * @param letter 
   */
  encryptLetter(x: string, i: number | undefined = undefined): number {
    const y = this.α * this.alphabetMap.get(x) + this.β;
    const index = moduloPositive(y, this.mod);
    const encrytedLetter = this.alphabet[index];
    this.log(`y${sub(i)} = (α * x${sub(i)} + β) mod n = (${this.α} * ${x} + ${this.β}) mod ${this.mod} = ${encrytedLetter} (${index})`);
    return index;
  }




}



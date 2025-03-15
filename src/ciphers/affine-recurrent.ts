import { EuclideanAlgorithm } from '../lib/euclidean-algorithm';
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
 * Affine recurrent cipher class
 */
export class AffineRecurrent extends Cipher {

  private plaintext: string[] = 'вфеврале'.split('');

  private ciphertext: string[] = 'ыоатяфыв'.split('');

  // ---------- ключ k1 ----------
  // coprime with alphabet length
  private α1: number = 7;

  private β1: number = 14; // ключ k
  // -----------------------------

  // ---------- ключ k2 ----------
  // coprime with alphabet length
  private α2: number = 5;

  private β2: number = 9; // ключ k
  // -----------------------------


  /**
   * Constructor
   */
  constructor() {
    super();
    this.setAlphabet(ALPHABET_RUSSIAN);
  }


  /**
   * α₁
   */
  get a1(): number {
    return this.α1;
  }

  /**
   * α₂
   */
  get a2(): number {
    return this.α2;
  }

  /**
   * β₁
   */
  get b1(): number {
    return this.β1;
  }

  /**
   * β₂
   */
  get b2(): number {
    return this.β2;
  }


  /**
    * α₁
    */
  set a1(value: number,) {
    if (!areCoprime(value, this.mod)) {
      throw Error(`α₁ (${value}) must be coprime with ${this.mod}`);
    }
    this.α1 = value;
  }

  /**
    * α₂
    */
  set a2(value: number,) {
    if (!areCoprime(value, this.mod)) {
      throw Error(`α₂ (${value}) must be coprime with ${this.mod}`);
    }
    this.α2 = value;
  }

  /**
   * β₁ 
   */
  set b1(value: number) {
    this.β1 = value;
  }

  /**
   * β₂
   */
  set b2(value: number) {
    this.β2 = value;
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
    this.clearLogs();

    this.log(`Encrypting (y = (α × x + β) mod n): ${this.plaintextString}`);

    const encrypted: string[] = [];

    let a1 = this.α1;
    let a2 = this.α2;
    let b1 = this.β1;
    let b2 = this.β2;

    // Letter that are not in the alphabet will be skipped
    // which breaks i index 
    let encryptionIndex: number = 0;

    for (let i = 0; i < this.plaintext.length; i++) {
      const currentLetter = this.plaintext[i];

      const currentIndex = this.alphabetMap.get(currentLetter);
      if (currentIndex === undefined) {
        encrypted.push(currentLetter);
        this.log(`y${sub(i + 1)} = ${currentLetter} (is not in the alphabet)`);
        continue;
      }
      const [a, b] = this.getEncryptionPair(encryptionIndex, [a1, a2], [b1, b2]);
      const [encryptedIndex, a3, b3] =
        this.encryptLetter(currentLetter, a, b, i);

      let encryptedLetter: string;
      if (encryptedIndex === null) {
        encryptedLetter = currentLetter;
      } else {
        encryptedLetter = this.alphabet[encryptedIndex];
      }

      encrypted.push(encryptedLetter);

      a1 = a2;
      b1 = b2;
      a2 = a3;
      b2 = b3;
      encryptionIndex++;
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

    this.log(`Decrypting (y = α⁻¹(y-β) mod n): ${this.ciphertextString}`);

    const decrypted: string[] = [];

    let a1 = this.α1;
    let a2 = this.α2;
    let b1 = this.β1;
    let b2 = this.β2;

    let decryptionIndex: number = 0;

    for (let i = 0; i < ciphertext.length; i++) {
      const currentLetter = ciphertext[i];

      const currentIndex = this.alphabetMap.get(currentLetter);
      if (currentIndex === undefined) {
        decrypted.push(currentLetter);
        this.log(`y${sub(i + 1)} = ${currentLetter} (is not in the alphabet)`);
        continue;
      }

      const [a3, b3] = this.getDecryptionPair(decryptionIndex, [a1, a2], [b1, b2]);

      const decryptedIndex = this.decryptLetter(currentLetter, a3, b3, i);

      let decryptedLetter: string;
      if (decryptedIndex === null) {
        decryptedLetter = currentLetter;
      } else {
        decryptedLetter = this.alphabet[decryptedIndex];
      }

      decrypted.push(decryptedLetter);

      a1 = a2;
      b1 = b2;
      a2 = a3;
      b2 = b3;
      decryptionIndex++;
    }

    const decryptionResult = decrypted.join('');

    this.log(`Decryption result: ${decryptionResult}\n`);

    return decryptionResult;
  }



  /**
   * Decrypt a letter
   * @param letter 
   */
  decryptLetter(letter: string, a3: number = 1, b3: number = 1, i: number | undefined = undefined): number | null {
    // y
    const letterIndex = this.alphabetMap.get(letter);

    const idx: string = sub(i !== undefined ? i + 1 : undefined);

    if (letterIndex === undefined) {
      this.log(`y${idx} = ${letter} (is not in the alphabet)`);
      return null;
    }
    const index = moduloPositive(a3 * (letterIndex - b3), this.mod);
    const decrytedLetter = this.alphabet[index];
    this.log(`y${idx} = α${idx}⁻¹(y${idx} - β${idx}) mod n = ${a3}(${letterIndex} - ${b3}) mod ${this.mod} = ${decrytedLetter} (${index})`);
    return index;
  }



  /**
   * Encrypt a letter
   * @param letter 
   * @returns [number, number, nubmer] index encrypted, a3, b3
   */
  encryptLetter(x: string, a3: number, b3: number, i: number | undefined = undefined): [number, number, number] {
    const xIndex = this.alphabetMap.get(x);
    const y = a3 * xIndex + b3;
    const index = moduloPositive(y, this.mod);
    const encrytedLetter = this.alphabet[index];

    const idx: string = sub(i !== undefined ? i + 1 : undefined);

    this.log(`y${idx} = (α${idx} × x${idx} + β${idx}) mod n = (${a3} × ${xIndex} + ${b3}) mod ${this.mod} = ${encrytedLetter} (${index})`);
    return [index, a3, b3];
  }



  /**
   * Get a,b key pair for encryption
   * @param a 
   * @param b 
   * @param index 
   * @returns 
   */
  getEncryptionPair(index: number, a: [number, number], b: [number, number]): [number, number] {

    const idx: number = index + 1;

    if (index === 0) {
      this.log(` α${sub(idx)} = ${this.α1}`);
      this.log(` β${sub(idx)} = ${this.β1}`);
      return [this.α1, this.β1];
    } else if (index === 1) {
      this.log(` α${sub(idx)} = ${this.α2}`);
      this.log(` β${sub(idx)} = ${this.β2}`);
      return [this.α2, this.β2];
    }

    const a3 = moduloPositive(a[0] * a[1], this.mod);
    const b3 = moduloPositive(b[0] + b[1], this.mod);

    this.log(` α${sub(idx)} = α${sub(idx - 1)} × α${sub(idx - 2)} mod n = ${a[0]} × ${a[1]} mod ${this.mod} = ${a3}`);
    this.log(` β${sub(idx)} = (β${sub(idx - 1)} + β${sub(idx - 2)}) mod n = (${b[0]} + ${b[1]}) mod ${this.mod} = ${b3}`);

    return [a3, b3];
  }



  /**
   * Get decryption keys
   * @param a 
   * @param b 
   * @param index 
   * @returns 
   */
  getDecryptionPair(index: number, a: [number, number], b: [number, number]): [number, number] {
    let a3: number;
    let b3: number;

    let calcStringA: string = '';
    let calcStringB: string = '';

    const idx: number = index + 1;

    if (index === 0) {
      a3 = this.α1;
      b3 = this.β1;
      calcStringA = ` = ${a3}⁻¹ mod ${this.mod}`;

      const e = new EuclideanAlgorithm();
      e.logger = { log: this.log };
      const result = e.calc(a3, this.mod);
      // this.log(`\n`);
      // e.printResults();
      // this.log(`\n`);

      // α⁻¹
      a3 = ensurePositive(result[1], this.mod);

    } else if (index === 1) {
      a3 = this.α2;
      b3 = this.β2;
      calcStringA = ` = ${a3}⁻¹ mod ${this.mod}`;

      const e = new EuclideanAlgorithm();
      e.logger = { log: this.log };

      const result = e.calc(a3, this.mod);
      // this.log(`\n`);
      // e.printResults();
      // this.log(`\n`);

      // α⁻¹
      a3 = ensurePositive(result[1], this.mod);

    } else {
      a3 = moduloPositive(a[0] * a[1], this.mod);
      b3 = b[0] + b[1];
      calcStringA = ` = α${sub(idx - 2)}⁻¹ × α${sub(idx - 1)}⁻¹ mod n = ${a[0]} × ${a[1]} mod ${this.mod}`;
      calcStringB = ` = (β${sub(idx - 2)} + β${sub(idx - 1)}) mod n = (${b[0]} + ${b[1]}) mod ${this.mod}`;

    }

    b3 = ensurePositive(b3, this.mod);

    this.log(` α${sub(idx)}⁻¹${calcStringA} = ${a3}`);
    this.log(` β${sub(idx)}${calcStringB} = ${b3}`);

    // this.log(`α⁻¹ mod n = ${this.α1}⁻¹ mod ${this.mod} = ${aInverse}`);

    return [a3, b3];
  }

}



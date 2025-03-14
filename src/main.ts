import {
  // Caesar,
  AffineRecurrent,
  // Affine,
} from './ciphers';



// const cipher = new Caesar();
// const cipher = new Affine();
const cipher = new AffineRecurrent();

cipher.setVerbose(true);
// cipher.setPlaintext('plaintext');


const encrypted = cipher.encrypt();
console.log(`Encrypted: ${encrypted}\n`);


const decrypted = cipher.decrypt();
console.log(`Decrypted: ${decrypted}\n`);

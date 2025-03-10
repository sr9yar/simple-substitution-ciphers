import {
  Caesar,
  AffineRecurrent,
  Affine,
} from './ciphers';



const cipher = new Caesar();
// const cipher = new Affine();
// const cipher = new AffineRecurrent();

cipher.setVerbose(true);

const encrypted = cipher.encrypt();
const decrypted = cipher.decrypt();

console.log(`Encrypted: ${encrypted}\n`);
console.log(`Decrypted: ${decrypted}\n`);

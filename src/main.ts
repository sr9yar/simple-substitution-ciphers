import { Ceasar } from "./ciphers/caesar";


const ceasar = new Ceasar();

ceasar.setVerbose(true);
const encrypted = ceasar.encrypt();
const decrypted = ceasar.decrypt();


console.log(`Encrypted: ${encrypted}\n`);
console.log(`Decrypted: ${decrypted}\n`);

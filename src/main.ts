import { Caesar } from "./ciphers/caesar";


const caesar = new Caesar();

caesar.setVerbose(true);
const encrypted = caesar.encrypt();
const decrypted = caesar.decrypt();


console.log(`Encrypted: ${encrypted}\n`);
console.log(`Decrypted: ${decrypted}\n`);

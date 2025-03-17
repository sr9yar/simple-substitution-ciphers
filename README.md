# Simple Substitution Ciphers

Simple Substitution Ciphers implementation in JavaScript

<a href="https://ciphers.0x100.ru/assignment-1" title="Assignment">
Web interface 
</a>


```bash

npm i --save simple-substitution-ciphers

```




## Caesar Cipher



```js
// Создание экземпляра класса
import { Caesar } from './ciphers';
const cipher = new Caesar();

// Установка открытого текста / шифр текста
cipher.setPlaintext('криптография');
cipher.setCiphertext('знёмпланэсёь');

// Установка сдвига
cipher.shift = -3;

// Зашифрование, расшифрование и вывод результата в консоль (стандартный вывод)
const encrypted = cipher.encrypt();
console.log(`Encrypted: ${encrypted}\n`);

const decrypted = cipher.decrypt();
console.log(`Decrypted: ${decrypted}\n`);


```


## Affine Cipher



```js
// Создание экземпляра класса
import { Affine } from './ciphers';
const cipher = new Affine();

// Установка открытого текста / шифр текста
cipher.setPlaintext('криптография');
cipher.setCiphertext('шбкъоувбнькж');

// Установка ключа
cipher.a = 7;
cipher.b = 14;

// Зашифрование, расшифрование и вывод результата в консоль (стандартный вывод)
const encrypted = cipher.encrypt();
console.log(`Encrypted: ${encrypted}\n`);

const decrypted = cipher.decrypt();
console.log(`Decrypted: ${decrypted}\n`);


```



## Affine Recurrent Cipher



```js
// Создание экземпляра класса
import { AffineRecurrent } from './ciphers';
const cipher = new AffineRecurrent();

// Установка открытого текста / шифр текста
cipher.setPlaintext('криптография');
cipher.setCiphertext('шызъёсюезизс');

// Установка ключа
cipher.a1 = 7;
cipher.b1 = 14;
cipher.a2 = 5;
cipher.b2 = 9;

// Зашифрование, расшифрование и вывод результата в консоль (стандартный вывод)
const encrypted = cipher.encrypt();
console.log(`Encrypted: ${encrypted}\n`);

const decrypted = cipher.decrypt();
console.log(`Decrypted: ${decrypted}\n`);


```


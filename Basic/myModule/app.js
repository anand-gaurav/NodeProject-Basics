'use strict';
const Enigma = require('./enigma'); // constructor function of Enigma module
const eng = new Enigma('privatekeytext'); // instantiate the Engima module; pass the key value for crypto 
let encodeString = eng.encode("Don't panic");
let decodeString = eng.decode(encodeString);
console.log("Encoded: ",encodeString);
console.log("Decoded: ",decodeString);
let qr = eng.qrgen('http://npmjs.com','outImage.png');
qr ? console.log('QR Code created successfully') : console.log('Failed creating qr code');
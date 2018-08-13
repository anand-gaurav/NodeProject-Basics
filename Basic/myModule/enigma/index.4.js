'use strict';
const crypto = require('crypto'); // part of node core module; const define in this module will not interfere anywhere else
const qr = require('qr-image');
const fs = require('fs');


module.exports = function (key) {
  this.key = key;
  return {
    encode: (str) => {
      let encoder = crypto.createCipher('aes-256-ctr', this.key); //https://stackoverflow.com/questions/1220751/how-to-choose-an-aes-encryption-mode-cbc-ecb-ctr-ocb-cfb
      let encodedText = encoder.update(str, 'utf8', 'hex');  // update method allows streaming data to flow in and it output the results in hex
      encodedText += encoder.final();
      return encodedText;
    },
    decode: (str) => {
      let decoder = crypto.createDecipher('aes-256-ctr', this.key);
      return decoder.update(str, 'hex', 'utf8');

    },
    qrgen: (data, file) => {
      let dataToEncode = data || null;
      let outImage = file || null;
      if (dataToEncode !== null && outImage !== null) {
        qr.image(dataToEncode, {
          type: 'png',
          size: 20
      }).pipe(fs.createWriteStream(outImage));
        return true;
      }
      else {
        return false;
      }
    }

  }
}
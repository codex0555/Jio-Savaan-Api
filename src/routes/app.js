const CryptoJS = require('crypto-js');

// The encrypted value you provided
//const encryptedValue = 'ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDyyUzBCEAsk1VjIo4xfotW1IsX9DKjjCxZbnkm6DS/PXhSZMwOt0rgxxw7tS9a8Gtq';

// Your decryption function with crypto-js
const createDownloadLinks = (encryptedMediaUrl) => {
  if (!encryptedMediaUrl) return false;

  const qualities = [
    { id: '_12', bitrate: '12kbps' },
    { id: '_48', bitrate: '48kbps' },
    { id: '_96', bitrate: '96kbps' },
    { id: '_160', bitrate: '160kbps' },
    { id: '_320', bitrate: '320kbps' },
  ];

  const key = '38346591';
  const iv = '00000000';

  const encrypted = CryptoJS.enc.Base64.parse(encryptedMediaUrl);
  const keyBytes = CryptoJS.enc.Utf8.parse(key);
  const ivBytes = CryptoJS.enc.Utf8.parse(iv);

  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: encrypted
  }, keyBytes, {
    iv: ivBytes,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  const decryptedLink = decrypted.toString(CryptoJS.enc.Utf8);

  const links = qualities.map((quality) => ({
    quality: quality.bitrate,
    link: decryptedLink.replace('_96', quality.id),
  })) || false;

  return links;
};

module.exports = createDownloadLinks;

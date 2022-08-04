// nodejs module, avoid using this in frontend

const crypto = require('crypto');

const keyHex = process.env.KEY_HEX;
const ivHex = process.env.IV_HEX;

const key = Buffer.from(keyHex, 'hex');
const iv = Buffer.from(ivHex, 'hex');

export function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

export function decrypt(text) {
    const encryptedText = Buffer.from(text, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

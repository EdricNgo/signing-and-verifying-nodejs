var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
const crypto = require('crypto');

/**
 * Creates a SHA256 hash of the message
 * @param {string} message
 * 
 * @returns {string}
 */
function calculateHash(message) {
    return crypto.createHash('sha256').update(message).digest('hex');
}

/**
 * Signs a message with the private key, then return the payload object which store the signature and message
 * @param {string} privateKey
 * @param {string} message
 * 
 * @returns {Payload}
 */
function sign(privateKey, message) {
    privateKey = ec.keyFromPrivate(privateKey);
    const hashTx = calculateHash(message);
    const sig = privateKey.sign(hashTx, 'base64');
    let signature = sig.toDER('hex');
    return {
        message,
        signature
    }
}

/**
 * Checks if the signature is valid (message has not been tampered with) by using public key
 * @param {string} publicKey
 * @param {string} message
 * @param {string} signature
 * 
 * @returns {boolean}
 */
function verify(publicKey, message, signature) {
    publicKey = ec.keyFromPublic(publicKey, 'hex');
    return publicKey.verify(calculateHash(message), signature);
}

module.exports = {
    verify,
    sign,
    calculateHash
}
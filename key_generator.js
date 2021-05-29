var EC = require('elliptic').ec;
var ec = new EC('secp256k1');

//Generate random key pair
var key = ec.genKeyPair();

console.log("\nPrivate key:", key.getPrivate('hex'));
console.log("\nPublic key:", key.getPublic('hex'));
console.log("\n=======================================")
console.log("\nNew key generated , you can copy and change it in config.js")
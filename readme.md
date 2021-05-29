# Simple Signing And Verification NodeJS

A little Node.JS example demonstrating using the standard Crypto and Elliptic library signing a message with a private key, and then verifying the message with the corresponding public key.
- 2 servers : the sender and validator.
- The sender can sign a message with a private key and send it to the validator.
- The validator receives the message with signature then validate if the message is valid .
## Tech

Signing and verifying steps:

- Generate new key pair by ECC secp256k1 
- Calculate the hash (SHA256) of the message, sign it with the private key to generate the signature.
- Send the signature and the message to the Validator
- The Validator calculates the hash (SHA256) of the message, then verifies it by using the corresponding public key.

## Installation

Install the dependencies and run the unit tests

```sh
npm install
npm run test
```

Start the sender server

```sh
node main_sender.js
```
Start the validator server

```sh
node main_validator.js
```
Generate a new random key pair 

```sh
node key_generator.js
```

## APIs, Configs
You can change the configs ( default public and private key ) in "configs.js" .
Import "quoine.postman_collection.json" to test the API.

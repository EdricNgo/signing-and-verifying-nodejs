const assert = require('assert').strict;
const sv = require('../sign_verify')

const defaultPrivateKey = "7b75f7f40779b44cdf1d7900b61340fc15b4aa041685e8f7f681a87f6b3447e8";
const defaultPublicKey = "04eb7dca4b9c0ae5f18598914f0a80e89b885a28a8f44ba1f86dc26ef09d815eadcd93f5c94ba0777ba87560aaf7b274613239505bacf55fd0a300c7acd6b64dc4";
const validPayloadMessage = {
    message: 'Hello from sender',
    signature: '304602210080cac8bcbf030e0e62c28f03ae44aabe080ebaa957032ec52d2deac83bb2babe022100c27949de1512c544db63d3ec663cb69acb3d262e46a6244e5f0b7454036c9b74'
}

describe('Sign and verify funtions', function() {
    describe('Sign message function', function() {
        it('should return Object store the message and the signature', function() {
            let message = "Hello word"
            let actual = sv.sign(defaultPrivateKey, message);
            assert.notStrictEqual(actual.signature, undefined);
            assert.strictEqual(actual.message, message);
        });
    });
    describe('Verify message function', function() {
        it('should return true for valid message', function() {
            let isValid = sv.verify(defaultPublicKey, validPayloadMessage.message, validPayloadMessage.signature);
            assert.strictEqual(isValid, true);
        });
        it('should return false for tampered message with different public/private key', function() {
            let fakePublicKey = "0471b8212ff2004c8ea3f5a50c638c6b466e868181dd9183fcdca52047b2e6cff240e38e317470b6ff85fabdcbdd125292644d689a07439d772e525a1ef25de6dd"
            let isValid = sv.verify(fakePublicKey, validPayloadMessage.message, validPayloadMessage.signature);
            assert.strictEqual(isValid, false);
        });
        it('should return false for tampered message with fake message', function() {
            let fakeMessage = "Hello from faker"
            let isValid = sv.verify(defaultPublicKey, fakeMessage, validPayloadMessage.signature);
            assert.strictEqual(isValid, false);
        });
    });
});
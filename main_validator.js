const express = require('express')
const app = express()
const config = require('./config')
const port = config.validatorPort

const sv = require('./sign_verify')

// Set default public key from config
var publicKey = config.defaultPublicKey;
var messages = []

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.post('/receiveMessage', (req, res) => {
    if (req.body.payload) {
        let payload = req.body.payload;
        messages.push(payload);
        // Verify the message with public key
        let verify = sv.verify(publicKey, payload.message, payload.signature);
        res.json({
            status: true,
            verify
        });
        console.log("\n<-------------------------------------------->")
        console.log("\nReceived message: ", payload.message);
        console.log("\nVerify for default public key: ", verify);
    } else res.json({
        status: false,
        message: "No payload!"
    });
});




app.listen(port, () => {
    console.log(`Validator listening at http://localhost:${port}`)
    console.log(`\nCurrent public key : ${publicKey}`)
})
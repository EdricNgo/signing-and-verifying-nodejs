const express = require('express');
const app = express();
const config = require('./config')
const axios = require('axios');

const port = config.senderPort
const validatorPort = config.validatorPort
const sv = require('./sign_verify')


var privateKey = config.defaultPrivateKey;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.post('/sendMessage', (req, res) => {
    if (req.body.message) {
        let payload;
        if (req.body.custom_private_key)
            //Sign message with custom private key
            payload = sv.sign(req.body.custom_private_key, req.body.message);
        else
            //Sign message with default private key
            payload = sv.sign(privateKey, req.body.message);
        console.log("\n<-------------------------------------------->")
        console.log("\nSend message: ", payload.message);
        axios.post('http://localhost:' + validatorPort + '/receiveMessage', {
                payload
            })
            .then(function(response) {
                console.log(payload)
                if (response.status) {
                    console.log("\nSuccess!")
                    res.json({
                        status: true
                    });
                } else {
                    console.log("\nFail!")
                    res.json({
                        status: false
                    });
                }
            })
            .catch(function(error) {
                console.log(error);
                res.json({
                    status: false,
                    message: "Validator error!"
                });
            });
    } else {
        res.json({
            status: false,
            message: "No message!"
        });
    }
})

app.listen(port, () => {
    console.log(`Sender listening at http://localhost:${port}`)
    console.log(`\nCurrent private key : ${privateKey}`)

})
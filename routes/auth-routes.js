var jwt = require('jsonwebtoken');
const _ = require('lodash');
var CryptoJS = require('crypto-js');

const mongoose = require('mongoose');


const keys = require('../config/keys.js');
const usersBL = require('../business-logic/users-bl');

module.exports = app => {

    app.post('/token', async (req, res) => {
        if (req.body.email && req.body.name && req.body.verificationCode) {
            var ciphertext = CryptoJS.HmacSHA1(req.body.email, keys.secrectCode).toString();

            if (process.env.NODE_ENV !== 'production') {
                console.log('ciphertext', ciphertext);
            }

            if (ciphertext !== req.body.verificationCode) {
                res.sendStatus(401);
            } else {
                var found = await usersBL.getUserByEmail(req.body.email);
                if (!found) {
                    found = await usersBL.addUser({
                        name: req.body.name,
                        email: req.body.email
                    })
                }
                var token = jwt.sign({ id: found.id }, keys.jwtSecret, { expiresIn: '24h' });

                res.json({
                    token: token,
                    user: found
                });
            }
        } else {
            res.sendStatus(401);
        }
    });
};

const express = require('express');
const bodyParser = require('body-parser');


const auth = require('./auth/auth')();

const { Pool, Client } = require('pg');

const app = express();
app.use(auth.initialize());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

require('./routes/clients-routes')(app);
require('./routes/auth-routes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, error => {
    if (error) throw error;
    console.log('Server running on port: ' + PORT);
});

module.exports = { app };


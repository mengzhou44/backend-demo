
const auth = require('./auth')();
const keys = require('../config/keys');


const env = process.env.NODE_ENV || 'development';
if (env === 'test') {
    module.exports = (req, res, next) => {
        next();
    }
} else {
    module.exports = auth.authenticate();
}





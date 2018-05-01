const auth = require('./auth')();

module.exports = (req, res, next) => {
    const env = process.env.NODE_ENV || 'development';
    console.log(env);
    if (env === 'test') {
        console.log('step1');
        next();
    } else {
        console.log('step2');
        return auth.authenticate();
    }
}
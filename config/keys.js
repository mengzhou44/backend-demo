
const env = process.env.NODE_ENV || 'development';


if (env === 'production') {
    module.exports = require('./prod-keys');
} else if (env === 'test') {
    module.exports = require('./test-keys');
} else {
    module.exports = require('./dev-keys');
}

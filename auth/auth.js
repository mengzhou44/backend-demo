const passport = require('passport');
const passportJWT = require('passport-jwt');

const _ = require('lodash');
const usersBL = require('../business-logic/users-bl');
const keys = require('../config/keys');

var params = {
    secretOrKey: keys.jwtSecret,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function () {
    var strategy = new passportJWT.Strategy(params, async function (payload, done) {
        console.log('step 1');
        var user = await usersBL.getUserById(payload.id);
        if (user) {
            console.log('step 2');
            return done(null, {
                _id: user.id
            });
        } else {
            console.log('step 3');
            return done(new Error('User not found'), null);
        }

    });

    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate('jwt', keys.jwtSession);

        }
    };
};
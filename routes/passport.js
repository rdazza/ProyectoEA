var mongoose = require('mongoose');
var User = require('./../models/user.js');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport) {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new FacebookStrategy({
        clientID: '462983140704904',
        clientSecret: 'b1fcf27d460706f1d1623e47f8384d98',
        profileFields : ['id', 'displayName', /*'provider',*/ 'photos'],
        callbackURL: '/auth/facebook/callback'
    }, function (accessToken, refreshToken, profile, done) {
        User.findOne({provider_id: profile.id}, function (err, user) {
            if (err) throw(err);
            if (!err && user != null) return done(null, user);

            var user = new User({
                idProvider: profile.id,
                nombre: profile.displayName,
                imgProvider: profile.photos[0].value
            });
            user.save(function (err) {
                if (err) throw err;
                done(null, user);
            });
        });
    }));
}
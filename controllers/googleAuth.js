const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/userModel');

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async function (accessToken, refreshToken, profile, done) {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.given_name,
          lastName: profile.family_name,
          image: profile.picture,
        };
        try {
          const user = await User.findOne({ googleId: profile.id });

          if (user) {
            return done(null, user);
          } else {
            await User.create(newUser);

            return done(null, user);
          }
        } catch (error) {
          console.log(error);
          done(null, false, { message: 'failed to authenticate' });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

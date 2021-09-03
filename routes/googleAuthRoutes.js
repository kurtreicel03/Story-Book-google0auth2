const express = require('express');
const passport = require('passport');

const router = express.Router();

router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile'] }));

router.route('/google/callback').get(
  passport.authenticate('google', {
    failureRedireict: '/',
  }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;

const express = require('express');

const router = express.Router();

const storyController = require('../controllers/storyController');
const authController = require('../controllers/authController');

router.route('/').get(authController.ensureGuest, (req, res) => {
  res.render('login', { layout: 'login' });
});

router
  .route('/dashboard')
  .get(authController.ensureAuth, storyController.getDashBoard);

module.exports = router;

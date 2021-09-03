const express = require('express');

const router = express.Router();

const storyController = require('../controllers/storyController');
const authController = require('../controllers/authController');

router.use(authController.ensureAuth);
router.route('/add').get(storyController.getAdd);
router
  .route('/')
  .get(storyController.getAllStories)
  .post(storyController.createStory);

router.route('/user/:userId').get(storyController.getDashBoard);
router.route('/edit/:storyId').get(storyController.getEditStory);

router
  .route('/:storyId')
  .get(storyController.getStory)
  .put(storyController.updateStory)
  .delete(storyController.deleteStory);

module.exports = router;

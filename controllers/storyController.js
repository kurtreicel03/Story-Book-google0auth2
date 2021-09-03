const Story = require('../models/storyModel');
const User = require('../models/userModel');

exports.getDashBoard = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const stories = await Story.find({ user: userId }).lean();

    res.status(200).render('dashboard', {
      name: req.user.firstName,
      stories,
    });
  } catch (error) {
    console.log(error);
    res.render('error/505');
  }
};

exports.getAdd = (req, res) => {
  try {
    res.status(200).render('story/add');
  } catch (error) {
    res.status(404).render('error/404');
  }
};

exports.getUserStories = async (req, res) => {
  const user = req.params.userId;
  console.log(user);
};

exports.createStory = async (req, res) => {
  try {
    req.body.user = req.user._id;
    const { title, status, body, user } = req.body;
    const newStory = {
      title,
      body,
      status,
      user,
    };

    const story = await Story.create(newStory);

    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    console.log(req.body);
  }
};

exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();
    res.status(200).render('story/index', {
      stories,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId)
      .populate('user')
      .lean();

    if (!story) {
      throw new Error('no story');
    }

    res.status(200).render('story/my-story', {
      story,
    });
  } catch (error) {
    console.log(error);
    res.render('error/404');
  }
};

exports.getEditStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId).lean();

    if (!story) {
      return res.status(404).render('error/404');
    }

    res.status(200).render('story/edit', {
      story,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(req.params.storyId, req.body, {
      runValidators: true,
      new: true,
    }).lean();

    if (!story) {
      return res.status(404).render('error/404');
    }

    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.status(404).render('error/404');
  }
};

exports.deleteStory = async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.storyId);

    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

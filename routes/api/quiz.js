const express = require('express');
const passport = require('passport');
const router = express.Router();

const Quiz = require('../../models/Quiz');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

const validateAddQuestion = require('../../utils/validation/addQuestion');

// Add new quiz question
// @route POST /api/quiz
// @desc add question
// @access Private

router.post(
  '/add',
  passport.authenticate('jwt-admin', { session: false }),
  async (req, res) => {
    let { question, optionA, optionB, optionC, optionD, answer } = req.body;

    try {
      const newQuiz = new Quiz({
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        answer,
      });

      await newQuiz.save();
      const quizzes = await Quiz.find();
      res.json(quizzes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// Gets free quiz questions
// @route GET /api/quiz/getFreeQuiz
// @desc get questions
// @access Private
router.get('/getFreeQuiz', (req, res) => {
  Quiz.aggregate([{ $sample: { size: 15 } }]).exec((err, result) => {
    if (err) {
      return console.log(err);
    }
    res.json(result);
  });
});

// Gets all quiz questions
// @route GET /api/quiz/all
// @desc get questions
// @access Private
router.get(
  '/all',
  passport.authenticate('jwt-admin', { session: false }),
  (req, res) => {
    Quiz.find()
      .then((quizzes) => res.json(quizzes))
      .catch((err) => console.log(err));
  }
);

// @route    GET api/quiz/edit/:Id
// @desc     Edit Post
// @access   Private
router.get(
    '/edit/:Id',
    passport.authenticate('jwt-admin', { session: false }),
    async (req, res) => {
      let questionId = req.params.Id
  
      try {
          let question = await Quiz.findOne({ _id: questionId })
      
          if (!question) {
            return res.json({msg:'Question Not Found'})
          }
  
          res.json(question)
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

  // @route    POST api/posts/edit/:postId
// @desc     Create a post
// @access   Private
router.post(
    '/edit/:postId',  passport.authenticate('jwt-admin', { session: false }),
    async (req, res) => {
      let { question, optionA, optionB, optionC, optionD, answer } = req.body;
      let { postId } = req.params;

      try {
        let quiz = await Quiz.findOne({ _id: postId });
  
        if (!quiz) {
          return res.status(404).json({ msg: 'Question not found' });
        }

        const updatedQuiz = await Quiz.findOneAndUpdate(
          { _id: quiz._id },
          { $set: { question, optionA, optionB, optionC, optionD, answer } },
          { new: true }
        );
  
        res.json(updatedQuiz);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  

// Update Quiz
// @route PUT /api/quiz/updateQuestion/:id
// @desc update quiz question by Id
// @access Private
router.put(
  '/edit/:id',
  passport.authenticate('jwt-admin', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAddQuestion(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const quiz = new Quiz({
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        answer,
    });

    Quiz.findOneAndDelete({ _id: req.params.id })
      .then((returnedQuiz) => {
        if (!returnedQuiz) {
          errors.noQuiz = 'No Question found';
          return res.status(404).json(errors);
        }
        quiz
          .save()
          .then(() => {
            res.json({ message: 'Question updated successfully!' });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);

// removes all quiz questions
// @route DELETE /api/quiz/all
// @desc remove questions
// @access Private
router.delete(
  '/all',
  passport.authenticate('jwt-admin', { session: false }),
  (req, res) => {
    Quiz.remove()
      .then((info) => res.json({ message: 'Successfully removed questions' }))
      .catch((err) => console.log(err));
  }
);

// removes quiz question
// @route DELETE /api/quiz/category/:category
// @desc removes quiz questions by category
// @access Private
router.delete(
  '/category/:quizCategory',
  passport.authenticate('jwt-admin', { session: false }),
  (req, res) => {
    Quiz.remove({ type: req.params.quizCategory })
      .then(() => res.json({ message: 'Successfully removed questions' }))
      .catch((err) => console.log(err));
  }
);

// removes quiz questions
// @route DELETE /api/quiz/:id
// @desc removes quiz question by id
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt-admin', { session: false }),
  async (req, res) => {
    try {
      await Quiz.findByIdAndDelete({ _id: req.params.id });
      const quiz = await Quiz.find();
      res.json(quiz);
    } catch (error) {
      console.log('clicked');
      console.log(error);
    }
  }
);

// @route    POST api/quiz/rank
// @desc     Update Rank
// @access   Private
router.post('/rank',passport.authenticate('jwt', { session: false }),
  async (req, res) => {

    let { user, score } = req.body;

    try {
       let foundUser = await User.findOne({ username: user });

      if (!foundUser) {
       return res.status(404).json({ msg: 'User not found' });
       }

      const updatedProfile = await Profile.findOneAndUpdate(
      { user: foundUser._id },
      { $set: { score: score} },
       { new: true }
       );
       console.log(updatedProfile);
      res.json(updatedProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// @route    get api/quiz/rank
// @desc     Update Rank
// @access   Private
router.get('/rank',
  async (req, res) => {

    try {
       let foundProfile = await Profile.find().sort({score: -1})
                                .populate('user','username')

      if(!foundProfile) {
        return res.status(400).json({msg:'Profile Not Found'})
      }

      res.json(foundProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

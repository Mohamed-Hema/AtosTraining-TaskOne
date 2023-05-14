// Importing Question Structure form DB
const { Question } = require('../models/Questions');
const { isTeacher, isAdmin, isNotStudent } = require('../middlewares/authMiddleware');


// Handling Errors
function handleError(error) {
  console.error(error);
  res.status(500).json({
    message: "Internal Server Error"
  })
}


// Create new question
exports.createQuestion = async (req, res) => {
  try {
    // Getting Questions from Body
    const { name, category, subcategory, mark, expectedTime, correctAnswers, answers } = req.body;
    const question = new Question({
      name,
      category,
      subcategory,
      mark,
      expectedTime,
      correctAnswers,
      answers,
      createdBy: req.user.userId
    });

    // Saving Question
    await question.save();

    // Return Results
    res.status(201).json({
      message: "Question was Created Successfully."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while creating the question."
    });
  }
};


// Get question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const {questionId} = req.params;
    // Finding Question
    const question = await Question.findById(questionId);
    if(!question) {
      return res.status(404).json({
        message: "Question not found!"
      })
    } 
    
    //Return Results
    res.json({question});
    //Catching Errors
  }catch(error) {
    handleError(error);
  }
};

// Geting All Questions
exports.getAllQuestions = async (req, res) => {
  try {
    const {page = 1, limit = 10, category, createdBy} = req.query;

    //Filter
    const filter = {};
    if(category) {
      filter.category = category;
    }
    if(createdBy) {
      filter.createdBy = createdBy;
    }

    // Skipping Value according to page limit
    const skip = (page - 1) * limit;

    // Getting Questions after Filtering and Pagination
    const questions = await Question.find(filter).skip(skip).limit(limit);

    // Return Results
    res.json({questions});

    // Catching Errors
  } catch(error) {
    handleError(error);
  }
};

// Update question
exports.updateQuestion = (req, res) => {
  try {
    // Get Question ID
    const questionId = req.params.id;
    // Getting Updated Question form body
    const { name, category, subcategory, mark, expectedTime, correctAnswers, answers } = req.body;

    // Checking if user is Teacher
    isTeacher(req, res, () => {
      // Find Question with ID nad Update it
      Question.findByIdAndUpdate(
        questionId,
        { name, category, subcategory, mark, expectedTime, correctAnswers, answers },
        // Update the Question
        { new: true }
      )
        .then((question) => {

          // Check if question is in DB or Not
          if (!question) {
            return res.status(404).json({ message: 'Question not found' });
          }
          res.json({ message: 'Question updated successfully', question });
        })
        .catch((error) => {
          handleError(error);
        });
    });

  // Catching Errors
  } catch (error) {
    handleError(error);
  }
};


// Add answer for existing question
exports.addAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { answer } = req.body;

    // Check if the user is a teacher
    if (!isTeacher(req.user)) {
      return res.status(403).json({ message: 'Unauthorized to add answer' });
    }

    // Find the question by ID
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if teacher is the same creator
    if (question.createdBy !== req.user.userId) {
      return res.status(403).json({ message: 'you are not authorized to add answers' });
    }

    // Add the answer to the question
    question.answers.push(answer);

    const updatedQuestion = await question.save();

    res.json({ message: 'Answer was added successfully', question: updatedQuestion });

    // Catching errors
  } catch (error) {
    handleError(error);
  }
};


// Delete answer for existing question
exports.deleteAnswer = async (req, res) => {
  try {
    const { questionId, answerId } = req.params;

    // Check if the user is a teacher
    isTeacher(req, res, async () => {
      try {
          // Find the question by ID
          const question = await Question.findById(questionId);

        if (!question) {
          return res.status(404).json({ message: 'Question is not found' });
        }

    // Check if teacher is the same creator
        if (question.createdBy !== req.user.userId) {
              return res.status(403).json({ message: 'Unauthorized to delete answer' });
          }

        // Finding Answer in DB
        const answerIndex = question.answers.findIndex((answer) => answer.id === answerId);

        if (answerIndex === -1) {
          return res.status(404).json({ message: 'Answer not found' });
        }

        // Delete answer form DB
        question.answers.splice(answerIndex, 1);

        const updatedQuestion = await question.save();

        res.json({ message: 'Answer is deleted successfully', question: updatedQuestion });
      } catch (error) {
        handleError(error);
      }
    });
    // Catching errors
  } catch (error) {
    handleError(error);
  }
};


// Delete question
exports.deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    // Check if the user is a teacher
    isTeacher(req, res, async () => {
      try {
          // Find the question by ID
          const question = await Question.findById(questionId);

        if (!question) {
          return res.status(404).json({ message: 'Question not found' });
        }

      // Check if teacher is the same creator
        if (question.createdBy !== req.user.userId) {
          return res.status(403).json({ message: 'Unauthorized to delete question' });
        }

        // Delete the question
        await question.remove();

        res.json({ message: 'Question deleted successfully' });
      } catch (error) {
        handleError(error);
      }
    });
    // Catching errors
  } catch (error) {
    handleError(error);
  }
};

// Adding Mongoose
const mongoose = require('mongoose');

////Creating Questions Schema
const QuestionsSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true
    },
    category: {
      type: String,
      unique: true,
      required: true
    },
    subcategory: {
      type: String,
      unique: true
    },
    mark: {
      type: Number,
      unique: true,
      required: true
    },
    expectedTime: {
      type: Number,
      unique: true
    },
    correctAnswers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    answers: [
      {
        id: {
          type: Number,
          unique: true
        },
        name: {
          type: String,
          unique: true
        },
        description: {
          type: String
        }
      }
    ]
  });


module.exports = mongoose.model('Question', QuestionsSchema);

///•	Each question should have the following attributes (id, name, category, subcategory, mark, expectedTime, correctAnswers(array of correct answers ids), createdBy, created_at, answers(each answer contains id, name, description)
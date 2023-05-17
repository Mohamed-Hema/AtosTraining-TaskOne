// Adding Mongoose
const mongoose = require('mongoose');

////Creating Questions Schema
const QuestionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    unique: true,
    required: true
  },
  subcategory: {
    type: String
  },
  mark: {
    type: Number,
    unique: true,
    required: true
  },
  expectedTime: {
    type: Number
  },
  correctAnswers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
      }
    ],
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  answers: {
    type: [
      { 
        id: {
          type: Number
        },
        name: {
          type: String
        },
        description: {
          type: String
        }
      }
    ],
    required: true
  }
});

const Questions = mongoose.model('Question', QuestionsSchema);
module.exports = Questions;

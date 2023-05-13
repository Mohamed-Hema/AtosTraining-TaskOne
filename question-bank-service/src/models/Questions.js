// Adding Mongoose
const mongoose = require('mongoose');

////Creating Questions Schema
const QuestionsSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    category: {
        type: String,
        
    }
})



///•	Each question should have the following attributes (id, name, category, subcategory, mark, expectedTime, correctAnswers(array of correct answers ids), createdBy, created_at, answers(each answer contains id, name, description)
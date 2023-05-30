import mongoose from "mongoose";

const answersArray = mongoose.Schema({
  id: Number,
  answer: String,
}, {_id: false})

const questionSchema = new mongoose.Schema({
  question: String,
  answers: [answersArray],
  quizId: String,
  correctAnswer: Number
})

const Question = mongoose.model('Question', questionSchema);
export default Question; 